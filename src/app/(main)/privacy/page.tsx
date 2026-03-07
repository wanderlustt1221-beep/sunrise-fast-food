// src/app/(main)/privacy/page.tsx
// Premium branded Privacy Policy — Sunrise Fast Food & Juice and Ice-Cream Corner.
// Light warm food-brand visual language. Clear, honest, not corporate.

import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Lock, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917878583600";
const PHONE_1         = "7878583600";
const LAST_UPDATED    = "January 2025";

// ─── Privacy sections data ────────────────────────────────────────────────
const SECTIONS = [
    {
        id:    "introduction",
        emoji: "👋",
        title: "Introduction",
        body:  `Sunrise Fast Food & Juice and Ice-Cream Corner ("Sunrise", "we", "us") respects your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights around that data.\n\nWe are a small local food business based in Danta, Sikar, Rajasthan. We collect only what we need to serve you well — nothing more. We don't sell your data to anyone.`,
    },
    {
        id:    "information-we-collect",
        emoji: "📋",
        title: "Information We Collect",
        body:  `When you use our website or place an order, we may collect:\n\n• Your name, phone number, and delivery address when you place an order\n• Your WhatsApp number when you contact or confirm orders via WhatsApp\n• Reviews or feedback you voluntarily submit on our website\n• Basic website usage data (pages visited, browser type) if analytics are enabled\n\nWe do not collect payment card details. We do not require government IDs. We keep data collection minimal and purposeful.`,
    },
    {
        id:    "how-we-use",
        emoji: "🔧",
        title: "How We Use Your Information",
        body:  `The information you provide is used solely to:\n\n• Process and fulfill your food orders\n• Coordinate delivery to your address\n• Confirm orders and provide updates via WhatsApp or phone\n• Respond to your support queries or complaints\n• Improve our menu and service based on honest feedback\n\nWe do not use your information for advertising networks, data brokers, or any third-party marketing purposes.`,
    },
    {
        id:    "order-contact",
        emoji: "📦",
        title: "Order & Contact Information",
        body:  `When you complete checkout, your name, phone number, and delivery address are used to fulfill your order and coordinate delivery. This information may be shared with our delivery team solely for the purpose of completing your delivery. Order records may be retained for a reasonable period for customer service purposes.\n\nIf you call us directly, your phone number may be visible to us and stored in our records for follow-up or support purposes.`,
    },
    {
        id:    "whatsapp",
        emoji: "💬",
        title: "WhatsApp & Phone Communication",
        body:  `We use WhatsApp as our primary communication channel for order confirmations, delivery updates, and support. By providing your phone number and placing an order, you consent to receiving order-related messages from us.\n\nWe will not add you to promotional broadcast lists without your explicit permission. If you receive a message from us that you did not expect, please let us know and we will remove you from any list immediately.\n\nOur WhatsApp communications are conducted by our team and are not automated spam.`,
    },
    {
        id:    "cookies",
        emoji: "🍪",
        title: "Cookies & Analytics",
        body:  `Our website may use basic cookies to remember your preferences, keep you logged in, and improve your browsing experience. We may use simple, privacy-respecting analytics tools to understand how visitors use our site (e.g., which pages are most visited). This data is anonymous and not linked to any personal identity.\n\nYou can choose to disable cookies in your browser settings. Some features of the website (like staying logged in) may not work if cookies are disabled.`,
    },
    {
        id:    "data-sharing",
        emoji: "🔗",
        title: "Data Sharing & Third Parties",
        body:  `We do not sell, rent, or trade your personal data to any third parties.\n\nWe may share minimal necessary information with:\n• Our delivery partners (name, phone, address) solely to complete your delivery\n• Our website hosting and technical service providers, who are bound to keep data secure\n\nWe do not share your data with advertisers, data brokers, or marketing platforms. We do not use your data for any commercial purpose beyond fulfilling your order and providing support.`,
    },
    {
        id:    "data-security",
        emoji: "🔒",
        title: "Data Security",
        body:  `We take reasonable steps to protect your personal information from unauthorized access, misuse, or disclosure. Our website uses standard security practices including HTTPS encryption.\n\nHowever, no internet transmission or digital storage is 100% secure. While we do our best, we cannot guarantee absolute security of data transmitted over the internet. Please do not share sensitive personal information beyond what is needed for your order.`,
    },
    {
        id:    "your-choices",
        emoji: "⚙️",
        title: "Your Choices & Rights",
        body:  `You have the right to:\n\n• Request access to the personal information we hold about you\n• Request correction of inaccurate information\n• Request deletion of your data (where we are not legally required to retain it)\n• Opt out of any promotional communications from us\n\nTo exercise any of these rights, simply contact us on WhatsApp or phone. We will respond within a reasonable time frame and do our best to help you.`,
    },
    {
        id:    "changes",
        emoji: "🔄",
        title: "Changes to This Privacy Policy",
        body:  `We may update this Privacy Policy from time to time as our services or legal requirements change. When we do, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically.\n\nYour continued use of our website after any changes to this policy means you accept those changes.`,
    },
    {
        id:    "contact",
        emoji: "📞",
        title: "Contact Us",
        body:  `For any privacy-related questions, data requests, or concerns, please contact us:\n\nSunrise Fast Food & Juice and Ice-Cream Corner\nRamgarh Bas Stand Circle, Danta, Sikar, Rajasthan\nPhone: 7878583600 / 9950703030\nWhatsApp: 7878583600\n\nWe are a small local business and genuinely care about your trust. We will always respond with honesty and transparency.`,
    },
];

