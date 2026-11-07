export type Transaction = {
  payer: string;
  amount: number;
  beneficiaries: Array<string>;
};

export type ParseResult =
  | { ok: true; transaction: Transaction }
  | { ok: false; error: string };

export class TransactionService {
  split(input: string): string {
    const transactions: Transaction[] = [];

    for (const line of input.split("\n")) {
      const parseResult = this.parseTransaction(line);

      if (parseResult.ok) {
        transactions.push(parseResult.transaction);
      }
    }

    return this.summarizeTransactions(transactions);
  }

  parseTransaction(input: string): ParseResult {
    const paymentSection = cut(input, " paid ");

    if (paymentSection === undefined) {
      return { ok: false, error: `Could not read payment section: ${input}` };
    }

    const [payer, afterPayer] = paymentSection;
    const paidSection = cut(afterPayer, " for ");

    if (paidSection === undefined) {
      return { ok: false, error: `Could nto read paid section: ${afterPayer}` };
    }

    const [paid] = paidSection;

    const paidAmount = Number(paid);
    if (Number.isNaN(paidAmount)) {
      return { ok: false, error: `Could not parse paid amount: ${afterPayer}` };
    }

    const beneficiariesSection = cut(input, " split between ");
    if (beneficiariesSection === undefined) {
      return {
        ok: false,
        error: `Could not read beneficiariesSection: ${input}`,
      };
    }

    const [, beneficiaries] = beneficiariesSection;

    return {
      ok: true,
      transaction: {
        payer: payer,
        amount: paidAmount,
        beneficiaries: beneficiaries.split(",").map((b) => b.trim()),
      },
    };
  }

  summarizeTransactions(transactions: Array<Transaction>): string {
    return "";
  }
}

export function cut(
  text: string,
  marker: string,
): [string, string] | undefined {
  const markerIndex = text.indexOf(marker);

  if (markerIndex === -1) {
    return undefined;
  }

  const before = text.slice(0, markerIndex);
  const after = text.slice(markerIndex + marker.length);

  return [before, after];
}
