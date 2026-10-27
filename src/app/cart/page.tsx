import { CartContents } from "@/components/cart-provider";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata("Your bag", "Review your SKINKARI bag.", "/cart"),
  robots: { index: false, follow: false },
};
export default function CartPage() {
  return (
    <div className="cart-page section">
      <p className="eyebrow">A LITTLE SOMETHING FOR YOU</p>
      <h1>Your good-skin bag.</h1>
      <CartContents />
    </div>
  );
}
