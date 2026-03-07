"use client";

// src/app/(main)/cart/page.tsx
// Premium light warm food-brand cart page — Sunrise Fast Food & Juice and Ice-Cream Corner.
// Zero dark surfaces. Mobile-first. Conversion-focused.

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag,
    MessageCircle, ChevronRight, ShieldCheck, Flame,
    Zap, Star, Package,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────
type CartItem = {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
    category: string;
};

// ─── Empty state ──────────────────────────────────────────────────────────
const CRAVING_CHIPS = [
    { emoji: "🍔", label: "Burgers" },
    { emoji: "🍕", label: "Pizza" },
    { emoji: "🥤", label: "Shakes" },
    { emoji: "☕", label: "Coffee" },
    { emoji: "🍦", label: "Ice Cream" },
    { emoji: "🥟", label: "Momos" },
];

function EmptyCart() {
    return (
        <div className="flex flex-col items-center rounded-3xl border border-amber-100 bg-white px-6 py-16 text-center shadow-sm md:py-24">
            {/* Icon */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-inner">
                <ShoppingBag size={40} className="text-amber-400" strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-xs text-white shadow-md">
                    0
                </span>
            </div>

            <h2 className="text-2xl font-black text-stone-900">Your cart is empty</h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-500">
                Looks like you haven't added anything yet. Something delicious is waiting for you!
            </p>

            {/* Craving chips */}
            <div className="mt-7 flex flex-wrap justify-center gap-2">
                {CRAVING_CHIPS.map(({ emoji, label }) => (
                    <Link
                        key={label}
                        href="/menu"
                        className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-stone-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                    >
                        <span>{emoji}</span>
                        {label}
                    </Link>
                ))}
            </div>

            <Link
                href="/menu"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all hover:brightness-110 hover:shadow-orange-300 active:scale-95"
            >
                Explore Menu
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Trust chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {[
                    { icon: Flame, text: "Fresh Daily" },
                    { icon: Zap, text: "25 Min Delivery" },
                    { icon: ShieldCheck, text: "WhatsApp Checkout" },
                ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                        <Icon size={12} className="text-amber-500" strokeWidth={2.5} />
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Cart item card ───────────────────────────────────────────────────────
function CartItemRow({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: {
    item: CartItem;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}) {
    const atMax = item.quantity >= item.stock;

    return (
        <article className="group relative flex gap-3.5 rounded-2xl border border-amber-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 md:gap-5 md:p-5">

            {/* Product image */}
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl border border-amber-100 bg-amber-50 md:h-28 md:w-28 md:rounded-2xl">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=75&auto=format&fit=crop";
                    }}
                />
                {/* Warm vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div>
                    {/* Category chip */}
                    <span className="mb-1.5 inline-block rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-orange-600">
                        {item.category}
                    </span>
                    <h3 className="line-clamp-1 text-[15px] font-black text-stone-900 md:text-lg">
                        {item.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-semibold text-stone-400">
                        ₹{item.price} per item
                    </p>
                </div>

                {/* Bottom row */}
                <div className="flex flex-wrap items-center justify-between gap-2">

                    {/* Qty controls */}
                    <div className="flex items-center overflow-hidden rounded-full border border-amber-200 bg-amber-50 shadow-sm">
                        <button
                            onClick={onDecrease}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-stone-500 transition-all hover:bg-orange-100 hover:text-orange-600 active:scale-90 md:h-9 md:w-9"
                        >
                            <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="min-w-8 border-x border-amber-200 px-2 text-center text-sm font-black text-stone-900 md:min-w-10">
                            {item.quantity}
                        </span>
                        <button
                            onClick={onIncrease}
                            aria-label="Increase quantity"
                            disabled={atMax}
                            className="flex h-8 w-8 items-center justify-center text-stone-500 transition-all hover:bg-orange-100 hover:text-orange-600 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 md:h-9 md:w-9"
                        >
                            <Plus size={13} strokeWidth={2.5} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Line total */}
                        <p className="text-lg font-black text-orange-600 md:text-xl">
                            ₹{item.price * item.quantity}
                        </p>

                        {/* Remove */}
                        <button
                            onClick={onRemove}
                            aria-label={`Remove ${item.name}`}
                            className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-500 transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-600 active:scale-95"
                        >
                            <Trash2 size={11} strokeWidth={2.5} />
                            <span className="hidden sm:inline">Remove</span>
                        </button>
                    </div>
                </div>

                {/* Stock warning */}
                {atMax && (
                    <p className="text-[10px] font-bold text-amber-600">
                        ⚠️ Max quantity reached ({item.stock} in stock)
                    </p>
                )}
            </div>
        </article>
    );
}

// ─── Free delivery progress bar ───────────────────────────────────────────
const FREE_DELIVERY_AT = 499;

function DeliveryProgress({ total }: { total: number }) {
    if (total >= FREE_DELIVERY_AT) {
        return (
            <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                <span className="text-lg">🎉</span>
                <p className="text-[12px] font-black text-green-700">
                    You've unlocked <span className="text-green-600">FREE delivery!</span> Enjoy!
                </p>
            </div>
        );
    }
    const remaining = FREE_DELIVERY_AT - total;
    const pct = Math.min((total / FREE_DELIVERY_AT) * 100, 100);
    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <Tag size={12} className="text-amber-600" strokeWidth={2.5} />
                    <p className="text-[11px] font-black text-stone-700">
                        Add <span className="text-orange-600">₹{remaining}</span> more for free delivery!
                    </p>
                </div>
                <p className="text-[10px] font-bold text-stone-400">₹{total} / ₹{FREE_DELIVERY_AT}</p>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-amber-200">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// ─── Order summary ────────────────────────────────────────────────────────
function OrderSummary({
    items,
    total,
    onCheckout,
    loading,
}: {
    items: CartItem[];
    total: number;
    onCheckout: () => void;
    loading: boolean;
}) {
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const deliveryFee = total >= FREE_DELIVERY_AT ? 0 : 50;
    const platformFee = 10;
    const grandTotal = total + deliveryFee + platformFee;

    return (
        <div className="h-fit overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-lg shadow-orange-100/40 md:sticky md:top-24">

            {/* Summary header */}
            <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4">
                <h2 className="text-lg font-black text-stone-900">Order Summary</h2>
                <p className="text-[11px] font-semibold text-stone-500">
                    {totalQty} {totalQty === 1 ? "item" : "items"} · review before checkout
                </p>
            </div>

            <div className="p-5">
                {/* Item breakdown */}
                <div className="space-y-2.5">
                    {items.map((item) => (
                        <div key={item._id} className="flex items-start justify-between gap-3">
                            <span className="flex-1 text-xs leading-snug text-stone-500">
                                <span className="font-bold text-stone-700">{item.name}</span>
                                <span className="ml-1.5 text-stone-400">×{item.quantity}</span>
                            </span>
                            <span className="shrink-0 text-xs font-black text-stone-700">
                                ₹{item.price * item.quantity}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="my-4 h-px bg-amber-100" />

                {/* Subtotal + delivery + platform fee */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-500">
                            Subtotal ({totalQty} items)
                        </span>
                        <span className="text-sm font-bold text-stone-700">₹{total}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm text-stone-500">Delivery</span>
                            {deliveryFee === 0 && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black text-green-700">
                                    FREE
                                </span>
                            )}
                        </div>
                        <span
                            className={`text-sm font-bold ${deliveryFee === 0 ? "text-green-600" : "text-stone-700"
                                }`}
                        >
                            {deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-500">Platform Fee</span>
                        <span className="text-sm font-bold text-stone-700">₹{platformFee}</span>
                    </div>
                </div>

                <div className="my-4 h-px bg-amber-100" />

                {/* Grand total */}
                <div className="flex items-center justify-between">
                    <span className="text-base font-black text-stone-900">Total</span>
                    <span className="text-2xl font-black text-orange-600">₹{grandTotal}</span>
                </div>

                {/* Savings chip */}
                {deliveryFee === 0 && (
                    <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-green-50 px-3 py-2">
                        <span className="text-sm">🎉</span>
                        <p className="text-[11px] font-bold text-green-700">
                            You're saving ₹50 on delivery!
                        </p>
                    </div>
                )}

                {/* Checkout CTA */}
                <button
                    onClick={onCheckout}
                    disabled={loading}
                    className="group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-4 text-[15px] font-black text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:brightness-110 hover:shadow-orange-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Checking...
                        </span>
                    ) : (
                        <>
                            Proceed to Checkout
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>

                {/* WhatsApp assurance */}
                <div className="mt-3.5 flex items-center justify-center gap-2">
                    <MessageCircle size={13} className="text-[#25D366]" strokeWidth={2} />
                    <p className="text-[11px] font-bold text-stone-500">
                        Order confirmed via <span className="text-[#25D366]">WhatsApp</span>
                    </p>
                </div>

                {/* Trust strip */}
                <div className="mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={11} className="text-amber-500" strokeWidth={2.5} />
                    <p className="text-[10px] font-semibold text-stone-400">
                        Secure · Fresh · No app install needed
                    </p>
                </div>

                <div className="mt-4 h-px bg-amber-100" />

                {/* Continue shopping */}
                <Link
                    href="/menu"
                    className="group mt-4 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-amber-200 bg-amber-50 py-2.5 text-xs font-bold text-amber-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                >
                    + Add More Items
                    <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function CartPage() {
    const router = useRouter();
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const getTotalPrice = useCartStore((s) => s.getTotalPrice);

    const totalPrice = getTotalPrice();
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);

    // ── Checkout auth guard ────────────────────────────────────────────────
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    async function handleCheckout() {
        setCheckoutLoading(true);
        try {
            const res = await fetch("/api/auth/me");
            if (!res.ok) {
                router.push("/auth?redirect=/checkout");
                return;
            }
            router.push("/checkout");
        } catch {
            router.push("/auth?redirect=/checkout");
        } finally {
            setCheckoutLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#FFFBF5]">

                {/* ── Page header ── */}
                <div className="relative overflow-hidden border-b border-amber-100 bg-white">
                    {/* Warm radial glow */}
                    <div
                        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                        style={{ background: "radial-gradient(ellipse, #fed7aa, transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-12 md:px-8">
                        {/* Eyebrow */}
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.7)]" />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-600">
                                Review Order
                            </span>
                        </div>
                        <h1 className="text-3xl font-black text-stone-900 md:text-4xl">
                            Your Cart 🛒
                        </h1>
                        {items.length > 0 ? (
                            <p className="mt-1.5 text-sm font-semibold text-stone-500">
                                {totalQty} {totalQty === 1 ? "item" : "items"} · almost there — checkout takes 30 seconds
                            </p>
                        ) : (
                            <p className="mt-1.5 text-sm text-stone-400">Add something delicious to get started</p>
                        )}
                    </div>
                </div>

                {/* ── Content ── */}
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
                    {items.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">

                            {/* ── Left: items ── */}
                            <div className="flex flex-col gap-4">

                                {/* Items header */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">
                                        Items ({items.length})
                                    </p>
                                    <Link
                                        href="/menu"
                                        className="flex items-center gap-1 text-[12px] font-bold text-orange-500 transition-colors hover:text-orange-600"
                                    >
                                        + Add more
                                    </Link>
                                </div>

                                {/* Delivery progress */}
                                <DeliveryProgress total={totalPrice} />

                                {/* Item cards */}
                                {items.map((item) => (
                                    <CartItemRow
                                        key={item._id}
                                        item={item}
                                        onIncrease={() => increaseQty(item._id)}
                                        onDecrease={() => decreaseQty(item._id)}
                                        onRemove={() => removeItem(item._id)}
                                    />
                                ))}

                                {/* Mobile summary CTA — only visible on mobile */}
                                <div className="block lg:hidden">
                                    <div className="rounded-3xl border border-amber-200 bg-white p-5 shadow-md shadow-orange-100/50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[11px] font-bold text-stone-500">
                                                    {totalQty} items · delivery {totalPrice >= FREE_DELIVERY_AT ? "FREE 🎉" : `₹40`}
                                                </p>
                                                <p className="text-2xl font-black text-orange-600">
                                                    ₹{totalPrice + (totalPrice >= FREE_DELIVERY_AT ? 0 : 40)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={handleCheckout}
                                                disabled={checkoutLoading}
                                                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
                                            >
                                                {checkoutLoading ? (
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                ) : (
                                                    <>Checkout <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></>
                                                )}
                                            </button>
                                        </div>
                                        <div className="mt-3 flex items-center justify-center gap-2">
                                            <MessageCircle size={12} className="text-[#25D366]" />
                                            <p className="text-[11px] font-semibold text-stone-400">
                                                Confirmed via WhatsApp · Fresh & hot
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Reassurance footer */}
                                <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-amber-100 bg-white px-5 py-4">
                                    {[
                                        { icon: Flame, label: "Made Fresh" },
                                        { icon: Zap, label: "25 Min Delivery" },
                                        { icon: Package, label: "Hot Guaranteed" },
                                        { icon: ShieldCheck, label: "WhatsApp Checkout" },
                                        { icon: Star, label: "4.9★ Rated" },
                                    ].map(({ icon: Icon, label }) => (
                                        <div key={label} className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                                            <Icon size={12} className="text-amber-500" strokeWidth={2.5} />
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Right: summary (desktop only) ── */}
                            <div className="hidden lg:block">
                                <OrderSummary
                                    items={items}
                                    total={totalPrice}
                                    onCheckout={handleCheckout}
                                    loading={checkoutLoading}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}