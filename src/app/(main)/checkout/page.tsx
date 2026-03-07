"use client";

// src/app/(main)/checkout/page.tsx
// Premium light warm food-brand checkout — Sunrise Fast Food & Juice and Ice-Cream Corner.
// ALL existing logic preserved. Zero dark surfaces. Mobile-first. Swiggy/Zomato-grade UX.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import {
    ShoppingBag, MapPin, Phone, User, MessageSquare,
    Truck, Store, ArrowRight, Loader2, ShieldCheck,
    MessageCircle, Clock, Tag, CheckCircle2, ChevronRight,
    Flame, Zap, Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────
type OrderType = "delivery" | "pickup";
type FormState = {
    customerName: string;
    phone: string;
    address: string;
    landmark: string;
    note: string;
    orderType: OrderType;
};

// ─── Helpers (ALL PRESERVED) ──────────────────────────────────────────────
function buildWhatsAppMessage(
    form: FormState,
    items: { name: string; quantity: number; price: number }[],
    total: number,
    orderId: string
): string {
    const lines = [
        `🌅 *New Order — Sunrise Fast Food*`,
        `Order ID: ${orderId}`,
        ``,
        `*Customer Details*`,
        `Name: ${form.customerName}`,
        `Phone: ${form.phone}`,
        form.orderType === "delivery"
            ? `Address: ${form.address}${form.landmark ? ` (Near: ${form.landmark})` : ""}`
            : `Order Type: Pickup`,
        ``,
        `*Order Items*`,
        ...items.map((i) => `• ${i.name} × ${i.quantity} — ₹${i.price * i.quantity}`),
        ``,
        `*Total: ₹${total}*`,
        form.note ? `Note: ${form.note}` : "",
    ];
    return encodeURIComponent(lines.filter(Boolean).join("\n"));
}

function tryPrefillFromStorage(): Partial<FormState> {
    try {
        const raw = localStorage.getItem("cafeapp_user");
        if (!raw) return {};
        const u = JSON.parse(raw);
        return {
            customerName: u.name || u.customerName || "",
            phone: u.phone || "",
            address: typeof u.address === "string" ? u.address : u.address?.line1 || u.addressLine1 || "",
            landmark: u.landmark || u.address?.landmark || "",
        };
    } catch { return {}; }
}

function getDeliveryFee(orderType: OrderType, total: number) {
    if (orderType !== "delivery") return 0;
    return total < 499 ? 40 : 0;
}

const PLATFORM_FEE = 10;
const FREE_DELIVERY_AT = 499;

// ─── Sub-components ───────────────────────────────────────────────────────

// Progress bar
function CheckoutProgress() {
    return (
        <div className="flex items-center justify-center gap-0">
            {/* Step 1 — done */}
            <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow-sm shadow-green-200">
                    <CheckCircle2 size={13} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[11px] font-black text-green-600">Cart</span>
            </div>
            <div className="mx-2 h-px w-8 bg-amber-300" />
            {/* Step 2 — active */}
            <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 shadow-sm shadow-orange-200">
                    <span className="text-[10px] font-black text-white">2</span>
                </div>
                <span className="text-[11px] font-black text-orange-600">Checkout</span>
            </div>
            <div className="mx-2 h-px w-8 bg-stone-200" />
            {/* Step 3 — upcoming */}
            <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-stone-200 bg-white">
                    <span className="text-[10px] font-bold text-stone-400">3</span>
                </div>
                <span className="text-[11px] font-bold text-stone-400">WhatsApp</span>
            </div>
        </div>
    );
}

// Section card wrapper
function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );
}

// Section header inside card
function SectionHeader({ emoji, title, sub }: { emoji: string; title: string; sub?: string }) {
    return (
        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4">
            <div className="flex items-center gap-2.5">
                <span className="text-xl">{emoji}</span>
                <div>
                    <p className="text-[13px] font-black text-stone-900">{title}</p>
                    {sub && <p className="text-[11px] text-stone-500">{sub}</p>}
                </div>
            </div>
        </div>
    );
}

