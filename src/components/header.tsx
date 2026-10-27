"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CartTrigger } from "./cart-provider";
const links = [
  ["Shop all", "/shop"],
  ["Our story", "/about"],
  ["Ingredients", "/ingredients"],
  ["The good-skin journal", "/journal"],
];
export function Header({ demo }: { demo: boolean }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  return (
    <>
      <div className="announcement">
        <span>INDIAN SKINCARE. A LITTLE MORE YOU.</span>
        {demo && (
          <span className="demo-label">DEMO STORE · CHECKOUT DISABLED</span>
        )}
      </div>
      <header className="site-header">
        <Link href="/" aria-label="Skinkari home" className="wordmark">
          <Image
            src="/images/products/brand-wordmark.webp"
            alt="SKINKARI"
            sizes="(max-width: 600px) 135px, 170px"
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
          <CartTrigger />
          <button
            className="icon-button mobile-menu-trigger"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        className="mobile-menu"
        ref={dialog}
        aria-label="Navigation menu"
        onCancel={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
            <Image
              src="/images/products/brand-wordmark.webp"
              alt="SKINKARI"
              sizes="(max-width: 600px) 135px, 170px"
              width={950}
              height={360}
            />
          </Link>
          <button
            className="icon-button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          >
            <X />
          </button>
        </div>
        <nav>
          {links.map(([name, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {name}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <p>Same skin. Brighter days.</p>
      </dialog>
    </>
  );
}