export default function PrivacyPage() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#FFFBF5]">

                {/* ── Page header ─────────────────────────────────────────── */}
                <div className="relative overflow-hidden border-b border-amber-100 bg-white">
                    <div
                        className="pointer-events-none absolute -top-16 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                        style={{ background: "radial-gradient(ellipse, #fed7aa, transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <div className="relative mx-auto max-w-4xl px-4 pb-10 pt-12 md:px-8 md:pb-12 md:pt-16">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5">
                            <Lock size={13} className="text-amber-600" strokeWidth={2.5} />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
                                Privacy
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-stone-900 md:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-500">
                            We believe in being upfront about how we handle your data. This policy is written in clear, plain language — not corporate legalese. Last updated: <span className="font-bold text-stone-700">{LAST_UPDATED}</span>.
                        </p>
                        {/* Commitment chip */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            {[
                                { emoji: "🔒", text: "We never sell your data" },
                                { emoji: "📵", text: "No spam, ever"          },
                                { emoji: "💛", text: "Minimal data collection" },
                            ].map(({ emoji, text }) => (
                                <div key={text} className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-[12px] font-bold text-green-800">
                                    <span>{emoji}</span>
                                    {text}
                                </div>
                            ))}
                        </div>
                        {/* Brand note */}
                        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2.5">
                            <span className="text-lg">🌅</span>
                            <p className="text-[12px] font-bold text-orange-700">
                                Sunrise Fast Food & Juice and Ice-Cream Corner, Danta, Sikar, Rajasthan
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Table of contents ─────────────────────────────────── */}
                <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
                    <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
                        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-orange-500">
                            Sections
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {SECTIONS.map((s, i) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="flex items-center gap-2.5 rounded-xl border border-amber-100 bg-amber-50/60 px-3.5 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-black text-orange-700">
                                        {i + 1}
                                    </span>
                                    <span className="text-base mr-1">{s.emoji}</span>
                                    {s.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Sections ──────────────────────────────────────────── */}
                <div className="mx-auto max-w-4xl space-y-5 px-4 pb-10 md:px-8">
                    {SECTIONS.map((s, i) => (
                        <div
                            key={s.id}
                            id={s.id}
                            className="scroll-mt-24 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm"
                        >
                            {/* Section header */}
                            <div className="flex items-center gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[11px] font-black text-orange-700">
                                    {i + 1}
                                </div>
                                <span className="text-xl">{s.emoji}</span>
                                <h2 className="text-base font-black text-stone-900">{s.title}</h2>
                            </div>
                            {/* Content */}
                            <div className="px-6 py-5">
                                <p className="text-sm leading-7 text-stone-600 whitespace-pre-line">
                                    {s.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom CTA ──────────────────────────────────────────── */}
                <div className="mx-auto max-w-4xl px-4 pb-14 md:px-8 md:pb-20">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-7 shadow-lg shadow-orange-200/50 md:p-9">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.07]"
                            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                            aria-hidden="true"
                        />
                        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-white md:text-2xl">
                                    Privacy questions? We're human. 🙋
                                </h3>
                                <p className="mt-1.5 text-sm text-white/85">
                                    We're a real local team — reach out any time and we'll answer honestly.
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-3">
                                <Link
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-orange-600 shadow-md transition-all hover:bg-orange-50 active:scale-95"
                                >
                                    <MessageCircle size={15} />
                                    WhatsApp Us
                                </Link>
                                <a
                                    href={`tel:${PHONE_1}`}
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/15 px-6 py-3 text-sm font-black text-white transition-all hover:bg-white/25 active:scale-95"
                                >
                                    <Phone size={15} />
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </>
    );
}