// Light input field
function LightInput({
    value, onChange, placeholder, type = "text", autoComplete, required, icon,
}: {
    value: string; onChange: (v: string) => void; placeholder: string;
    type?: string; autoComplete?: string; required?: boolean; icon?: React.ReactNode;
}) {
    return (
        <div className="relative flex items-center">
            {icon && (
                <span className="pointer-events-none absolute left-3.5 text-stone-400">{icon}</span>
            )}
            <input
                type={type} value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} autoComplete={autoComplete} required={required}
                className={`w-full rounded-2xl border border-amber-200 bg-amber-50/40 py-3 text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-amber-300 ${icon ? "pl-10 pr-4" : "px-4"}`}
            />
        </div>
    );
}

// Light textarea
function LightTextarea({
    value, onChange, placeholder, rows = 3, icon,
}: {
    value: string; onChange: (v: string) => void;
    placeholder: string; rows?: number; icon?: React.ReactNode;
}) {
    return (
        <div className="relative">
            {icon && (
                <span className="pointer-events-none absolute left-3.5 top-3.5 text-stone-400">{icon}</span>
            )}
            <textarea
                value={value} onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} rows={rows}
                className={`w-full resize-none rounded-2xl border border-amber-200 bg-amber-50/40 py-3 text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-amber-300 ${icon ? "pl-10 pr-4" : "px-4"}`}
            />
        </div>
    );
}

