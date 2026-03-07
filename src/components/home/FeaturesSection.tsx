"use client";

// src/components/home/FeaturesSection.tsx
// Premium "How It Works" section for Sunrise Fast Food & Juice and Ice-Cream Corner.
// Emphasizes PWA install for repeat ordering — light warm premium theme.

import Link from "next/link";
import {
    ShoppingBag, MessageCircle, MapPin, Smartphone,
    ArrowRight, CheckCircle2, Sparkles, Star, Flame, Download,
} from "lucide-react";

const steps = [
    {
        step: "01",
        icon: ShoppingBag,
        emoji: "🛒",
        title: "Browse & Add to Cart",
        description:
            "Explore 74+ menu items across burgers, pizzas, shakes, juices and ice creams. Add with a single tap — fast, smooth, satisfying.",
        highlight: "74+ Menu Items",
        color: "amber",
        perks: ["Easy category browse", "Item details & pricing", "Add to cart instantly"],
    },
    {
        step: "02",
        icon: MessageCircle,
        emoji: "💬",
        title: "Checkout via WhatsApp",
        description:
            "No app install needed. Confirm your order on WhatsApp in seconds — we receive it instantly and start cooking right away.",
        highlight: "Zero-friction checkout",
        color: "orange",
        perks: ["Instant confirmation", "No app required", "Direct with our team"],
    },
    {
        step: "03",
        icon: MapPin,
        emoji: "🛵",
        title: "Fast Local Delivery",
        description:
            "Hot and fresh to your door in 25 minutes. Pickup also available for quick, hassle-free collection.",
        highlight: "Avg. 25 min delivery",
        color: "red",
        perks: ["Hot & fresh guaranteed", "Contactless delivery", "Pickup option"],
    },
    {
        step: "04",
        icon: Smartphone,
        emoji: "📲",
        title: "Install for Faster Orders",
        description:
            "Add Sunrise to your home screen as a web app. No App Store needed — tap once and reorder your favourites in seconds, every time.",
        highlight: "One-tap reorder",
        color: "green",
        perks: ["Works like a native app", "No App Store needed", "Faster repeat orders"],
        isPwa: true,
    },
];

const colorMap: Record<
    string,
    {
        cardBorder: string;
        cardBg: string;
        stepText: string;
        iconBg: string;
        badge: string;
        dot: string;
    }
> = {
    amber: {
        cardBorder: "border-amber-200",
        cardBg: "from-amber-50/60 to-white",
        stepText: "text-amber-200",
        iconBg: "bg-amber-100 border-amber-200",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        dot: "bg-amber-400",
    },
    orange: {
        cardBorder: "border-orange-200",
        cardBg: "from-orange-50/60 to-white",
        stepText: "text-orange-200",
        iconBg: "bg-orange-100 border-orange-200",
        badge: "bg-orange-100 text-orange-700 border-orange-200",
        dot: "bg-orange-400",
    },
    red: {
        cardBorder: "border-red-100",
        cardBg: "from-red-50/40 to-white",
        stepText: "text-red-100",
        iconBg: "bg-red-50 border-red-200",
        badge: "bg-red-50 text-red-600 border-red-200",
        dot: "bg-red-400",
    },
    green: {
        cardBorder: "border-emerald-200",
        cardBg: "from-emerald-50/50 to-white",
        stepText: "text-emerald-100",
        iconBg: "bg-emerald-50 border-emerald-200",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-400",
    },
};

