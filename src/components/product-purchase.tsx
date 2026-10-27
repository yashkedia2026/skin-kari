"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { formatMoney, useCart } from "./cart-provider";
export function QuickAdd({ product }: { product: Product }) {
  const { mutate, busy, error } = useCart();
  const [added, setAdded] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const variant =
    product.variants.find((v) => v.availableForSale) || product.variants[0];
  if (product.variants.length > 1)
    return (
      <Link href={`/products/${product.handle}`} className="card-add">
        <span>Choose an option</span>
        <ArrowRight size={18} />
      </Link>
    );
  return (
    <>
      <button
        className="card-add"
        disabled={busy || !variant?.availableForSale}
        onClick={async () => {
          setAttempted(true);
          setAdded(
            await mutate({
              action: "add",
              merchandiseId: variant.id,
              quantity: 1,
            }),
          );
        }}
      >
        <span>
          {!variant?.availableForSale
            ? "Currently unavailable"
            : added
              ? "Added to your bag"
              : product.source === "demo"
                ? "Try in demo bag"
                : formatMoney(variant.price)}
        </span>
        {added ? <Check size={18} /> : <Plus size={18} />}
      </button>
      {attempted && error && (
        <p className="inline-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
export function ProductPurchase({ product }: { product: Product }) {
  const { mutate, busy, error } = useCart();
  const [variantId, setVariantId] = useState(
    (product.variants.find((v) => v.availableForSale) || product.variants[0])
      ?.id || "",
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId);
  return (
    <div className="purchase-box">
      <div className="product-price">
        {formatMoney(variant?.price || null)}
        {product.source === "demo" && <span>Demo preview</span>}
      </div>
      {product.variants.length > 1 && (
        <label className="variant-label">
          Choose your option
          <select
            value={variantId}
            onChange={(e) => {
              setVariantId(e.target.value);
              setAdded(false);
            }}
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
                {!v.availableForSale ? " — unavailable" : ""}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="purchase-actions">
        <div className="quantity-picker">
          <button
            disabled={quantity <= 1 || busy}
            onClick={() => setQuantity((q) => q - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span aria-label="Quantity">{quantity}</span>
          <button
            disabled={quantity >= 99 || busy}
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          className="button"
          disabled={busy || !variant?.availableForSale}
          onClick={async () => {
            setAttempted(true);
            setAdded(
              await mutate({
                action: "add",
                merchandiseId: variantId,
                quantity,
              }),
            );
          }}
        >
          {!variant?.availableForSale
            ? "Currently unavailable"
            : busy
              ? "Adding…"
              : added
                ? "Added to your bag"
                : product.source === "demo"
                  ? "Add to demo bag"
                  : "Add to bag"}
          {added ? <Check size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
      {product.source === "demo" && (
        <p className="purchase-note">
          Explore the bag experience. Pricing and live checkout will be
          available once the store opens.
        </p>
      )}
      {attempted && error && (
        <p role="alert" className="error-note">
          {error}
        </p>
      )}
    </div>
  );
}