// Order type selector
function OrderTypeSelector({
    value, onChange,
}: { value: OrderType; onChange: (t: OrderType) => void }) {
    const options: { type: OrderType; icon: typeof Truck; title: string; sub: string; emoji: string }[] = [
        { type: "delivery", icon: Truck,  emoji: "🛵", title: "Home Delivery", sub: "Delivered in ~25 min" },
        { type: "pickup",   icon: Store,  emoji: "🏪", title: "Self Pickup",   sub: "Ready in 10–15 min" },
    ];
    return (
        <div className="grid grid-cols-2 gap-3">
            {options.map(({ type, icon: Icon, emoji, title, sub }) => {
                const active = value === type;
                return (
                    <button
                        key={type} type="button" onClick={() => onChange(type)}
                        className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
                            active
                                ? "border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 shadow-md shadow-orange-100"
                                : "border-amber-200 bg-white hover:border-amber-300 hover:bg-amber-50"
                        }`}
                    >
                        {active && (
                            <div className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500">
                                <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                            </div>
                        )}
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 text-2xl transition-all ${
                            active ? "border-orange-300 bg-orange-100 shadow-sm" : "border-amber-200 bg-amber-50"
                        }`}>
                            {emoji}
                        </div>
                        <div>
                            <p className={`text-sm font-black ${active ? "text-orange-700" : "text-stone-800"}`}>{title}</p>
                            <p className={`text-[11px] font-semibold ${active ? "text-orange-500" : "text-stone-400"}`}>{sub}</p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

// Delivery progress bar inside checkout
function CheckoutDeliveryBar({ total }: { total: number }) {
    if (total >= FREE_DELIVERY_AT) {
        return (
            <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5">
                <span className="text-base">🎉</span>
                <p className="text-[12px] font-black text-green-700">Free delivery unlocked!</p>
            </div>
        );
    }
    const pct = Math.min((total / FREE_DELIVERY_AT) * 100, 100);
    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[11px] font-black text-stone-700">
                    Add <span className="text-orange-600">₹{FREE_DELIVERY_AT - total}</span> for free delivery
                </p>
                <p className="text-[10px] font-bold text-stone-400">₹{total} / ₹{FREE_DELIVERY_AT}</p>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-amber-200">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// Empty cart state
function EmptyCartState() {
    return (
        <div className="flex flex-col items-center rounded-3xl border border-amber-100 bg-white px-6 py-20 text-center shadow-sm">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                <ShoppingBag size={36} className="text-amber-400" strokeWidth={1.5} />
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-[10px] font-black text-white shadow-md">0</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900">Your cart is empty</h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-500">
                Add some delicious items to your cart before checking out.
            </p>
            <Link
                href="/menu"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all hover:brightness-110 active:scale-95"
            >
                Explore Menu <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
    const router = useRouter();
    const items        = useCartStore((s) => s.items);
    const clearCart    = useCartStore((s) => s.clearCart);
    const getTotalPrice = useCartStore((s) => s.getTotalPrice);

    const [form, setForm] = useState<FormState>({
        customerName: "", phone: "", address: "",
        landmark: "", note: "", orderType: "delivery",
    });
    const [loading, setLoading] = useState(false);

    const totalPrice  = getTotalPrice();
    const totalQty    = items.reduce((s, i) => s + i.quantity, 0);
    const deliveryFee = getDeliveryFee(form.orderType, totalPrice);
    const grandTotal  = totalPrice + deliveryFee + PLATFORM_FEE;

    const set = (key: keyof FormState) => (value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // Prefill from localStorage
    useEffect(() => {
        const prefill = tryPrefillFromStorage();
        if (Object.keys(prefill).length > 0) {
            setForm((prev) => ({ ...prev, ...prefill }));
        }
    }, []);

    // Auth guard
    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/auth/me");
            if (!res.ok) router.push("/auth?redirect=/checkout");
        }
        checkAuth();
    }, []);

    // ── Submit (ALL LOGIC PRESERVED) ────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.customerName.trim()) { toast.error("Please enter your name"); return; }
        if (!form.phone.trim() || form.phone.trim().length < 10) { toast.error("Please enter a valid phone number"); return; }
        if (form.orderType === "delivery" && !form.address.trim()) { toast.error("Please enter your delivery address"); return; }
        if (items.length === 0) { toast.error("Your cart is empty"); return; }

        setLoading(true);
        try {
            const payload = {
                customerName: form.customerName.trim(),
                phone: form.phone.trim(),
                address: form.orderType === "delivery" ? form.address.trim() : "Pickup",
                landmark: form.landmark.trim(),
                note: form.note.trim(),
                orderType: form.orderType,
                items: items.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                })),
                totalAmount: grandTotal,
            };

            const res  = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error(data.message || "Failed to place order. Please try again.");
                setLoading(false);
                return;
            }

            const orderId = data?.order?.orderId || data?.order?._id || data?._id || `ORD-${Date.now()}`;
            const waMsg   = buildWhatsAppMessage(form, items, grandTotal, orderId);
            const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917878583600";

            toast.success("Order placed! Opening WhatsApp… 🎉", {
                duration: 3500,
                style: {
                    background: "#fff", color: "#1c1917",
                    border: "1.5px solid #fed7aa", borderRadius: "16px",
                    fontWeight: "700", fontSize: "13px",
                    boxShadow: "0 8px 24px rgba(249,115,22,0.15)",
                },
                iconTheme: { primary: "#f97316", secondary: "#fff" },
            });
            clearCart();
            setTimeout(() => {
                window.open(`https://wa.me/${waNumber}?text=${waMsg}`, "_blank");
                router.push("/");
            }, 1000);
        } catch {
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#FFFBF5]">

                {/* ── Page header ── */}
                <div className="relative overflow-hidden border-b border-amber-100 bg-white">
                    <div
                        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                        style={{ background: "radial-gradient(ellipse, #fed7aa, transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-10 md:px-8">
                        {/* Progress bar */}
                        <div className="mb-5">
                            <CheckoutProgress />
                        </div>
                        {/* Title */}
                        <h1 className="text-3xl font-black text-stone-900 md:text-4xl">
                            Complete Your Order 🧾
                        </h1>
                        {items.length > 0 && (
                            <p className="mt-1.5 text-sm font-semibold text-stone-500">
                                {totalQty} item{totalQty !== 1 ? "s" : ""} · confirm details and place via WhatsApp
                            </p>
                        )}

                        {/* Trust badges row */}
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                            {[
                                { icon: ShieldCheck,    text: "Secure checkout" },
                                { icon: MessageCircle,  text: "WhatsApp confirmation" },
                                { icon: Clock,          text: "Avg 25 min delivery" },
                                { icon: Zap,            text: "No payment required now" },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                                    <Icon size={11} className="text-amber-500" strokeWidth={2.5} />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Content ── */}
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
                    {items.length === 0 ? (
                        <EmptyCartState />
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid gap-5 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]">

                                {/* ══ LEFT: Form ══════════════════════════════════════════ */}
                                <div className="flex flex-col gap-5">

                                    {/* 1. Order type */}
                                    <SectionCard>
                                        <SectionHeader emoji="🛵" title="How do you want your order?" sub="Choose delivery or pickup" />
                                        <div className="p-5">
                                            <OrderTypeSelector
                                                value={form.orderType}
                                                onChange={(t) => setForm((p) => ({ ...p, orderType: t }))}
                                            />
                                            {form.orderType === "delivery" && (
                                                <div className="mt-3">
                                                    <CheckoutDeliveryBar total={totalPrice} />
                                                </div>
                                            )}
                                        </div>
                                    </SectionCard>

                                    {/* 2. Contact details */}
                                    <SectionCard>
                                        <SectionHeader emoji="👤" title="Contact Details" sub="We'll share updates on WhatsApp" />
                                        <div className="p-5">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div className="flex flex-col gap-1.5 sm:col-span-2">
                                                    <label className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">
                                                        Full Name <span className="text-orange-500">*</span>
                                                    </label>
                                                    <LightInput
                                                        value={form.customerName}
                                                        onChange={set("customerName")}
                                                        placeholder="Your full name"
                                                        autoComplete="name"
                                                        required
                                                        icon={<User size={14} strokeWidth={2} />}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5 sm:col-span-2">
                                                    <label className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">
                                                        Phone Number <span className="text-orange-500">*</span>
                                                    </label>
                                                    <LightInput
                                                        value={form.phone}
                                                        onChange={set("phone")}
                                                        placeholder="+91 98765 43210"
                                                        type="tel"
                                                        autoComplete="tel"
                                                        required
                                                        icon={<Phone size={14} strokeWidth={2} />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </SectionCard>

                                    {/* 3. Delivery address (conditional) */}
                                    {form.orderType === "delivery" && (
                                        <SectionCard>
                                            <SectionHeader emoji="📍" title="Delivery Address" sub="Where should we deliver?" />
                                            <div className="p-5 space-y-4">
                                                {/* Helper example */}
                                                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2.5">
                                                    <p className="text-[11px] font-bold text-blue-700">
                                                        Example: House 21, Shanti Colony, Near Hanuman Mandir, Danta, Sikar
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">
                                                        Full Address <span className="text-orange-500">*</span>
                                                    </label>
                                                    <LightTextarea
                                                        value={form.address}
                                                        onChange={set("address")}
                                                        placeholder="House no., Street, Colony, Area..."
                                                        rows={2}
                                                        icon={<MapPin size={14} strokeWidth={2} />}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">
                                                        Landmark <span className="text-stone-300 normal-case tracking-normal font-semibold">(optional)</span>
                                                    </label>
                                                    <LightInput
                                                        value={form.landmark}
                                                        onChange={set("landmark")}
                                                        placeholder="Near temple, school, etc."
                                                        icon={<Tag size={14} strokeWidth={2} />}
                                                    />
                                                </div>
                                            </div>
                                        </SectionCard>
                                    )}

                                    {/* 4. Special note */}
                                    <SectionCard>
                                        <SectionHeader emoji="✏️" title="Special Instructions" sub="Any requests? We'll do our best!" />
                                        <div className="p-5">
                                            <LightTextarea
                                                value={form.note}
                                                onChange={set("note")}
                                                placeholder="Allergies, spice level, extra sauce, specific instructions..."
                                                rows={3}
                                                icon={<MessageSquare size={14} strokeWidth={2} />}
                                            />
                                        </div>
                                    </SectionCard>

                                    {/* Mobile submit CTA */}
                                    <div className="block lg:hidden">
                                        <div className="rounded-3xl border border-amber-200 bg-white p-5 shadow-md shadow-orange-100/40">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[11px] font-bold text-stone-500">
                                                        {totalQty} items · {form.orderType === "pickup" ? "Pickup" : deliveryFee === 0 ? "Free delivery 🎉" : `+₹${deliveryFee} delivery`}
                                                    </p>
                                                    <p className="text-2xl font-black text-orange-600">₹{grandTotal}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-stone-400">incl. ₹{PLATFORM_FEE} platform fee</p>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] py-4 text-[15px] font-black text-white shadow-lg shadow-green-200 transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-70"
                                            >
                                                {loading ? (
                                                    <Loader2 size={18} className="animate-spin" />
                                                ) : (
                                                    <>
                                                        <MessageCircle size={18} strokeWidth={2.5} />
                                                        Place Order via WhatsApp
                                                    </>
                                                )}
                                            </button>
                                            <p className="mt-2.5 text-center text-[11px] text-stone-400">
                                                You'll confirm your order directly on WhatsApp · No payment required now
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ══ RIGHT: Order summary (desktop sticky) ═══════════════ */}
                                <div className="hidden lg:block">
                                    <div className="sticky top-24 flex flex-col gap-4">

                                        {/* Summary card */}
                                        <div className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-lg shadow-orange-100/40">

                                            {/* Header */}
                                            <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4">
                                                <h2 className="text-lg font-black text-stone-900">Order Summary</h2>
                                                <p className="text-[11px] text-stone-500">{totalQty} items · ready to confirm</p>
                                            </div>

                                            <div className="p-5">
                                                {/* Item rows */}
                                                <div className="space-y-3">
                                                    {items.map((item) => (
                                                        <div key={item._id} className="group flex items-center gap-3">
                                                            {/* Image */}
                                                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-amber-100 bg-amber-50">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                                    loading="lazy"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src =
                                                                            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=75&auto=format&fit=crop";
                                                                    }}
                                                                />
                                                                {/* Qty badge */}
                                                                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white shadow-sm">
                                                                    {item.quantity}
                                                                </span>
                                                            </div>
                                                            {/* Name + price */}
                                                            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                                                                <p className="truncate text-[13px] font-bold text-stone-700">{item.name}</p>
                                                                <p className="shrink-0 text-sm font-black text-orange-600">₹{item.price * item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="my-4 h-px bg-amber-100" />

                                                {/* Pricing breakdown */}
                                                <div className="space-y-2.5">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-stone-500">Subtotal ({totalQty} items)</span>
                                                        <span className="font-bold text-stone-700">₹{totalPrice}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-stone-500">Delivery</span>
                                                            {deliveryFee === 0 && form.orderType === "delivery" && (
                                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black text-green-700">FREE</span>
                                                            )}
                                                        </div>
                                                        <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : "text-stone-700"}`}>
                                                            {form.orderType === "pickup" ? "N/A" : deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-stone-500">Platform Fee</span>
                                                        <span className="font-bold text-stone-700">₹{PLATFORM_FEE}</span>
                                                    </div>
                                                    {form.orderType === "delivery" && deliveryFee > 0 && (
                                                        <CheckoutDeliveryBar total={totalPrice} />
                                                    )}
                                                </div>

                                                <div className="my-4 h-px bg-amber-100" />

                                                {/* Grand total */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-base font-black text-stone-900">Grand Total</span>
                                                    <span className="text-2xl font-black text-orange-600">₹{grandTotal}</span>
                                                </div>

                                                {/* WhatsApp CTA */}
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] py-4 text-[15px] font-black text-white shadow-lg shadow-green-200 transition-all duration-200 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    {loading ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : (
                                                        <>
                                                            <MessageCircle size={18} strokeWidth={2.5} />
                                                            Place Order via WhatsApp
                                                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                                                        </>
                                                    )}
                                                </button>

                                                {/* Sub-CTA copy */}
                                                <p className="mt-2.5 text-center text-[11px] leading-relaxed text-stone-400">
                                                    You'll confirm your order directly on WhatsApp<br />
                                                    <span className="font-bold text-stone-500">No payment required now</span>
                                                </p>

                                                {/* Trust rows */}
                                                <div className="mt-4 space-y-2 border-t border-amber-100 pt-4">
                                                    {[
                                                        { icon: ShieldCheck,   text: "Secure order — no payment stored" },
                                                        { icon: Clock,         text: "Avg. 25 min delivery time" },
                                                        { icon: MessageCircle, text: "Confirmed live via WhatsApp" },
                                                        { icon: Flame,         text: "Made fresh after your order" },
                                                    ].map(({ icon: Icon, text }) => (
                                                        <div key={text} className="flex items-center gap-2 text-[11px] text-stone-400">
                                                            <Icon size={11} className="shrink-0 text-amber-500" strokeWidth={2} />
                                                            {text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Edit cart link */}
                                        <Link
                                            href="/cart"
                                            className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-white py-3 text-sm font-bold text-amber-700 shadow-sm transition-all hover:border-orange-300 hover:bg-amber-50"
                                        >
                                            <ChevronRight size={14} className="rotate-180" />
                                            Edit Cart
                                        </Link>

                                        {/* Social proof */}
                                        <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
                                            <div className="flex -space-x-2">
                                                {["from-amber-400 to-orange-500", "from-orange-400 to-red-500", "from-yellow-400 to-amber-500"].map((g, i) => (
                                                    <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${g} text-[11px] font-black text-white shadow-sm`}>
                                                        {["P","R","A"][i]}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    {[1,2,3,4,5].map((i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                                                </div>
                                                <p className="text-[10px] font-bold text-stone-500">
                                                    2,450+ happy customers in Sikar & Danta
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
