import type { Money } from "./types";

export const PACK_QUANTITIES = [1, 3, 6, 9, 12] as const;
export type PackQuantity = (typeof PACK_QUANTITIES)[number];

/** Multiply decimal money exactly, without floating-point rounding. */
export function multiplyMoney(
  money: Money | null | undefined,
  quantity: number,
): Money | null {
  if (!money || !Number.isSafeInteger(quantity) || quantity < 1) return null;
  if (!/^\d+(?:\.\d+)?$/.test(money.amount)) return null;
  const [whole, fraction = ""] = money.amount.split(".");
  const digits = (BigInt(whole + fraction) * BigInt(quantity))
    .toString()
    .padStart(fraction.length + 1, "0");
  return {
    amount: fraction.length
      ? `${digits.slice(0, -fraction.length)}.${digits.slice(-fraction.length)}`
      : digits,
    currencyCode: money.currencyCode,
  };
}
