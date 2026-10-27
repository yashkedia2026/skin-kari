import { NextRequest, NextResponse } from "next/server";
import { getCommerceConfig } from "@/lib/commerce/config";
import {
  getDemoProducts,
  mutateDemoCart,
  readDemoCart,
  writeDemoCart,
} from "@/lib/commerce/demo";
import {
  getLiveCart,
  liveCheckout,
  mutateLiveCart,
  validCartCookie,
} from "@/lib/commerce/shopify";
import { CommerceError } from "@/lib/commerce/types";
import { assertSameOrigin, parseCartAction } from "@/lib/commerce/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEMO_COOKIE = "skinkari_demo_cart";
const LIVE_COOKIE = "skinkari_cart";
const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: RESPONSE_HEADERS });
}

function setCookie(
  response: NextResponse,
  request: NextRequest,
  name: string,
  value: string,
) {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure:
      request.nextUrl.protocol === "https:" ||
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

function errorResponse(error: unknown) {
  if (error instanceof CommerceError) {
    const response = json(
      { error: error.message, code: error.code },
      error.status,
    );
    if (error.code === "CART_EXPIRED" || error.code === "EMPTY_CART")
      response.cookies.delete(LIVE_COOKIE);
    return response;
  }
  // Never return raw provider payloads, tokens, cart IDs, or internal errors.
  return json(
    {
      error: "Your bag couldn't be updated. Please try again.",
      code: "COMMERCE_UNAVAILABLE",
    },
    503,
  );
}

export async function GET(request: NextRequest) {
  try {
    const config = getCommerceConfig();
    if (config.mode === "demo")
      return json(
        readDemoCart(
          request.cookies.get(DEMO_COOKIE)?.value,
          getDemoProducts(),
        ),
      );
    const cookie = request.cookies.get(LIVE_COOKIE)?.value;
    const result = await getLiveCart(validCartCookie(cookie));
    const response = json(result.cart);
    if (cookie && !result.cartId) response.cookies.delete(LIVE_COOKIE);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request, process.env.NEXT_PUBLIC_SITE_URL);
    if (
      request.headers.get("content-type")?.split(";")[0].trim() !==
      "application/json"
    ) {
      throw new CommerceError(
        "Send a JSON cart request.",
        "INVALID_REQUEST",
        415,
      );
    }
    if (Number(request.headers.get("content-length")) > 4096)
      throw new CommerceError(
        "That request is too large.",
        "INVALID_REQUEST",
        413,
      );
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > 4096)
      throw new CommerceError(
        "That request is too large.",
        "INVALID_REQUEST",
        413,
      );
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      throw new CommerceError(
        "That cart request is not valid JSON.",
        "INVALID_REQUEST",
        400,
      );
    }
    const action = parseCartAction(data);
    const config = getCommerceConfig();
    if (config.mode === "demo") {
      const products = getDemoProducts();
      const cart = mutateDemoCart(
        readDemoCart(request.cookies.get(DEMO_COOKIE)?.value, products),
        action,
        products,
      );
      const response = json(cart);
      setCookie(response, request, DEMO_COOKIE, writeDemoCart(cart));
      return response;
    }
    const id = validCartCookie(request.cookies.get(LIVE_COOKIE)?.value);
    if (action.action === "checkout")
      return json({ checkoutUrl: await liveCheckout(id) });
    const result = await mutateLiveCart(id, action);
    const response = json(result.cart);
    setCookie(response, request, LIVE_COOKIE, result.cartId);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
