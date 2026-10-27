"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "./cart-provider";

const links = [
  ["Shop", "/shop"],
  ["Why Indian skin", "/#why-indian-skin"],
  ["Ingredients", "/ingredients"],
  ["Our story", "/about"],
  ["Journal", "/journal"],
];

type HeaderPanel = "menu" | "search" | "account" | null;

export function Header({ demo }: { demo: boolean }) {
  const [panel, setPanel] = useState<HeaderPanel>(null);
  const path = usePathname();
  const { cart, open: openBag } = useCart();
  const menuDialog = useRef<HTMLDialogElement>(null);
  const searchDialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const accountDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogs = {
      menu: menuDialog.current,
      search: searchDialog.current,
      account: accountDialog.current,
    };
    for (const [name, dialog] of Object.entries(dialogs)) {
      if (panel !== name) dialog?.close();
    }
    if (panel) dialogs[panel]?.showModal();
    if (panel === "search") searchInput.current?.focus();
    const previousOverflow = document.body.style.overflow;
    if (panel) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [panel]);

  const closePanel = () => setPanel(null);

  return (
    <>
      {demo && (
        <div className="announcement brand-demo-announcement">
          <span className="demo-label">DEMO STORE · CHECKOUT DISABLED</span>
        </div>
      )}
      <header className="site-header brand-header">
        <Link href="/" aria-label="Skinkari home" className="wordmark">
          <Image
            src="/images/products/brand-wordmark.webp"
            alt="SKINKARI"
            sizes="(max-width: 600px) 125px, (max-width: 900px) 145px, 228px"
            width={950}
            height={360}
            loading="eager"
            fetchPriority="high"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button header-search-trigger"
            onClick={() => setPanel("search")}
            aria-label="Search products"
            aria-haspopup="dialog"
          >
            <Search strokeWidth={1.7} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button header-account-trigger"
            onClick={() => setPanel("account")}
            aria-label="Your account"
            aria-haspopup="dialog"
          >
            <UserRound strokeWidth={1.7} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="bag-trigger brand-bag-trigger"
            onClick={openBag}
            aria-label={`Open shopping bag, ${cart?.totalQuantity || 0} items`}
          >
            <span aria-hidden="true">BAG ({cart?.totalQuantity || 0})</span>
          </button>
          <button
            type="button"
            className="icon-button mobile-menu-trigger"
            onClick={() => setPanel("menu")}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog
        className="mobile-menu brand-mobile-menu"
        ref={menuDialog}
        aria-label="Navigation menu"
        onCancel={closePanel}
      >
        {panel === "menu" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-menu-top">
              <Link
                href="/"
                className="wordmark"
                aria-label="Skinkari home"
                onClick={closePanel}
              >
                <Image
                  src="/images/products/brand-wordmark.webp"
                  alt="SKINKARI"
                  sizes="170px"
                  width={950}
                  height={360}
                />
              </Link>
              <button
                type="button"
                className="icon-button"
                onClick={closePanel}
                aria-label="Close navigation menu"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map(([name, href]) => (
                <Link key={href} href={href} onClick={closePanel}>
                  {name}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-utilities">
              <button type="button" onClick={() => setPanel("search")}>
                <Search size={19} aria-hidden="true" /> Search products
              </button>
              <button type="button" onClick={() => setPanel("account")}>
                <UserRound size={19} aria-hidden="true" /> Your account
              </button>
            </div>
            <p className="mobile-menu-signoff">
              Rooted in India. Made for real life.
            </p>
          </motion.div>
        )}
      </dialog>
      <dialog
        className="brand-header-dialog"
        ref={searchDialog}
        aria-labelledby="search-title"
        onCancel={closePanel}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePanel();
        }}
      >
        <div className="header-dialog-content">
          <div className="header-dialog-heading">
            <h2 id="search-title">Find your skin moment.</h2>
            <button
              type="button"
              className="icon-button"
              onClick={closePanel}
              aria-label="Close search"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <form action="/shop" method="get" className="header-search-form">
            <label htmlFor="header-product-search">
              Search masks or ingredients
            </label>
            <div className="brand-search-field">
              <input
                id="header-product-search"
                ref={searchInput}
                type="search"
                name="q"
                placeholder="Try Vitamin C"
                maxLength={80}
                required
              />
              <button type="submit" aria-label="Search masks">
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
          <p className="header-search-hint">
            Four masks. Find the one for your kind of day.
          </p>
          <Link href="/shop" className="text-link" onClick={closePanel}>
            Explore all masks <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </dialog>
      <dialog
        className="brand-header-dialog"
        ref={accountDialog}
        aria-labelledby="account-title"
        onCancel={closePanel}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePanel();
        }}
      >
        <div className="header-dialog-content">
          <div className="header-dialog-heading">
            <h2 id="account-title">Your SKINKARI account.</h2>
            <button
              type="button"
              className="icon-button"
              onClick={closePanel}
              aria-label="Close account information"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <p>
            Account sign-in isn’t available yet. You can still explore the masks
            and keep a bag on this device.
          </p>
          {demo && (
            <p className="header-account-note">
              This is a demo store. Orders and payments are not available.
            </p>
          )}
          <div className="header-account-links">
            <Link href="/shop" className="button" onClick={closePanel}>
              Explore the masks <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="text-link" onClick={closePanel}>
              Get in touch
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
