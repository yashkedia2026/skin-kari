"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Cart } from "@/lib/commerce/types";

type CartAction = {
  action: "add" | "update" | "remove" | "checkout";
  merchandiseId?: string;
  lineId?: string;
  quantity?: number;
};
type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  busy: boolean;
  error: string;
  open: () => void;
  close: () => void;
  mutate: (action: CartAction) => Promise<boolean>;
  refresh: () => Promise<void>;
};
const CartContext = createContext<CartContextValue | null>(null);
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart provider missing");
  return value;
}
export function formatMoney(
  money: { amount: string; currencyCode: string } | null,
) {
  if (!money) return "Price coming soon";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(money.amount));
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const lock = useRef(false);
  const revision = useRef(0);
  const refresh = useCallback(async () => {
    const requestRevision = ++revision.current;
    try {
      const response = await fetch("/api/cart", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Your bag could not be loaded.");
      if (requestRevision === revision.current) {
        setCart(data);
        setError("");
      }
    } catch (e) {
      if (requestRevision === revision.current)
        setError(
          e instanceof Error ? e.message : "Your bag could not be loaded.",
        );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (mounted) void refresh();
    });
    return () => {
      mounted = false;
    };
  }, [refresh]);
  const mutate = useCallback(
    async (action: CartAction) => {
      if (lock.current) return false;
      lock.current = true;
      revision.current++;
      setBusy(true);
      setError("");
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action),
        });
        const data = await response.json();
        if (!response.ok) {
          if (data.code === "CART_EXPIRED" || data.code === "EMPTY_CART")
            await refresh();
          throw new Error(
            data.error || "We couldn’t update your bag. Please try again.",
          );
        }
        if (action.action === "checkout") {
          window.location.assign(data.checkoutUrl);
          return true;
        }
        setCart(data);
        if (action.action === "add") setIsOpen(true);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Please try again.");
        return false;
      } finally {
        lock.current = false;
        setBusy(false);
      }
    },
    [refresh],
  );
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        busy,
        error,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        mutate,
        refresh,
      }}
    >
      {children}
      <CartDrawer isOpen={isOpen} close={() => setIsOpen(false)} />
    </CartContext.Provider>
  );
}
export function CartTrigger() {
  const { cart, open } = useCart();
  return (
    <button
      className="bag-trigger"
      onClick={open}
      aria-label={`Open shopping bag, ${cart?.totalQuantity || 0} items`}
    >
      <ShoppingBag size={21} />
      <span className="bag-word">Bag </span>
      <span className="bag-count" aria-hidden="true">
        {cart?.totalQuantity || 0}
      </span>
    </button>
  );
}
function CartDrawer({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (isOpen) {
      el.showModal();
      document.body.style.overflow = "hidden";
    } else {
      el.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <dialog
      ref={dialog}
      className="cart-dialog"
      aria-labelledby="drawer-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="cart-heading">
              <h2 id="drawer-title">Your good-skin bag.</h2>
              <button
                className="icon-button"
                onClick={close}
                aria-label="Close shopping bag"
              >
                <X />
              </button>
            </div>
            <CartContents />
            <Link
              href="/cart"
              className="text-link cart-page-link"
              onClick={close}
            >
              View full bag <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
export function CartContents() {
  const { cart, loading, busy, error, mutate, close, refresh } = useCart();
  return (
    <div className="cart-contents" aria-busy={busy || loading}>
      {cart?.mode === "demo" && (
        <p className="demo-note">
          Demo bag · Prices are not yet available. Checkout is disabled.
        </p>
      )}
      {error && (
        <div role="alert" className="error-note">
          {error}{" "}
          <button onClick={() => void refresh()} className="text-link">
            Retry
          </button>
        </div>
      )}
      {cart?.warnings?.map((warning) => (
        <p role="status" className="demo-note" key={warning}>
          {warning}
        </p>
      ))}
      {loading ? (
        <p className="cart-empty">Loading your bag…</p>
      ) : !cart?.lines.length ? (
        <div className="cart-empty">
          <ShoppingBag size={44} strokeWidth={1} />
          <h3>A brighter day starts here.</h3>
          <p>Find a little something for your skin.</p>
          <Link href="/shop" className="button" onClick={close}>
            Meet the masks <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-lines">
            {cart.lines.map((line) => (
              <li key={line.id} className="cart-line">
                {line.image && (
                  <Image
                    src={line.image}
                    alt={line.title}
                    width={78}
                    height={108}
                    className="cart-product-image"
                  />
                )}
                <div className="cart-line-detail">
                  <Link
                    href={`/products/${line.productHandle}`}
                    onClick={close}
                  >
                    {line.title}
                  </Link>
                  {line.variantTitle !== "Default Title" && (
                    <small>{line.variantTitle}</small>
                  )}
                  <span>{formatMoney(line.unitPrice)}</span>
                  <div className="cart-line-actions">
                    <div className="quantity-picker">
                      <button
                        disabled={busy || line.quantity <= 1}
                        aria-label={`Decrease ${line.title} quantity`}
                        onClick={() =>
                          void mutate({
                            action: "update",
                            lineId: line.id,
                            quantity: line.quantity - 1,
                          })
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span aria-label="Quantity">{line.quantity}</span>
                      <button
                        disabled={busy || line.quantity >= 99}
                        aria-label={`Increase ${line.title} quantity`}
                        onClick={() =>
                          void mutate({
                            action: "update",
                            lineId: line.id,
                            quantity: line.quantity + 1,
                          })
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="icon-button"
                      disabled={busy}
                      aria-label={`Remove ${line.title}`}
                      onClick={() =>
                        void mutate({ action: "remove", lineId: line.id })
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>
                {cart.subtotal ? formatMoney(cart.subtotal) : "Not priced yet"}
              </strong>
            </div>
            <p>
              {cart.mode === "demo"
                ? "This is a preview of your shopping experience."
                : "Shipping, taxes and discounts are calculated at Shopify checkout."}
            </p>
            <button
              className="button full-width"
              disabled={busy || cart.mode === "demo"}
              onClick={() => void mutate({ action: "checkout" })}
            >
              {cart.mode === "demo"
                ? "Checkout unavailable in demo"
                : busy
                  ? "Please wait…"
                  : "Continue to checkout"}
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
      <span className="sr-only" role="status">
        {busy
          ? "Updating shopping bag"
          : cart
            ? `${cart.totalQuantity} items in your bag`
            : ""}
      </span>
    </div>
  );
}
