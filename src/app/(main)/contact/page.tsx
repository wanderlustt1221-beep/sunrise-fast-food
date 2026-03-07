// src/app/(main)/contact/page.tsx
// Premium light warm food-brand contact page — Sunrise Fast Food & Juice and Ice-Cream Corner.
// Zero dark surfaces. Mobile-first. Brand-aligned throughout.

import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import {
    MapPin, Phone, Clock3, MessageCircle, ArrowRight,
    Navigation, Flame, Zap, ShieldCheck, Star,
} from "lucide-react";

const MAP_LINK        = "https://maps.app.goo.gl/Y5DEiuP4qJcHKfWAA";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917878583600";
const PHONE_1         = "7878583600";
const PHONE_2         = "9950703030";

// ─── Contact info cards data ──────────────────────────────────────────────
const CONTACT_CARDS = [
    {
        icon:     MapPin,
        emoji:    "📍",
        title:    "Visit Us",
        body:     "Ramgarh Bas Stand Circle, Danta, Sikar, Rajasthan. Come in for fresh fast food, cold juices, and creamy ice cream.",
        cta:      "Get Directions",
        href:     MAP_LINK,
        external: true,
        accent:   "text-orange-600",
        iconBg:   "bg-orange-100",
        iconColor:"text-orange-600",
        border:   "border-orange-200",
        hover:    "hover:border-orange-300",
    },
    {
        icon:     Phone,
        emoji:    "📞",
        title:    "Call Us",
        body:     `Reach us directly for orders, delivery queries, or anything you need. We pick up fast!\n${PHONE_1}\n${PHONE_2}`,
        cta:      `Call ${PHONE_1}`,
        href:     `tel:${PHONE_1}`,
        external: false,
        accent:   "text-amber-600",
        iconBg:   "bg-amber-100",
        iconColor:"text-amber-600",
        border:   "border-amber-200",
        hover:    "hover:border-amber-300",
    },
    {
        icon:     Clock3,
        emoji:    "🕙",
        title:    "Opening Hours",
        body:     "We're open every single day of the week — no holidays, no breaks. Come hungry anytime!",
        cta:      null,
        href:     null,
        external: false,
        accent:   "text-green-600",
        iconBg:   "bg-green-100",
        iconColor:"text-green-600",
        border:   "border-green-200",
        hover:    "hover:border-green-200",
        hours:    true,
    },
    {
        icon:     MessageCircle,
        emoji:    "💬",
        title:    "WhatsApp Support",
        body:     "The fastest way to reach us. Order, ask about the menu, or get delivery help — we respond within minutes.",
        cta:      "Chat on WhatsApp",
        href:     `https://wa.me/${WHATSAPP_NUMBER}`,
        external: true,
        accent:   "text-[#25D366]",
        iconBg:   "bg-green-100",
        iconColor:"text-[#25D366]",
        border:   "border-green-200",
        hover:    "hover:border-green-300",
    },
];

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#FFFBF5]">

                {/* ── Hero / Page header ─────────────────────────────────── */}
                <div className="relative overflow-hidden border-b border-amber-100 bg-white">
                    {/* Warm radial glow */}
                    <div
                        className="pointer-events-none absolute -top-20 left-1/2 h-56 w-2/3 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
                        style={{ background: "radial-gradient(ellipse, #fed7aa, transparent 70%)" }}
                        aria-hidden="true"
                    />
                    {/* Subtle dot grid */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage: "radial-gradient(circle, #92400e 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
                        {/* Eyebrow */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.7)]" />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-600">
                                Contact Us
                            </span>
                        </div>

                        <h1 className="max-w-3xl text-4xl font-black leading-tight text-stone-900 md:text-5xl lg:text-6xl">
                            We're always{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(135deg, #ea580c, #d97706)" }}
                            >
                                here for you .
                            </span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-500 md:text-lg">
                            Fresh food, warm vibes, and quick service — reach us for orders, directions,
                            or anything cafe-related. We love hearing from our customers.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-black text-white shadow-lg shadow-green-200 transition-all hover:brightness-110 active:scale-95"
                            >
                                <MessageCircle size={16} strokeWidth={2.5} />
                                Order on WhatsApp
                            </Link>

                            <a
                                href={`tel:${PHONE_1}`}
                                className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-amber-50 px-6 py-3 text-sm font-black text-amber-800 transition-all hover:border-amber-400 hover:bg-amber-100 active:scale-95"
                            >
                                <Phone size={15} strokeWidth={2.5} />
                                Call Now
                            </a>

                            <Link
                                href={MAP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-orange-200 bg-white px-6 py-3 text-sm font-black text-orange-700 transition-all hover:border-orange-300 hover:bg-orange-50 active:scale-95"
                            >
                                <Navigation size={15} strokeWidth={2.5} />
                                Open in Maps
                            </Link>
                        </div>

                        {/* Trust chips */}
                        <div className="mt-7 flex flex-wrap items-center gap-5">
                            {[
                                { icon: Flame,       text: "Made Fresh Daily"     },
                                { icon: Zap,         text: "25 Min Delivery"      },
                                { icon: ShieldCheck, text: "Trusted by 2,450+"    },
                                { icon: Star,        text: "4.9★ Rated"           },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-1.5 text-[12px] font-bold text-stone-400">
                                    <Icon size={12} className="text-amber-500" strokeWidth={2.5} />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Contact cards + Map ────────────────────────────────── */}
                <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
                    <div className="grid gap-6 lg:grid-cols-[1fr_480px]">

                        {/* Left: 2x2 cards grid */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            {CONTACT_CARDS.map(({ icon: Icon, emoji, title, body, cta, href, external, iconBg, iconColor, border, hover, hours, accent }) => (
                                <div
                                    key={title}
                                    className={`group flex flex-col rounded-3xl border-2 ${border} ${hover} bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-orange-100/50`}
                                >
                                    {/* Icon badge */}
                                    <div className={`mb-4 inline-flex h-13 w-13 items-center justify-center rounded-2xl ${iconBg} p-3`}>
                                        <Icon size={22} className={iconColor} strokeWidth={2} />
                                    </div>

                                    <h2 className="text-lg font-black text-stone-900">{title}</h2>

                                    {hours ? (
                                        <div className="mt-3 space-y-2.5">
                                            <div className="flex items-center justify-between rounded-2xl border border-green-100 bg-green-50 px-4 py-2.5">
                                                <span className="text-sm font-semibold text-stone-600">Mon – Sun</span>
                                                <span className="text-sm font-black text-green-700">10:00 AM – 11:00 PM</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50 px-4 py-2.5">
                                                <span className="text-sm font-semibold text-stone-600">Online Orders</span>
                                                <span className="text-sm font-black text-amber-700">Available Daily</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500 whitespace-pre-line">
                                            {body}
                                        </p>
                                    )}

                                    {cta && href && (
                                        <Link
                                            href={href}
                                            target={external ? "_blank" : undefined}
                                            rel={external ? "noopener noreferrer" : undefined}
                                            className={`mt-5 inline-flex items-center gap-1.5 text-sm font-black ${accent} transition-all hover:gap-2.5`}
                                        >
                                            {cta}
                                            <ArrowRight size={14} strokeWidth={2.5} />
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right: Map card */}
                        <div className="overflow-hidden rounded-3xl border-2 border-amber-200 bg-white shadow-sm">

                            {/* Map header */}
                            <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5">
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange-600 shadow-sm">
                                    <Navigation size={11} strokeWidth={2.5} />
                                    Live Map
                                </div>
                                <h3 className="text-xl font-black text-stone-900">Find Us Easily 🗺️</h3>
                                <p className="mt-1 text-sm text-stone-500">
                                    Ramgarh Bas Stand Circle, Danta, Sikar — tap to open in Maps.
                                </p>
                            </div>

                            {/* Embedded map */}
                            <div className="h-[280px] w-full md:h-[360px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.6644903203102!2d75.17707504587761!3d27.26207348965363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c8f003bb2017f%3A0x2c8717f3bf912831!2sRamgardh%20bas%20stand%20circle!5e0!3m2!1sen!2sin!4v1772790882554!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Sunrise Fast Food location map"
                                    className="h-full w-full"
                                />
                            </div>

                            {/* Location summary footer */}
                            <div className="border-t border-amber-100 bg-white p-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                                        <MapPin size={18} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-stone-900">Sunrise Fast Food</p>
                                        <p className="mt-0.5 text-sm leading-relaxed text-stone-500">
                                            Ramgarh Bas Stand Circle<br />
                                            Danta, Sikar, Rajasthan
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <Link
                                        href={MAP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-orange-200 transition-all hover:brightness-110 active:scale-95"
                                    >
                                        <Navigation size={14} />
                                        Open in Google Maps
                                    </Link>

                                    <Link
                                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border-2 border-green-300 bg-green-50 px-5 py-2.5 text-sm font-black text-green-800 transition-all hover:bg-green-100 active:scale-95"
                                    >
                                        <MessageCircle size={14} />
                                        Ask on WhatsApp
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Two phone numbers highlight ───────────────────────── */}
                <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { label: "Primary",   number: PHONE_1, emoji: "📱" },
                            { label: "Secondary", number: PHONE_2, emoji: "☎️" },
                        ].map(({ label, number, emoji }) => (
                            <a
                                key={number}
                                href={`tel:${number}`}
                                className="group flex items-center gap-4 rounded-3xl border-2 border-amber-200 bg-white p-5 shadow-sm transition-all hover:border-orange-300 hover:shadow-md hover:shadow-orange-100/50"
                            >
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-2xl shadow-sm">
                                    {emoji}
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-500">{label} Number</p>
                                    <p className="text-xl font-black text-stone-900 tabular-nums">
                                        {number.replace(/(\d{5})(\d{5})/, "$1 $2")}
                                    </p>
                                    <p className="text-[11px] text-stone-400">Tap to call</p>
                                </div>
                                <ArrowRight size={18} className="ml-auto text-stone-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500" />
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── Bottom CTA ─────────────────────────────────────────── */}
                <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-20">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-8 shadow-xl shadow-orange-200/60 md:p-10">
                        {/* Dot texture */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.07]"
                            style={{
                                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                            }}
                            aria-hidden="true"
                        />
                        {/* Glow blobs */}
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" aria-hidden="true" />
                        <div className="pointer-events-none absolute -bottom-10 left-1/4 h-32 w-32 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />

                        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/70 mb-1">
                                    Need quick help? 🙋
                                </p>
                                <h2 className="text-2xl font-black text-white md:text-3xl lg:text-4xl">
                                    Order faster via WhatsApp
                                </h2>
                                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
                                    Whether it's delivery, menu questions, or directions — the fastest way to reach us is WhatsApp. We reply in minutes.
                                </p>
                                {/* Mini trust chips on CTA */}
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {["🛵 25 Min Delivery", "🔥 Made Fresh", "⭐ 4.9 Rated"].map((chip) => (
                                        <span key={chip} className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex shrink-0 flex-wrap gap-3">
                                <Link
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-orange-600 shadow-lg shadow-orange-700/20 transition-all hover:bg-orange-50 active:scale-95"
                                >
                                    <MessageCircle size={16} strokeWidth={2.5} />
                                    Chat Now
                                </Link>
                                <Link
                                    href="/menu"
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-3.5 text-sm font-black text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60 active:scale-95"
                                >
                                    Explore Menu
                                    <ArrowRight size={15} strokeWidth={2.5} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}