export function formatDate(d: string | Date): string {
  const dateObject = d instanceof Date ? d : new Date(d);

  return dateObject.toLocaleDateString();
}
