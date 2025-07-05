# My personal website

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Talks

### Dev

```sh
npm run talk:dev talk/talk-folder # or npm run talk:dev talk-folder
```

If you want to run all talks, you can use:

```sh
npm run talk:dev
```

### Build

Build is automatically handled by vercel on deployment, but you can also build it locally for testing purposes:

```sh
npm run talk:build talk/talk-folder # or npm run talk:build talk-folder
```
