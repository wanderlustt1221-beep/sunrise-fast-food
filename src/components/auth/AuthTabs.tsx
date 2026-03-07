"use client";

// src/components/auth/AuthTabs.tsx
// Full light warm premium food-brand auth shell.
// Zero dark surfaces. FOMO-driven. Emotionally engaging on mobile.

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Star, Flame, Zap, Gift, Shield } from "lucide-react";

type Tab = "login" | "register";
type AuthTabsProps = { redirectTo?: string };

const PERKS = [
    { icon: "⚡", text: "Faster checkout every time" },
    { icon: "🎁", text: "Exclusive member-only deals" },
    { icon: "📦", text: "Order history & 1-tap reorder" },
    { icon: "🎂", text: "Birthday surprise gift from us" },
];

export default function AuthTabs({ redirectTo = "/" }: AuthTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>("login");

    return (
        <div className="w-full max-w-md">

            {/* ── Floating FOMO nudge ── */}
            <div className="mb-3 flex items-center gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-sm">
                    <Gift size={14} className="text-white" strokeWidth={2.5} />
                </div>
                <p className="text-[11px] font-bold text-stone-700 leading-snug">
                    <span className="text-orange-600 font-black">2,450+ customers</span> already ordering smarter —{" "}
                    <span className="text-stone-500">join free today!</span>
                </p>
            </div>

            {/* ── Main auth card ── */}
            <div className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-xl shadow-orange-100/60">

                {/* ── Gradient brand header ── */}
                <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 px-6 pb-5 pt-6">
                    {/* Dot texture overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "14px 14px",
                        }}
                    />
                    {/* Soft glow orb */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-xl" />
                    <div className="pointer-events-none absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-white/10 blur-lg" />

                    {/* Decorative food emojis */}
                    <div className="pointer-events-none absolute right-4 top-3 flex gap-1.5 opacity-25 text-2xl select-none">
                        <span style={{ animation: "authBob 2.4s ease-in-out infinite alternate" }}>🍔</span>
                        <span style={{ animation: "authBob 3.1s ease-in-out infinite alternate" }}>🥤</span>
                        <span style={{ animation: "authBob 2.7s ease-in-out infinite alternate" }}>🍕</span>
                    </div>

                    <div className="relative z-10">
                        {/* Brand row */}
                        <div className="mb-3 flex items-center gap-2.5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-xl backdrop-blur-sm">
                                🌅
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/70">Sunrise</p>
                                <p className="text-[13px] font-black leading-tight text-white">Fast Food & Juice Corner</p>
                            </div>
                        </div>
                        {/* Dynamic headline */}
                        <h2 className="text-[1.35rem] font-black leading-tight text-white">
                            {activeTab === "login"
                                ? "Welcome back, foodie! 👋"
                                : "Join the food family! 🍕"}
                        </h2>
                        <p className="mt-0.5 text-[12px] text-white/80 font-medium">
                            {activeTab === "login"
                                ? "Your cart, deals & saved address are waiting"
                                : "Free to join. Deals & perks from day one."}
                        </p>
                    </div>
                </div>

                {/* ── Tab switcher ── */}
                <div className="relative flex border-b border-amber-100 bg-amber-50/60 p-1.5 gap-1">
                    {/* Animated sliding pill */}
                    <div
                        className="absolute bottom-1.5 top-1.5 rounded-xl bg-white shadow-md border border-amber-200/70 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                            width: "calc(50% - 8px)",
                            left: activeTab === "login" ? "6px" : "calc(50% + 2px)",
                        }}
                        aria-hidden="true"
                    />
                    {(["login", "register"] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            aria-selected={activeTab === tab}
                            role="tab"
                            className={`relative z-10 flex-1 rounded-xl py-2.5 text-[13px] font-black transition-colors duration-200 ${
                                activeTab === tab
                                    ? "text-orange-600"
                                    : "text-stone-400 hover:text-stone-600"
                            }`}
                        >
                            {tab === "login" ? "Sign In" : "Create Account"}
                        </button>
                    ))}
                </div>

                {/* ── Social proof / FOMO insert (context-aware) ── */}
                <div className="px-6 pt-5">
                    {activeTab === "login" ? (
                        /* Login: star rating strip */
                        <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-3.5 py-3">
                            <div className="flex gap-0.5">
                                {[1,2,3,4,5].map((i) => (
                                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-black text-stone-800">
                                    Rated <span className="text-orange-600">4.9/5</span> by 2,450+ real customers
                                </p>
                                <p className="text-[10px] text-stone-400">Sikar & Danta's most loved food spot</p>
                            </div>
                            <div className="flex -space-x-1.5 shrink-0">
                                {[
                                    "from-amber-400 to-orange-500",
                                    "from-orange-400 to-red-500",
                                    "from-yellow-400 to-amber-500",
                                ].map((g, i) => (
                                    <div
                                        key={i}
                                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${g} text-[9px] font-black text-white shadow-sm`}
                                    >
                                        {["P","R","A"][i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Register: 2x2 perks grid */
                        <div className="grid grid-cols-2 gap-2">
                            {PERKS.map((p) => (
                                <div
                                    key={p.text}
                                    className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-2.5 py-2.5"
                                >
                                    <span className="text-base shrink-0">{p.icon}</span>
                                    <span className="text-[10px] font-bold leading-tight text-stone-600">{p.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Form ── */}
                <div className="px-6 pb-6 pt-5">
                    {activeTab === "login" ? (
                        <LoginForm redirectTo={redirectTo} />
                    ) : (
                        <RegisterForm onSuccess={() => setActiveTab("login")} />
                    )}
                </div>

                {/* ── Trust footer ── */}
                <div className="flex items-center justify-center gap-5 border-t border-amber-100 bg-amber-50/50 px-6 py-3">
                    {[
                        { icon: Flame,   text: "Fresh Daily"    },
                        { icon: Zap,     text: "Fast Delivery"  },
                        { icon: Shield,  text: "Safe & Secure"  },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-1 text-[10px] font-bold text-stone-400">
                            <Icon size={10} className="text-amber-500" strokeWidth={2.5} />
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Terms ── */}
            <p className="mt-4 text-center text-[11px] text-stone-400">
                By continuing, you agree to our{" "}
                <a href="/terms" className="font-bold text-stone-500 underline underline-offset-2 hover:text-orange-600 transition-colors">Terms</a>
                {" "}&{" "}
                <a href="/privacy" className="font-bold text-stone-500 underline underline-offset-2 hover:text-orange-600 transition-colors">Privacy Policy</a>
            </p>

            <style jsx global>{`
                @keyframes authBob {
                    from { transform: translateY(0px) rotate(-4deg); }
                    to   { transform: translateY(-7px) rotate(4deg); }
                }
            `}</style>
        </div>
    );
}