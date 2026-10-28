import test from "node:test";
import assert from "node:assert/strict";
import { multiplyMoney, PACK_QUANTITIES } from "../src/lib/commerce/pricing";

test("all five packs calculate the provisional undiscounted MRP exactly", () => {
  assert.deepEqual(
    PACK_QUANTITIES.map((quantity) =>
      multiplyMoney({ amount: "499.00", currencyCode: "INR" }, quantity),
    ),
    ["499.00", "1497.00", "2994.00", "4491.00", "5988.00"].map((amount) => ({
      amount,
      currencyCode: "INR",
    })),
  );
});

test("merchant prices retain decimal precision and currency without introducing discounts", () => {
  assert.deepEqual(
    multiplyMoney({ amount: "299.95", currencyCode: "INR" }, 9),
    { amount: "2699.55", currencyCode: "INR" },
  );
  assert.deepEqual(multiplyMoney({ amount: "0.10", currencyCode: "USD" }, 3), {
    amount: "0.30",
    currencyCode: "USD",
  });
  assert.deepEqual(multiplyMoney({ amount: "1500", currencyCode: "JPY" }, 6), {
    amount: "9000",
    currencyCode: "JPY",
  });
  assert.deepEqual(multiplyMoney({ amount: "0.00", currencyCode: "INR" }, 12), {
    amount: "0.00",
    currencyCode: "INR",
  });
});

test("missing or invalid prices are never replaced with a selling price", () => {
  assert.equal(multiplyMoney(null, 3), null);
  assert.equal(multiplyMoney(undefined, 3), null);
  for (const amount of ["NaN", "Infinity", "-1.00", "", "1e2"]) {
    assert.equal(multiplyMoney({ amount, currencyCode: "INR" }, 3), null);
  }
  for (const quantity of [0, -1, 1.5, Infinity, NaN]) {
    assert.equal(
      multiplyMoney({ amount: "499.00", currencyCode: "INR" }, quantity),
      null,
    );
  }
});
