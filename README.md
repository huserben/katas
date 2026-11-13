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
| `pnpm start` | run `src/main.ts` |
| `pnpm test` | run tests once |
| `pnpm test:watch` | watch mode |
| `pnpm build` | `tsc --noEmit` (type check, no output) |
| `pnpm lint` | Biome check |
| `pnpm check` | build, lint, test |

## Conventions

- Test next to the code in `src/`, named `*.test.ts`.
- Console apps: `src/main.ts` is the entry point. Put logic in classes or modules next to it and unit-test those, not `main.ts`.
- Small commits: red, green, refactor.
- Run `pnpm build` with every green.
