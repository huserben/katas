# katas

Small TypeScript coding katas, each a self-contained folder (no workspace).

Stack: TypeScript, Vitest, Biome, pnpm. Needs Node >= 22.18 with built-in TypeScript support (official build), so `node file.ts` runs directly.

## New kata

```sh
cp -r _template my-kata   # folder name: short, kebab-case
cd my-kata
pnpm install
pnpm test:watch
```

## Scripts (per kata folder)

| Script | What |
|---|---|
| `pnpm start` | run `src/main.ts` (args + stdin in, stdout out) |
| `pnpm test` | run tests once |
| `pnpm test:watch` | watch mode |
| `pnpm build` | `tsc --noEmit` (type check, no output) |
| `pnpm lint` | Biome check |
| `pnpm check` | build, lint, test |

## Conventions

- Test next to the code in `src/`, named `*.test.ts`.
- Console apps: logic in pure functions (`app.ts`), I/O only in `main.ts`. Unit-test the core; keep a few end-to-end tests in `main.test.ts`.
- Small commits: red, green, refactor.
- Run `pnpm build` with every green.
