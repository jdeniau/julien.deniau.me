import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import invariant from 'tiny-invariant';

const NUCLINO_API = 'https://api.nuclino.com/v0';
const API_KEY = process.env.NUCLINO_API_KEY;
const CLUSTER_ID = process.env.NUCLINO_PUBLISHED_CLUSTER_ID;

invariant(API_KEY, 'NUCLINO_API_KEY env var is required');
invariant(CLUSTER_ID, 'NUCLINO_PUBLISHED_CLUSTER_ID env var is required');

const POSTS_DIR = path.resolve('posts-nuclino');
const IMAGES_DIR = path.resolve('public/images/nuclino');

const FRONTMATTER_FIELDS = ['emphasis', 'icon', 'lang'] as const;

type NuclinoItem = {
  id: string;
  object: 'item' | 'collection';
  workspaceId: string;
  url: string;
  title: string;
  createdAt: string;
  lastUpdatedAt: string;
  content?: string;
  contentMeta?: { itemIds: string[]; fileIds: string[] };
  childIds?: string[];
  fields?: Record<string, unknown>;
};

type NuclinoFile = {
  id: string;
  itemId: string;
  fileName: string;
  createdAt: string;
  download: { url: string; expiresAt: string };
};

async function nuclinoGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${NUCLINO_API}${endpoint}`, {
    headers: { Authorization: API_KEY! },
  });
  if (!res.ok) {
    throw new Error(
      `Nuclino GET ${endpoint} failed: ${res.status} ${await res.text()}`
    );
  }
  const json = (await res.json()) as { status: string; data: T };
  return json.data;
}

function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getFieldValue(
  fields: Record<string, unknown> | undefined,
  name: string
): string | undefined {
  if (!fields) return undefined;
  let v = fields[name];
  if (v === undefined) {
    const key = Object.keys(fields).find(
      (k) => k.toLowerCase() === name.toLowerCase()
    );
    if (key !== undefined) v = fields[key];
  }
  if (v == null) return undefined;
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object' && 'name' in (v as Record<string, unknown>)) {
    return String((v as { name: unknown }).name);
  }
  return undefined;
}

function yamlQuote(v: string): string {
  return JSON.stringify(v);
}

function buildFrontmatter(values: Record<string, string | undefined>): string {
  return Object.entries(values)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${yamlQuote(v as string)}`)
    .join('\n');
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function downloadFile(url: string, target: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download ${url} failed: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(target, buffer);
}

async function syncItem(
  itemId: string
): Promise<{ slug: string; imageCount: number }> {
  const item = await nuclinoGet<NuclinoItem>(`/items/${itemId}`);
  invariant(
    item.content !== undefined,
    `Item ${item.id} (${item.title}) has no content field`
  );

  const dateRaw = getFieldValue(item.fields, 'date') ?? item.createdAt;
  const dateYmd = dateRaw.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateYmd)) {
    throw new Error(
      `Item "${item.title}" (${item.id}) has invalid date "${dateRaw}"`
    );
  }

  const slug = `${dateYmd}-${slugify(item.title)}-${item.id}`;
  const imageDir = path.join(IMAGES_DIR, slug);

  let body = item.content;
  const fileIds = item.contentMeta?.fileIds ?? [];
  let imageCount = 0;

  if (fileIds.length > 0) {
    await ensureDir(imageDir);
    for (const fileId of fileIds) {
      const file = await nuclinoGet<NuclinoFile>(`/files/${fileId}`);
      const target = path.join(imageDir, file.fileName);
      await downloadFile(file.download.url, target);
      imageCount += 1;

      const urlPattern = new RegExp(
        `https://files\\.nuclino\\.com/files/${fileId}/[^\\s)\\]"']+`,
        'g'
      );
      body = body.replace(
        urlPattern,
        `/images/nuclino/${slug}/${file.fileName}`
      );
    }
  }

  const extraFields: Record<string, string | undefined> = {};
  for (const name of FRONTMATTER_FIELDS) {
    extraFields[name] = getFieldValue(item.fields, name);
  }

  const frontmatter = buildFrontmatter({
    date: dateYmd,
    title: item.title,
    ...extraFields,
  });

  const finalContent = `---\n${frontmatter}\n---\n\n${body.replace(/^\s+/, '')}`;
  await fs.writeFile(path.join(POSTS_DIR, `${slug}.md`), finalContent, 'utf8');

  return { slug, imageCount };
}

async function cleanupStale(syncedSlugs: Set<string>): Promise<number> {
  let removed = 0;

  const postFiles = await fs.readdir(POSTS_DIR).catch(() => [] as string[]);
  for (const f of postFiles) {
    if (!f.endsWith('.md')) continue;
    const slug = f.replace(/\.md$/, '');
    if (!syncedSlugs.has(slug)) {
      await fs.unlink(path.join(POSTS_DIR, f));
      console.log(`  - removed stale post: ${f}`);
      removed += 1;
    }
  }

  const imageDirs = await fs.readdir(IMAGES_DIR).catch(() => [] as string[]);
  for (const d of imageDirs) {
    const dirPath = path.join(IMAGES_DIR, d);
    const stat = await fs.stat(dirPath).catch(() => null);
    if (stat?.isDirectory() && !syncedSlugs.has(d)) {
      await fs.rm(dirPath, { recursive: true, force: true });
      console.log(`  - removed stale images: ${d}`);
      removed += 1;
    }
  }

  return removed;
}

async function main(): Promise<void> {
  await ensureDir(POSTS_DIR);
  await ensureDir(IMAGES_DIR);

  console.log(`Fetching cluster ${CLUSTER_ID}…`);
  const cluster = await nuclinoGet<NuclinoItem>(`/items/${CLUSTER_ID}`);
  invariant(
    cluster.object === 'collection',
    `Expected ${CLUSTER_ID} to be a collection, got ${cluster.object}`
  );
  const childIds = cluster.childIds ?? [];
  console.log(`Found ${childIds.length} item(s) in cluster.\n`);

  const synced = new Set<string>();
  let totalImages = 0;
  for (const id of childIds) {
    const { slug, imageCount } = await syncItem(id);
    synced.add(slug);
    totalImages += imageCount;
    console.log(`  ✓ ${slug}${imageCount ? ` (${imageCount} image(s))` : ''}`);
  }

  console.log(`\nCleaning up stale entries…`);
  const removed = await cleanupStale(synced);

  console.log(
    `\nDone. ${synced.size} synced, ${removed} removed, ${totalImages} image(s) downloaded.`
  );
}

main().catch((err: Error) => {
  console.error(`\n✗ Sync failed: ${err.message}`);
  process.exit(1);
});
