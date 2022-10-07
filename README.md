# WWW FrontEnd MonoRepo

This monorepo contains the frontend apps of the WWW project. It's managed using [TurboRepo](https://turborepo.org/).

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

#### Apps

All apps are created using [React](https://reactjs.org) and [vite](https://vitejs.dev/)

- `www-agent`: **Agent** app for the WWW project &bull; [deployement link](https://www-agent.vercel.app/) &bull; [code](/apps/www-agent/)
- `token-holder`: **Token Holder** app for the WWW project &bull; [deployement link](https://www-token-holder.vercel.app/) &bull; [code](/apps/tokan-holder/)
- `www-tenant`: **Tenant** app for the WWW project  &bull; [deployement link](https://www-tenant.vercel.app/) &bull; [code](/apps/www-tenant/)

#### Packages

- `ui`: a stub React component library shared by all apps. Uses `Chakra-UI` as a component library  &bull; [code](/packages/ui/)
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) &bull; [code](/packages/eslint-config-custom/)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo &bull; [code](/packages/tsconfig/)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Develop

To develop all apps and packages, run the following command:

```bash
cd WWW-fe
yarn dev
```

### Build

To build all apps and packages, run the following command:

```bash
cd WWW-fe
yarn build
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
cd WWW-fe
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```bash
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
