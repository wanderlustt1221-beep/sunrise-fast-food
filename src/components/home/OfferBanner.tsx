// src/components/home/OfferBanner.tsx
// "Our Food Promise" section — light warm premium theme.
// Communicates trust, freshness, quality and speed for Sunrise Fast Food.

import Link from "next/link";
import { ArrowRight, Flame, Leaf, Zap, Heart, Clock, Award } from "lucide-react";

const promises = [
    {
        icon: Flame,
        emoji: "🔥",
        title: "Made Fresh Every Time",
        description:
            "Every order is prepared fresh when you place it. No pre-made sitting around — just hot, made-to-order food.",
        bg: "bg-orange-50",
        border: "border-orange-200",
        iconBg: "bg-orange-500",
        highlight: "Zero reheating",
    },
    {
        icon: Leaf,
        emoji: "🌿",
        title: "Quality Ingredients Only",
        description:
            "We source fresh ingredients daily. From crisp veggies to quality proteins — nothing but the best goes into your food.",
        bg: "bg-green-50",
        border: "border-green-200",
        iconBg: "bg-green-600",
        highlight: "Farm fresh daily",
    },
    {
        icon: Zap,
        emoji: "⚡",
        title: "Delivered in 25 Minutes",
        description:
            "From order to doorstep in under 25 minutes. Fast without cutting corners — hot food that actually arrives hot.",
        bg: "bg-amber-50",
        border: "border-amber-200",
        iconBg: "bg-amber-500",
        highlight: "25 min avg.",
    },
    {
        icon: Heart,
        emoji: "❤️",
        title: "Made With Real Care",
        description:
            "This is our family kitchen. Every dish is prepared with the same care we'd give our own family. You'll taste the difference.",
        bg: "bg-red-50",
        border: "border-red-100",
        iconBg: "bg-red-500",
        highlight: "Family recipe",
    },
    {
        icon: Clock,
        emoji: "🕙",
        title: "Open Until 11 PM",
        description:
            "Late night cravings? We're open. Whether it's 2 PM or 10 PM, fresh food is just an order away.",
        bg: "bg-blue-50",
        border: "border-blue-100",
        iconBg: "bg-blue-500",
        highlight: "Late hours",
    },
    {
        icon: Award,
        emoji: "🏆",
        title: "4.9★ Customer Love",
        description:
            "2,400+ happy customers and counting. Our reviews speak for themselves — taste it once and you'll be back.",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        iconBg: "bg-yellow-500",
        highlight: "Top rated",
    },
];

export default function OfferBanner() {
    return (
        <section className="bg-[#FFFBF5] py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">

                {/* Section header */}
                <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
                            <Leaf size={12} className="text-green-600" />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-green-700">
                                Our Promise
                            </span>
                        </div>
                        <h2 className="text-3xl font-black leading-tight tracking-tight text-stone-900 md:text-4xl">
                            Why people{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(135deg, #ea580c, #d97706)" }}
                            >
                                keep coming back
                            </span>
                        </h2>
                        <p className="mt-3 text-stone-500 leading-relaxed">
                            Fresh ingredients, real care, and fast delivery — every single time.
                        </p>
                    </div>
                    <Link
                        href="/reviews"
                        className="group hidden shrink-0 items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-bold text-amber-700 shadow-sm transition-all hover:border-orange-300 hover:bg-amber-50 md:inline-flex"
                    >
                        Read Reviews
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Promise cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {promises.map((p) => {
                        const Icon = p.icon;
                        return (
                            <div
                                key={p.title}
                                className={`group flex flex-col rounded-3xl border ${p.border} ${p.bg} p-6 transition-all duration-200 hover:shadow-lg hover:shadow-orange-100/60`}
                            >
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${p.iconBg} shadow-md`}>
                                    <Icon size={20} className="text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-base font-black text-stone-900">{p.title}</h3>
                                <p className="mt-2 flex-1 text-sm leading-7 text-stone-500">{p.description}</p>

                                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1">
                                    <span className="text-base">{p.emoji}</span>
                                    <span className="text-[11px] font-bold text-stone-600">{p.highlight}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom nudge */}
                <div className="mt-10 flex flex-col items-center gap-4 text-center">
                    <p className="text-sm text-stone-500">
                        Taste the Sunrise difference yourself —
                    </p>
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all hover:brightness-110 hover:shadow-orange-300 active:scale-95"
                    >
                        Explore Our Menu
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </section>
    );
}