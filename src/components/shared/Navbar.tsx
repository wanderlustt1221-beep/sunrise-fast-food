"use client";

// src/components/shared/Navbar.tsx
// Premium redesign — clean nav, no repeated links, A1 responsive
// Styles live in src/app/navbar.css (imported via globals.css) so they are
// available before first paint — no FOUC.

import Link from "next/link";
import {
    ShoppingCart, Menu, X, LogOut, Loader2, LayoutDashboard,
    ChevronRight, UtensilsCrossed, Package, MapPin, Phone,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import InstallPwaButton from "@/components/shared/InstallPwaButton";

// ─── Types ────────────────────────────────────────────────────────────────
type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
};
type AuthState = "loading" | "authenticated" | "unauthenticated";

// ─── Constants ────────────────────────────────────────────────────────────
const PHONES = ["7878583600", "9950703030"];

const baseNavLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
];

function getFirstName(name: string): string {
    return name.split(" ")[0] ?? name;
}

function Avatar({ name }: { name: string }) {
    return (
        <span className="sf-avatar">
            {getFirstName(name)[0].toUpperCase()}
        </span>
    );
}

// ─── Component ────────────────────────────────────────────────────────────
export default function Navbar() {
    const totalItems = useCartStore((s) => s.getTotalItems());
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [authState, setAuthState] = useState<AuthState>("loading");
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loggingOut, setLoggingOut] = useState(false);
    const router = useRouter();

    // ── Auth ──────────────────────────────────────────────────────────────
    const fetchMe = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.user) {
                    setUser(data.user);
                    setAuthState("authenticated");
                    try { localStorage.setItem("cafeapp_user", JSON.stringify({ name: data.user.name, email: data.user.email, phone: data.user.phone ?? "", address: data.user.address ?? "" })); } catch { }
                    return;
                }
            }
        } catch { }
        setUser(null);
        setAuthState("unauthenticated");
        try { localStorage.removeItem("cafeapp_user"); } catch { }
    }, []);

    useEffect(() => {
        setMounted(true);
        fetchMe();
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [fetchMe]);

    // ── Nav links — "Track Order" only for guests, "My Orders" for authed users ──
    const navLinks = [
        ...baseNavLinks.slice(0, 2),
        authState === "authenticated"
            ? { href: "/my-orders", label: "My Orders" }
            : { href: "/track-order", label: "Track Order" },
        ...baseNavLinks.slice(2),
    ];

    const handleLogout = async () => {
        setLoggingOut(true);
        setIsOpen(false);
        try { await fetch("/api/auth/logout", { method: "POST", credentials: "include" }); } catch { }
        try { localStorage.removeItem("cafeapp_user"); } catch { }
        setUser(null);
        setAuthState("unauthenticated");
        setLoggingOut(false);
        router.push("/");
        router.refresh();
    };

    // ── Desktop Auth ──────────────────────────────────────────────────────
    const renderDesktopAuth = () => {
        if (authState === "loading") return (
            <div className="sf-loader-wrap">
                <Loader2 size={14} className="sf-spin" />
            </div>
        );

        if (authState === "authenticated" && user) return (
            <div className="sf-desktop-auth">
                {user.role === "admin" && (
                    <Link href="/admin" className="sf-chip sf-chip--admin">
                        <LayoutDashboard size={12} />
                        Admin
                    </Link>
                )}
                <div className="sf-user-pill">
                    <Avatar name={user.name} />
                    <span className="sf-user-name">{getFirstName(user.name)}</span>
                </div>
                <button onClick={handleLogout} disabled={loggingOut} className="sf-logout-btn" aria-label="Logout">
                    {loggingOut ? <Loader2 size={13} className="sf-spin" /> : <LogOut size={13} />}
                </button>
            </div>
        );

        return (
            <Link href="/auth" className="sf-signin-btn">Sign In</Link>
        );
    };

    // ── Mobile Auth ───────────────────────────────────────────────────────
    const renderMobileAuth = () => {
        if (authState === "loading") return (
            <div className="sf-mobile-loader">
                <Loader2 size={16} className="sf-spin" />
            </div>
        );

        if (authState === "authenticated" && user) return (
            <div className="sf-mobile-auth-group">
                {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="sf-mobile-row sf-mobile-row--admin">
                        <span className="sf-mobile-icon-wrap sf-mobile-icon-wrap--admin"><LayoutDashboard size={15} /></span>
                        <span>Admin Panel</span>
                        <ChevronRight size={14} className="sf-chevron" />
                    </Link>
                )}
                <div className="sf-mobile-profile">
                    <Avatar name={user.name} />
                    <div>
                        <p className="sf-mobile-profile-name">{user.name}</p>
                        <p className="sf-mobile-profile-email">{user.email}</p>
                    </div>
                </div>
                <button onClick={handleLogout} disabled={loggingOut} className="sf-mobile-logout">
                    {loggingOut ? <Loader2 size={14} className="sf-spin" /> : <LogOut size={14} />}
                    Logout
                </button>
            </div>
        );

        return (
            <Link href="/auth" onClick={() => setIsOpen(false)} className="sf-mobile-signin">
                <span>Sign In</span>
                <ChevronRight size={16} />
            </Link>
        );
    };

    return (
        <>
            {/* ── Top strip ── */}
            <div className="sf-strip">
                <div className="sf-strip-inner">
                    <span className="sf-strip-tag">🔥 Free delivery on orders above ₹499</span>
                    <div className="sf-strip-phones">
                        {PHONES.map((ph) => (
                            <a key={ph} href={`tel:${ph}`} className="sf-strip-phone">
                                <Phone size={10} />
                                {ph}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Header ── */}
            <header className={`sf-header${scrolled ? " sf-header--scrolled" : ""}`}>
                <div className="sf-header-inner">

                    {/* Logo */}
                    <Link href="/" className="sf-logo" aria-label="Sunrise Fast Food">
                        <span className="sf-logo-icon">☀️</span>
                        <div className="sf-logo-text">
                            <span className="sf-logo-brand">Sunrise Fast Food</span>
                            <span className="sf-logo-sub">Juice &amp; Ice‑Cream Corner</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="sf-nav" aria-label="Main navigation">
                        {navLinks.map(({ href, label }) => (
                            <Link key={href} href={href} className="sf-nav-link">
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="sf-actions">
                        {renderDesktopAuth()}

                        <Link href="/menu" className="sf-order-btn">
                            <UtensilsCrossed size={14} strokeWidth={2.5} />
                            <span>Order Now</span>
                        </Link>

                        <Link href="/cart" aria-label={`Cart, ${mounted ? totalItems : 0} items`} className="sf-cart-btn">
                            <ShoppingCart size={18} strokeWidth={2} />
                            {mounted && totalItems > 0 && (
                                <span className="sf-cart-badge">{totalItems}</span>
                            )}
                        </Link>

                        <button
                            className="sf-burger"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                            aria-controls="sf-mobile-menu"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            <span className={`sf-burger-icon${isOpen ? " sf-burger-icon--hide" : ""}`}><Menu size={20} /></span>
                            <span className={`sf-burger-icon${!isOpen ? " sf-burger-icon--hide" : ""}`}><X size={20} /></span>
                        </button>
                    </div>
                </div>

                {/* ── Mobile drawer ── */}
                <div
                    id="sf-mobile-menu"
                    className={`sf-drawer${isOpen ? " sf-drawer--open" : ""}`}
                    aria-hidden={!isOpen}
                >
                    <div className="sf-drawer-inner">

                        {/* Auth */}
                        {renderMobileAuth()}

                        <hr className="sf-divider" />

                        {/* Nav links */}
                        <nav className="sf-mobile-nav">
                            {navLinks.map(({ href, label }) => (
                                <Link key={href} href={href} onClick={() => setIsOpen(false)} className="sf-mobile-nav-link">
                                    {label}
                                    <ChevronRight size={14} className="sf-chevron" />
                                </Link>
                            ))}
                        </nav>

                        <hr className="sf-divider" />

                        {/* Cart + CTA */}
                        <Link href="/cart" onClick={() => setIsOpen(false)} className="sf-mobile-cart">
                            <ShoppingCart size={16} />
                            <span>View Cart</span>
                            {mounted && totalItems > 0 && (
                                <span className="sf-cart-badge sf-cart-badge--sm">{totalItems}</span>
                            )}
                        </Link>

                        <Link href="/menu" onClick={() => setIsOpen(false)} className="sf-mobile-cta">
                            <UtensilsCrossed size={16} strokeWidth={2.5} />
                            Order Fresh Now
                        </Link>

                        {/* Call us */}
                        <div className="sf-mobile-calls">
                            <p className="sf-mobile-calls-label">📞 Call Us</p>
                            {PHONES.map((ph) => (
                                <a key={ph} href={`tel:${ph}`} className="sf-mobile-phone">
                                    <MapPin size={12} />
                                    {ph}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <InstallPwaButton />
        </>
    );
}