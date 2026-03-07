import Link from "next/link";
import {
    UtensilsCrossed,
    MapPin,
    Phone,
    Mail,
    Clock,
    Sunrise,
    Instagram,
    Twitter,
    Facebook,
    IceCream,
    Grape,
    ChevronRight,
    MessageCircle,
    Star,
} from "lucide-react";

const quickLinks = [
    { href: "/menu", label: "Our Menu" },
    { href: "/my-orders", label: "My Orders" },
    { href: "/reviews", label: "Customer Reviews" },
    { href: "/contact", label: "Contact Us" },
    { href: "/auth", label: "Sign In" },
];

const socialLinks = [
    { href: "#", label: "Instagram", icon: Instagram },
    { href: "#", label: "Twitter / X", icon: Twitter },
    { href: "#", label: "Facebook", icon: Facebook },
];

const hoursData = [
    { day: "Mon – Fri", time: "9:00 AM – 11:00 PM", isToday: false },
    { day: "Saturday", time: "8:00 AM – 11:30 PM", isToday: true },
    { day: "Sunday", time: "10:00 AM – 10:00 PM", isToday: false },
];

const highlights = [
    { icon: IceCream, label: "Ice Creams" },
    { icon: Grape, label: "Fresh Juices" },
    { icon: UtensilsCrossed, label: "Fast Food" },
    { icon: Star, label: "Premium Shakes" },
];

