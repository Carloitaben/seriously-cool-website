Monorepo for [seriouslycool.website](https://seriouslycool.website/)

## Stack
- [TypeScript](https://www.typescriptlang.org/)
- [Sanity](https://www.sanity.io/)
- [Tailwind](https://tailwindcss.com/)
- [Remix](https://remix.run/)

## Running the project (CMS)

1. Navigate to the `./cms` directory.
```zsh
cd cms
```

2. Create a `.env.development` file with the property `SANITY_STUDIO_PREVIEW_SECRET`. It can be any string.
```zsh
touch .env.development
```

3. Install dependencies and run the project.
```zsh
yarn && yarn dev
```

4. Deploy your changes to update the GraphQL endpoint. Every time you update a Sanity schema you will have to restart the development server of the `./web` project in order to get the latest types.
```zsh
yarn deploy
```

## Running the project (web)
1. Navigate to the `./web` directory.

```zsh
yarn dev
```

2. Create a `.env` file with the property `SANITY_STUDIO_PREVIEW_SECRET`. It should be the same as in `../cms/.env.development`. You will also need a `SANITY_API_TOKEN` from https://www.sanity.io/manage.
```zsh
touch .env.development
```

3. Install dependencies and run the project.
```zsh
yarn && yarn dev
```
