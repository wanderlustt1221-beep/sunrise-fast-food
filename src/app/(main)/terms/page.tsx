// src/app/(main)/terms/page.tsx
// Premium branded Terms & Conditions — Sunrise Fast Food & Juice and Ice-Cream Corner.
// Light warm food-brand visual language. Not a boring legal dump.

import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ShieldCheck, ArrowRight, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917878583600";
const PHONE_1         = "7878583600";
const LAST_UPDATED    = "January 2025";

// ─── Terms sections data ──────────────────────────────────────────────────
const SECTIONS = [
    {
        id:    "introduction",
        emoji: "👋",
        title: "Introduction",
        body:  `Welcome to Sunrise Fast Food & Juice and Ice-Cream Corner ("Sunrise", "we", "us", or "our"). These Terms & Conditions govern your use of our website and ordering services. By placing an order or browsing our site, you agree to these terms. Please read them carefully — they're written in plain language, not legalese.`,
    },
    {
        id:    "acceptance",
        emoji: "✅",
        title: "Acceptance of Terms",
        body:  `By accessing our website, placing an order, or contacting us for service, you confirm that you are at least 13 years old and agree to be bound by these Terms. If you do not agree, please do not use our website or services. Continued use of our site constitutes your acceptance of any updates to these terms.`,
    },
    {
        id:    "use-of-website",
        emoji: "🖥️",
        title: "Use of Website",
        body:  `Our website is designed to help you browse our menu, place orders, leave reviews, and contact us. You agree to use it only for lawful purposes. You must not misuse our site by attempting to gain unauthorized access, uploading harmful content, or using it in a way that could damage, disable, or impair its functionality. We reserve the right to restrict access if misuse is detected.`,
    },
    {
        id:    "menu-pricing",
        emoji: "🍕",
        title: "Menu, Pricing & Availability",
        body:  `Prices shown on our menu are in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. Menu items and prices may change without prior notice. We strive to keep our online menu updated, but availability of certain items may vary based on stock, season, or preparation time. Images on the menu are for illustration purposes and may differ slightly from the actual serving.`,
    },
    {
        id:    "orders",
        emoji: "📦",
        title: "Order Acceptance & Cancellation",
        body:  `Placing an order through our website constitutes an offer to purchase. Your order is confirmed only after we accept it and you receive a confirmation (typically via WhatsApp). We reserve the right to decline an order if an item is unavailable, if incorrect information is provided, or for any other reasonable reason. If you need to cancel an order, please contact us immediately on WhatsApp or phone. Once food preparation has begun, cancellation may not be possible.`,
    },
    {
        id:    "delivery",
        emoji: "🛵",
        title: "Delivery & Pickup Terms",
        body:  `Delivery is available within our service area around Danta, Sikar, Rajasthan. Estimated delivery times are provided as a guideline (typically 20–30 minutes) and may vary depending on order volume, weather, and traffic. We are not liable for delays outside our reasonable control. For pickup orders, please arrive after receiving your confirmation. Ensure your delivery address is accurate — we cannot be responsible for failed deliveries due to incorrect or incomplete address information.`,
    },
    {
        id:    "payments",
        emoji: "💳",
        title: "Payments & Charges",
        body:  `We currently accept cash on delivery for most orders. Online or advance payment options, where available, will be clearly indicated. A delivery fee may apply to orders below a certain minimum value (currently ₹499). A small platform fee may be added at checkout. All prices and fees are subject to change and will be displayed clearly before you confirm your order.`,
    },
    {
        id:    "whatsapp",
        emoji: "💬",
        title: "WhatsApp & Communication",
        body:  `We use WhatsApp as our primary order confirmation and customer support channel. By placing an order and providing your phone number, you consent to receiving order-related messages on WhatsApp. We will only contact you for order updates, delivery coordination, and support. We do not use your number for unsolicited promotional spam. You may opt out of promotional messages at any time by letting us know.`,
    },
    {
        id:    "responsibilities",
        emoji: "🤝",
        title: "User Responsibilities",
        body:  `When using our service, you agree to provide accurate contact and delivery information, be available on the provided phone number at the time of delivery, treat our delivery staff respectfully, and not misuse our review or feedback system by posting false or malicious content. You are responsible for any orders placed using your account or phone number.`,
    },
    {
        id:    "ip",
        emoji: "©️",
        title: "Intellectual Property",
        body:  `All content on this website — including our logo, brand name, images, menu design, and written content — is the property of Sunrise Fast Food & Juice and Ice-Cream Corner. You may not copy, reproduce, distribute, or use our brand assets or content without prior written permission. Our brand name and identity are protected under applicable intellectual property laws.`,
    },
    {
        id:    "liability",
        emoji: "⚖️",
        title: "Limitation of Liability",
        body:  `While we take every effort to ensure quality and timely service, Sunrise Fast Food is not liable for indirect, incidental, or consequential damages arising from use of our services. Our maximum liability in any matter is limited to the value of the order in question. Food allergies: please inform us of any allergies when placing your order. We take reasonable precautions but cannot guarantee a completely allergen-free environment.`,
    },
    {
        id:    "changes",
        emoji: "🔄",
        title: "Changes to These Terms",
        body:  `We may update these Terms & Conditions from time to time to reflect changes in our services, legal requirements, or business practices. When we make significant changes, we will update the "Last Updated" date on this page. Your continued use of the website after any changes constitutes your acceptance of the revised terms. We encourage you to review this page periodically.`,
    },
    {
        id:    "contact",
        emoji: "📞",
        title: "Contact Information",
        body:  `If you have any questions about these Terms, please contact us:\n\nSunrise Fast Food & Juice and Ice-Cream Corner\nRamgarh Bas Stand Circle, Danta, Sikar, Rajasthan\nPhone: 7878583600 / 9950703030\nWhatsApp: 7878583600\n\nWe're happy to help and will respond as quickly as possible.`,
    },
];

export default function TermsPage() {
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
                            <ShieldCheck size={13} className="text-amber-600" strokeWidth={2.5} />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
                                Legal
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-stone-900 md:text-5xl">
                            Terms & Conditions
                        </h1>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-500">
                            Simple, clear, and honest — these terms govern how our website and ordering service works. Last updated: <span className="font-bold text-stone-700">{LAST_UPDATED}</span>.
                        </p>
                        {/* Brand note */}
                        <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2.5">
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
                                    Questions about these terms?
                                </h3>
                                <p className="mt-1.5 text-sm text-white/85">
                                    We're happy to explain anything. Just reach out — we're a real local team.
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