export default function Footer() {
    return (
        <footer
            className="relative overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #fffbf2 0%, #fff8ed 40%, #fef3e2 100%)",
                borderTop: "1px solid rgba(251,191,36,0.25)",
            }}
        >
            {/* Decorative top border line */}
            <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, #f59e0b 20%, #fb923c 50%, #f59e0b 80%, transparent 100%)",
                }}
            />

            {/* Subtle warm radial glow */}
            <div
                className="pointer-events-none absolute top-0 left-1/2 h-96 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
                style={{
                    background:
                        "radial-gradient(ellipse, #fde68a 0%, #fed7aa 60%, transparent 100%)",
                }}
                aria-hidden="true"
            />

            {/* Subtle texture dots */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #92400e 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-4 md:px-8">

                {/* ── CTA Strip ── */}
                <div
                    className="relative mx-auto -mt-0 mb-0 overflow-hidden rounded-b-3xl px-6 py-8 md:px-12 md:py-10"
                    style={{
                        background:
                            "linear-gradient(135deg, #f59e0b 0%, #fb923c 50%, #ef4444 100%)",
                        boxShadow:
                            "0 8px 40px rgba(245,158,11,0.35), 0 2px 8px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* Decorative circles */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
                    <div className="pointer-events-none absolute -left-6 -bottom-8 h-36 w-36 rounded-full bg-white/10" aria-hidden="true" />

                    <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100/80">
                                Serving Fresh Since Day One
                            </p>
                            <h2 className="mt-1 text-xl font-extrabold leading-tight text-white md:text-2xl">
                                Hungry? We've Got You Covered.
                            </h2>
                            <p className="mt-1 text-sm text-amber-50/80">
                                Fast food, cold shakes & fresh juices — ready in minutes.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                            <Link
                                href="/menu"
                                className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-amber-600 shadow-md transition-all duration-200 hover:shadow-lg hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                Explore Menu
                                <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href="https://wa.me/917878583600"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-2xl border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <MessageCircle size={15} />
                                WhatsApp Order
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Highlights strip ── */}
                <div className="flex flex-wrap items-center justify-center gap-3 py-8 md:gap-6">
                    {highlights.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-400">
                                <Icon size={12} className="text-white" strokeWidth={2.5} />
                            </span>
                            <span className="text-xs font-semibold text-amber-900/80">{label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div
                    className="mb-10 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.3) 30%, rgba(251,146,60,0.3) 70%, transparent 100%)",
                    }}
                />

                {/* ── Main Grid ── */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-10">

                    {/* Brand / About */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        {/* Logo mark */}
                        <div className="mb-5 flex items-center gap-3">
                            <div
                                className="relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                                style={{
                                    background: "linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)",
                                    boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
                                }}
                            >
                                <Sunrise size={26} className="text-white" strokeWidth={2.2} />
                            </div>
                            <div>
                                <p
                                    className="font-extrabold leading-none text-amber-900"
                                    style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}
                                >
                                    Sunrise Fast Food
                                </p>
                                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                                    Juice & Ice-Cream Corner
                                </p>
                            </div>
                        </div>

                        <p className="text-sm leading-7 text-amber-900/60">
                            Fresh fast food, cold-pressed juices, thick shakes & creamy ice-creams —
                            made for cravings, served with a smile. Right in the heart of Rajasthan.
                        </p>

                        {/* Social icons */}
                        <div className="mt-5 flex items-center gap-2">
                            {socialLinks.map(({ href, label, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-white/80 text-amber-600 shadow-sm transition-all duration-200 hover:border-amber-400 hover:bg-amber-50 hover:text-orange-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                >
                                    <Icon size={15} strokeWidth={2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-500">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="group flex items-center gap-2.5 rounded py-0.5 text-sm text-amber-900/65 transition-colors duration-200 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                                    >
                                        <span
                                            className="h-px w-3 rounded-full bg-amber-300 transition-all duration-300 group-hover:w-5 group-hover:bg-orange-400"
                                        />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-500">
                            Get In Touch
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://maps.google.com/?q=Sikar,Rajasthan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 rounded text-sm text-amber-900/65 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                                >
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200">
                                        <MapPin size={13} className="text-amber-600" />
                                    </span>
                                    <span className="leading-relaxed">
                                        Sikar, Rajasthan<br />
                                        <span className="text-xs text-amber-900/40 transition-colors group-hover:text-orange-400">
                                            Get directions →
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+917878583600"
                                    className="group flex items-center gap-3 rounded text-sm text-amber-900/65 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200">
                                        <Phone size={13} className="text-amber-600" />
                                    </span>
                                    78785 83600
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+919950703030"
                                    className="group flex items-center gap-3 rounded text-sm text-amber-900/65 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200">
                                        <Phone size={13} className="text-amber-600" />
                                    </span>
                                    99507 03030
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/917878583600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 rounded text-sm text-amber-900/65 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-green-100 transition-colors group-hover:bg-green-200">
                                        <MessageCircle size={13} className="text-green-600" />
                                    </span>
                                    WhatsApp Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@sunrisefastfood.com"
                                    className="group flex items-center gap-3 rounded text-sm text-amber-900/65 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200">
                                        <Mail size={13} className="text-amber-600" />
                                    </span>
                                    support@sunrisefastfood.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-500">
                            Opening Hours
                        </h3>
                        <ul className="space-y-3">
                            {hoursData.map(({ day, time, isToday }) => (
                                <li
                                    key={day}
                                    className={`flex flex-col gap-1 rounded-2xl px-4 py-3 transition-all ${isToday
                                        ? "border border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm"
                                        : "border border-transparent bg-white/40"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs font-bold ${isToday ? "text-orange-600" : "text-amber-900/70"
                                                }`}
                                        >
                                            {day}
                                        </span>
                                        {isToday && (
                                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-500">
                                                Today
                                            </span>
                                        )}
                                    </div>
                                    <span className="flex items-center gap-1.5 text-xs text-amber-900/50">
                                        <Clock size={11} className="text-amber-400" />
                                        {time}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Open status badge */}
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-50 px-4 py-2 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            <span className="text-xs font-bold text-emerald-700">We&apos;re Open Now</span>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Divider ── */}
                <div
                    className="h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.25) 30%, rgba(251,146,60,0.25) 70%, transparent 100%)",
                    }}
                />

                {/* ── Copyright row ── */}
                <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-amber-900/40 sm:flex-row">
                    <p>© 2026 Sunrise Fast Food & Juice and Ice-Cream Corner. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-amber-300">·</span>
                        <Link
                            href="/terms"
                            className="transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        >
                            Terms of Service
                        </Link>
                        <span className="text-amber-300">·</span>
                        <a
                            href="https://wa.me/917878583600?text=Hi%20I%20want%20a%20business%20website"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-900/35 transition hover:text-orange-500"
                        >
                            Made with <span className="text-orange-400">♥</span> by Gaurav Kumawat
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