const highlights = [
    {
        icon: Star,
        label: "4.9 / 5",
        sublabel: "Customer Rating",
        bg: "bg-amber-50",
        border: "border-amber-200",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
    },
    {
        icon: Flame,
        label: "Daily Fresh",
        sublabel: "Prepared Every Morning",
        bg: "bg-orange-50",
        border: "border-orange-200",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
    },
    {
        icon: Download,
        label: "Install Free",
        sublabel: "Add to Home Screen",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
];

export default function FeaturesSection() {
    return (
        <section className="relative overflow-hidden bg-[#FFFBF5] py-20 md:py-24">
            {/* Dot grid texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #92400e 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 md:px-8">

                {/* Section header */}
                <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
                            <Sparkles size={12} className="text-orange-500" />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-600">
                                How It Works
                            </span>
                        </div>
                        <h2 className="text-3xl font-black leading-tight tracking-tight text-stone-900 md:text-4xl">
                            Ordering food has never{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(135deg, #ea580c, #d97706)" }}
                            >
                                felt this easy
                            </span>
                        </h2>
                        <p className="mt-3 text-stone-500 leading-relaxed">
                            Four simple steps from craving to delivery — and even faster next time with our web app.
                        </p>
                    </div>
                    <Link
                        href="/menu"
                        className="group hidden shrink-0 items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-bold text-amber-700 shadow-sm transition-all hover:border-orange-300 hover:bg-amber-50 md:inline-flex"
                    >
                        Explore Menu
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Step cards — 2×2 on desktop, 1 col on mobile */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        const c = colorMap[s.color];
                        return (
                            <div
                                key={s.step}
                                className={`group relative flex flex-col overflow-hidden rounded-3xl border ${c.cardBorder} bg-gradient-to-br ${c.cardBg} p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-100/60 ${
                                    s.isPwa
                                        ? "ring-2 ring-emerald-200/60 ring-offset-2 ring-offset-[#FFFBF5]"
                                        : ""
                                }`}
                            >
                                {/* Step watermark */}
                                <span
                                    className={`pointer-events-none absolute -right-3 -top-4 select-none font-black text-[7rem] leading-none ${c.stepText}`}
                                    aria-hidden="true"
                                >
                                    {s.step}
                                </span>

                                {/* PWA star badge */}
                                {s.isPwa && (
                                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
                                        <Download size={9} strokeWidth={2.5} />
                                        Install
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="relative z-10 mb-5">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${c.iconBg}`}
                                    >
                                        <span className="text-2xl">{s.emoji}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-1 flex-col">
                                    <div className="mb-1 flex items-center gap-2">
                                        <span
                                            className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${c.badge}`}
                                        >
                                            Step {i + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 text-base font-black leading-snug text-stone-900">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2.5 text-sm leading-7 text-stone-500">{s.description}</p>

                                    {/* Highlight pill */}
                                    <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
                                        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                                        <span className="text-[11px] font-bold text-amber-700">{s.highlight}</span>
                                    </div>

                                    {/* Perks */}
                                    <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4">
                                        {s.perks.map((perk) => (
                                            <li key={perk} className="flex items-center gap-2 text-xs text-stone-500">
                                                <CheckCircle2
                                                    size={13}
                                                    className={`shrink-0 ${s.isPwa ? "text-emerald-400" : "text-orange-400"}`}
                                                    strokeWidth={2.5}
                                                />
                                                {perk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* PWA install nudge banner */}
                <div className="mt-6 overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-md shadow-emerald-200">
                                <Smartphone size={22} className="text-white" strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="font-black text-stone-900">
                                    📲 Install Sunrise on your phone — it's free!
                                </h3>
                                <p className="mt-1 text-sm text-stone-500 max-w-md">
                                    Tap the <strong>Share</strong> button in your browser → <strong>Add to Home Screen</strong>. 
                                    Opens like an app, no App Store needed. Reorder in one tap every time.
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                            <Link
                                href="/menu"
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-emerald-200 transition-all hover:brightness-110 active:scale-95"
                            >
                                <Download size={14} strokeWidth={2.5} />
                                Install
                            </Link>
                            <Link
                                href="/menu"
                                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-50"
                            >
                                Order First
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Highlights */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {highlights.map(({ icon: Icon, label, sublabel, bg, border, iconBg, iconColor }) => (
                        <div
                            key={label}
                            className={`flex items-center gap-4 rounded-2xl border ${border} ${bg} p-4`}
                        >
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${border} ${iconBg}`}
                            >
                                <Icon size={18} className={iconColor} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-lg font-black text-stone-900">{label}</p>
                                <p className="text-xs text-stone-500">{sublabel}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA banner */}
                <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-8 md:p-10">
                    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-white md:text-3xl">
                                Ready to taste the difference?
                            </h3>
                            <p className="mt-1.5 text-sm text-white/80">
                                Join thousands of happy customers ordering fresh every day.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 shrink-0">
                            <Link
                                href="/menu"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-orange-600 shadow-lg transition-all hover:bg-orange-50 active:scale-95"
                            >
                                Order Now
                                <ArrowRight size={14} />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}