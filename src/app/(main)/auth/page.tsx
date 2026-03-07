// src/app/(main)/auth/page.tsx
// Premium light warm food-brand auth page for Sunrise Fast Food & Juice and Ice-Cream Corner.
// Desktop: 2-column split (visual story left, auth card right)
// Mobile: compact brand hero + auth card stacked

import AuthTabs from "@/components/auth/AuthTabs";
import Link from "next/link";
import { Star, Zap, Clock, ShieldCheck, ArrowLeft, Flame, Gift, Sparkles } from "lucide-react";

// ── Left panel brand points ───────────────────────────────────────────────
const BRAND_BENEFITS = [
    {
        icon: Zap,
        emoji: "⚡",
        title: "Order in under 60 seconds",
        sub: "Cart saves, details remembered — ultra-fast checkout every time",
        bg: "bg-amber-50",
        border: "border-amber-200",
        iconColor: "text-amber-600",
        iconBg: "bg-amber-100",
    },
    {
        icon: Gift,
        emoji: "🎁",
        title: "Exclusive member deals",
        sub: "Weekly offers, birthday surprises & early access to new items",
        bg: "bg-orange-50",
        border: "border-orange-200",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-100",
    },
    {
        icon: Clock,
        emoji: "🛵",
        title: "Fresh food in 25 minutes",
        sub: "Hot, made-to-order delivery right to your doorstep",
        bg: "bg-red-50",
        border: "border-red-100",
        iconColor: "text-red-500",
        iconBg: "bg-red-100",
    },
    {
        icon: ShieldCheck,
        emoji: "💬",
        title: "WhatsApp checkout — no app needed",
        sub: "Confirm on WhatsApp in one tap. Simple, fast, zero friction.",
        bg: "bg-green-50",
        border: "border-green-200",
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
    },
];

const TESTIMONIALS = [
    { name: "Priya S.",   text: "Best cold coffee & fastest delivery!", avatar: "P", grad: "from-amber-400 to-orange-500" },
    { name: "Rahul M.",   text: "Smash burger + WhatsApp order = perfection.", avatar: "R", grad: "from-orange-400 to-red-500" },
    { name: "Ananya K.",  text: "Love the member deals every week 🔥", avatar: "A", grad: "from-yellow-400 to-amber-500" },
];

type AuthPageProps = {
    searchParams?: Promise<{ redirect?: string }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
    const params = await searchParams;
    const redirectTo = params?.redirect || "/";

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#FFFBF5]">

            {/* ── Warm background radials ── */}
            <div
                className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(ellipse, #fed7aa, transparent 70%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
                style={{ background: "radial-gradient(ellipse, #fde68a, transparent 70%)" }}
                aria-hidden="true"
            />
            {/* Subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "radial-gradient(circle, #92400e 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto grid min-h-screen max-w-7xl px-4 py-8 md:grid-cols-2 md:items-center md:gap-10 md:px-8 lg:gap-16 lg:py-12">

                {/* ══════════════════════════════════════════════════════════
                    LEFT COLUMN — visual story, only on desktop
                ════════════════════════════════════════════════════════════ */}
                <div className="hidden flex-col justify-center md:flex">

                    {/* Back to site */}
                    <Link
                        href="/"
                        className="group mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-sm transition-all hover:border-orange-300 hover:text-orange-600"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                        Back to Sunrise
                    </Link>

                    {/* Brand badge */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-lg shadow-orange-200">
                            <span className="text-2xl">🌅</span>
                            {/* Shimmer ring */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-white/40" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">Sunrise</p>
                            <p className="text-xl font-black leading-tight text-stone-900">Fast Food & Juice</p>
                            <p className="text-sm font-bold text-stone-500">Ice-Cream Corner</p>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-stone-900 lg:text-5xl">
                        Your favourite cafe,{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(135deg, #ea580c, #d97706)" }}
                        >
                            now smarter.
                        </span>
                    </h1>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-stone-500">
                        Sign in to unlock faster ordering, saved addresses, exclusive member deals, and a seamless WhatsApp checkout experience.
                    </p>

                    {/* Benefit cards */}
                    <div className="mt-8 grid grid-cols-1 gap-3">
                        {BRAND_BENEFITS.map(({ icon: Icon, emoji, title, sub, bg, border, iconBg, iconColor }) => (
                            <div
                                key={title}
                                className={`flex items-start gap-3.5 rounded-2xl border ${border} ${bg} p-4 transition-all hover:shadow-md hover:shadow-orange-100/60`}
                            >
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} border ${border}`}>
                                    <Icon size={18} className={iconColor} strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-stone-900">{title}</p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social proof row */}
                    <div className="mt-8 flex items-center gap-4 rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
                        <div className="flex -space-x-2.5">
                            {TESTIMONIALS.map(({ avatar, grad }) => (
                                <div
                                    key={avatar}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${grad} text-xs font-black text-white shadow-sm`}
                                >
                                    {avatar}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map((i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                                </div>
                                <span className="text-xs font-black text-stone-700">4.9 / 5</span>
                            </div>
                            <p className="mt-0.5 text-xs text-stone-500">
                                Loved by <span className="font-black text-orange-600">2,450+</span> customers in Sikar & Danta
                            </p>
                        </div>
                    </div>

                    {/* Mini testimonials */}
                    <div className="mt-4 grid grid-cols-1 gap-2">
                        {TESTIMONIALS.map(({ name, text, avatar, grad }) => (
                            <div key={name} className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white px-3.5 py-2.5 shadow-sm">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${grad} text-[11px] font-black text-white`}>
                                    {avatar}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-stone-800">"{text}"</p>
                                    <p className="text-[10px] text-stone-400">— {name}</p>
                                </div>
                                <div className="ml-auto flex gap-0.5">
                                    {[1,2,3,4,5].map((i) => <Star key={i} size={9} className="fill-amber-400 text-amber-400" />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════════
                    RIGHT COLUMN — auth card
                ════════════════════════════════════════════════════════════ */}
                <div className="flex w-full flex-col items-center justify-center">

                    {/* Mobile only: back link */}
                    <Link
                        href="/"
                        className="group mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-stone-500 transition-colors hover:text-orange-600 md:hidden"
                    >
                        <ArrowLeft size={13} />
                        Back to Sunrise
                    </Link>

                    <AuthTabs redirectTo={redirectTo} />

                    {/* Contact help */}
                    <p className="mt-5 text-center text-[11px] text-stone-400">
                        Need help?{" "}
                        <a href="tel:7878583600" className="font-bold text-orange-500 hover:underline">
                            Call us: 7878583600
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}