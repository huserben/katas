// Pure core: no I/O here, so every rule is unit-testable.
export function run(input: string, args: readonly string[] = []): string {
  return [...args, input].join(" ").trim();
}
