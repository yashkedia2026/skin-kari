"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { multiplyMoney, PACK_QUANTITIES } from "@/lib/commerce/pricing";
import { formatMoney, useCart } from "./cart-provider";
import { useProductPackSelection } from "./product-pack-selection";
import styles from "./product-purchase.module.css";
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
  const packId = useId();
  const [variantId, setVariantId] = useState(
    (product.variants.find((v) => v.availableForSale) || product.variants[0])
      ?.id || "",
  );
  const { quantity, setQuantity } = useProductPackSelection();
  const [added, setAdded] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId);
  const mrp = multiplyMoney(variant?.mrp, quantity);
  const sellingPrice = multiplyMoney(variant?.price, quantity);
  const demo = product.source === "demo";
  return (
    <div className="purchase-box">
      <div
        className={styles.pricing}
        role="region"
        aria-label="Pack pricing"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={styles.priceLabel}>
          {demo ? "Provisional MRP · Demo preview" : "Selling price"}
        </span>
        <div className={styles.priceRow}>
          <strong className={styles.amount}>
            {formatMoney(demo ? mrp : sellingPrice)}
          </strong>
          {!demo && mrp && (
            <span className={styles.quantity}>MRP {formatMoney(mrp)}</span>
          )}
        </div>
        <p className={styles.quantity}>
          {quantity} sheet {quantity === 1 ? "mask" : "masks"}
          {(demo ? variant?.mrp : variant?.price) && (
            <>
              {" "}
              · {formatMoney(
                (demo ? variant?.mrp : variant?.price) || null,
              )}{" "}
              per mask
            </>
          )}
        </p>
        {demo && (
          <p className={styles.sellingStatus}>Selling price coming soon</p>
        )}
        {!demo && !mrp && (
          <p className={styles.quantity}>MRP awaiting confirmation</p>
        )}
      </div>
      {product.variants.length > 1 && (
        <label className="variant-label">
          Choose your option
          <select
            value={variantId}
            disabled={busy}
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
      <fieldset className={styles.packs} disabled={busy}>
        <legend>Choose your pack</legend>
        <div className={styles.options}>
          {PACK_QUANTITIES.map((pack) => (
            <label className={styles.option} key={pack}>
              <input
                type="radio"
                name={`${packId}-pack`}
                value={pack}
                checked={quantity === pack}
                aria-label={pack === 1 ? "Single Mask (1)" : `Pack of ${pack}`}
                onChange={() => {
                  setQuantity(pack);
                  setAdded(false);
                }}
              />
              <span className={styles.optionFace} aria-hidden="true">
                <span>{pack === 1 ? "Single" : "Pack of"}</span>
                <strong>{pack}</strong>
                <span>{pack === 1 ? "mask" : "masks"}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="purchase-actions">
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
          Provisional MRP of ₹499 per mask, pending confirmation for all four
          masks. Final selling prices will be announced before checkout opens.
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
