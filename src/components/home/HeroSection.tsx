"use client";

// src/components/home/HeroSection.tsx
// Swiggy/Zomato-style premium hero — fully responsive, no overlaps, A1 layout

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Zap,
    Clock,
    ShieldCheck,
    Star,
} from "lucide-react";
import type { SiteStats } from "@/app/(main)/page";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=85&auto=format&fit=crop",
        eyebrow: "🔥 Hot & Fresh",
        headline: ["Burgers That Hit", "Different Every Time"],
        sub: "Juicy smash burgers, loaded with flavour and made fresh for every order.",
        cta: "Order Burgers",
        ctaHref: "/menu",
    },
    {
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&q=85&auto=format&fit=crop",
        eyebrow: "🍕 Just Out of the Oven",
        headline: ["Pizza Loaded With", "Every Craving"],
        sub: "Cheesy, crispy, and made to order — our pizzas are a meal in themselves.",
        cta: "Explore Pizzas",
        ctaHref: "/menu",
    },
    {
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1400&q=85&auto=format&fit=crop",
        eyebrow: "🥤 Chilled & Refreshing",
        headline: ["Shakes & Juices", "Made With Love"],
        sub: "Thick shakes, fresh juices, cold coffees — the perfect companion to any meal.",
        cta: "See Drinks Menu",
        ctaHref: "/menu",
    },
    {
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1400&q=85&auto=format&fit=crop",
        eyebrow: "🍦 Sweet Endings",
        headline: ["Ice Creams &", "Desserts to Crave"],
        sub: "Cool off with our handcrafted ice creams and desserts — sweet, fresh, irresistible.",
        cta: "View Desserts",
        ctaHref: "/menu",
    },
    {
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=85&auto=format&fit=crop",
        eyebrow: "⭐ Sunrise Specials",
        headline: ["Fast Food That", "Feels Premium"],
        sub: "From cheesy bites to chilled shakes — every craving sorted in minutes.",
        cta: "Order Now",
        ctaHref: "/menu",
    },
];

const trustPills = [
    { icon: Zap,         label: "Fast Delivery"  },
    { icon: Clock,       label: "Open Until 11PM" },
    { icon: ShieldCheck, label: "Fresh Daily"     },
    { icon: Star,        label: "4.9★ Rated"      },
];

const AUTOPLAY_MS = 5000;

interface HeroSectionProps { stats: SiteStats; }

export default function HeroSection({ stats }: HeroSectionProps) {
    const [current,   setCurrent]   = useState(0);
    const [animating, setAnimating] = useState(false);
    const [paused,    setPaused]    = useState(false);

    const go = useCallback((idx: number) => {
        if (animating) return;
        setAnimating(true);
        setCurrent((idx + slides.length) % slides.length);
        setTimeout(() => setAnimating(false), 500);
    }, [animating]);

    const next = useCallback(() => go(current + 1), [current, go]);
    const prev = useCallback(() => go(current - 1), [current, go]);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(next, AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [next, paused]);

    const slide = slides[current];

    const statsStrip = [
        { emoji: "🌿", stat: "100%",   label: "Fresh Ingredients" },
        {
            emoji: "⭐",
            stat:  stats.totalReviews > 0 ? `${stats.avgRating}/5` : "4.9/5",
            label: "Customer Rating",
        },
        { emoji: "🛵", stat: "25 min", label: "Avg Delivery" },
        {
            emoji: "🎉",
            stat:
                stats.happyCustomers >= 1000
                    ? `${(stats.happyCustomers / 1000).toFixed(1)}k+`
                    : `${stats.happyCustomers}+`,
            label: "Happy Customers",
        },
    ];

    return (
        <section className="hs-root" aria-label="Featured food highlights">

            {/* ── Hero carousel ── */}
            <div className="hs-wrap">
                <div
                    className="hs-stage"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => setPaused(false)}
                >
                    {/* Slide images */}
                    {slides.map((s, i) => (
                        <div
                            key={i}
                            className="hs-slide"
                            style={{ opacity: i === current ? 1 : 0 }}
                            aria-hidden={i !== current}
                        >
                            <img
                                src={s.image}
                                alt=""
                                className="hs-img"
                                loading={i === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))}

                    {/* Gradient overlays */}
                    <div className="hs-overlay-left"  />
                    <div className="hs-overlay-bottom"/>

                    {/* ── Content shell: arrows pinned at edges, text in center ── */}
                    <div className="hs-content-shell">
                        {/* Left arrow */}
                        <button onClick={prev} aria-label="Previous slide" className="hs-arrow hs-arrow--left">
                            <ChevronLeft size={18} strokeWidth={2.5} />
                        </button>

                        {/* Text content */}
                        <div className="hs-content">
                            <span className="hs-eyebrow">{slide.eyebrow}</span>

                            <h1 key={`h-${current}`} className="hs-headline">
                                <span className="hs-line-plain">{slide.headline[0]}</span>
                                <span className="hs-line-accent">{slide.headline[1]}</span>
                            </h1>

                            <p key={`s-${current}`} className="hs-sub">{slide.sub}</p>

                            {/* CTAs */}
                            <div className="hs-ctas">
                                <Link href={slide.ctaHref} className="hs-cta-primary">
                                    {slide.cta}
                                    <ArrowRight size={13} className="hs-cta-arrow" />
                                </Link>
                                <Link href="/menu" className="hs-cta-ghost">
                                    Full Menu
                                </Link>
                            </div>

                            {/* Trust pills — hidden on very small screens to save space */}
                            <div className="hs-pills">
                                {trustPills.map(({ icon: Icon, label }) => (
                                    <span key={label} className="hs-pill">
                                        <Icon size={9} className="hs-pill-icon" strokeWidth={2.5} />
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right arrow */}
                        <button onClick={next} aria-label="Next slide" className="hs-arrow hs-arrow--right">
                            <ChevronRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="hs-dots">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => go(i)}
                                aria-label={`Slide ${i + 1}`}
                                className={`hs-dot${i === current ? " hs-dot--active" : ""}`}
                            />
                        ))}
                    </div>

                    {/* Progress bar */}
                    {!paused && (
                        <div className="hs-progress-track">
                            <div key={`p-${current}`} className="hs-progress-bar" />
                        </div>
                    )}
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div className="hs-stats">
                <div className="hs-stats-grid">
                    {statsStrip.map(({ emoji, stat, label }) => (
                        <div key={label} className="hs-stat">
                            <span className="hs-stat-emoji">{emoji}</span>
                            <div>
                                <p className="hs-stat-value">{stat}</p>
                                <p className="hs-stat-label">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`

                /* ────────────────────────────────────────────
                   ROOT
                ──────────────────────────────────────────── */
                .hs-root {
                    width: 100%;
                    background: #FFF9F2;
                }

                /* ────────────────────────────────────────────
                   WRAPPER + STAGE
                ──────────────────────────────────────────── */
                .hs-wrap {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    /* Tighter padding on mobile */
                    padding: 8px 8px 0;
                }
                @media (min-width: 480px) {
                    .hs-wrap { padding: 10px 10px 0; }
                }
                @media (min-width: 768px) {
                    .hs-wrap { padding: 16px 16px 0; }
                }

                /*
                 * Stage height — mobile-first:
                 *   < 360px  : 260px  (very small phones)
                 *   360–479  : 280px
                 *   480–639  : 320px
                 *   640–1023 : fluid ~46vw, capped 400px
                 *   1024+    : fluid ~38vw, up to 500px
                 *   1280+    : up to 520px
                 */
                .hs-stage {
                    position: relative;
                    overflow: hidden;
                    border-radius: 12px;
                    height: 260px;
                }
                @media (min-width: 360px) {
                    .hs-stage { height: 280px; }
                }
                @media (min-width: 480px) {
                    .hs-stage { height: 320px; border-radius: 14px; }
                }
                @media (min-width: 640px) {
                    .hs-stage { height: clamp(300px, 46vw, 400px); border-radius: 20px; }
                }
                @media (min-width: 1024px) {
                    .hs-stage { height: clamp(380px, 38vw, 500px); border-radius: 24px; }
                }
                @media (min-width: 1280px) {
                    .hs-stage { height: clamp(420px, 34vw, 520px); }
                }

                /* ────────────────────────────────────────────
                   SLIDE IMAGE
                ──────────────────────────────────────────── */
                .hs-slide {
                    position: absolute;
                    inset: 0;
                    transition: opacity 0.65s ease;
                }
                .hs-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    /* Slightly favour top-center on mobile so food stays in frame */
                    object-position: center 30%;
                    display: block;
                }
                @media (min-width: 640px) {
                    .hs-img { object-position: center; }
                }

                /* ────────────────────────────────────────────
                   OVERLAYS — stronger on mobile for legibility
                ──────────────────────────────────────────── */
                .hs-overlay-left {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        rgba(0,0,0,0.82) 0%,
                        rgba(0,0,0,0.52) 42%,
                        rgba(0,0,0,0.12) 72%,
                        transparent 100%
                    );
                    z-index: 1;
                }
                @media (min-width: 640px) {
                    .hs-overlay-left {
                        background: linear-gradient(
                            105deg,
                            rgba(0,0,0,0.78) 0%,
                            rgba(0,0,0,0.45) 45%,
                            rgba(0,0,0,0.08) 75%,
                            transparent 100%
                        );
                    }
                }
                .hs-overlay-bottom {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);
                    z-index: 1;
                }

                /* ────────────────────────────────────────────
                   CONTENT SHELL — flex row: [arrow] [text] [arrow]
                ──────────────────────────────────────────── */
                .hs-content-shell {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    padding: 0;
                }

                /* ────────────────────────────────────────────
                   ARROWS
                   Mobile: smaller, tighter margin so text has room
                ──────────────────────────────────────────── */
                .hs-arrow {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /* Mobile: 30px */
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(255,255,255,0.22);
                    background: rgba(0,0,0,0.32);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    color: #fff;
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s, transform 0.15s;
                    margin: 0 7px;
                    /* Make tap targets bigger than visual size */
                    padding: 0;
                    touch-action: manipulation;
                }
                .hs-arrow:hover {
                    background: rgba(0,0,0,0.55);
                    border-color: rgba(255,255,255,0.5);
                    transform: scale(1.08);
                }
                @media (min-width: 480px) {
                    .hs-arrow { width: 34px; height: 34px; margin: 0 9px; }
                }
                @media (min-width: 640px) {
                    .hs-arrow { width: 40px; height: 40px; margin: 0 14px; }
                }
                @media (min-width: 1024px) {
                    .hs-arrow { width: 46px; height: 46px; margin: 0 20px; }
                }

                /* ────────────────────────────────────────────
                   TEXT CONTENT
                ──────────────────────────────────────────── */
                .hs-content {
                    flex: 1;
                    min-width: 0;
                    /* Push content toward top-left on mobile */
                    padding-bottom: 28px;
                }
                @media (min-width: 640px) {
                    .hs-content {
                        margin-top: -8px;
                        padding-bottom: 0;
                    }
                }

                /* Eyebrow badge */
                .hs-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    padding: 3px 8px;
                    border-radius: 999px;
                    border: 1px solid rgba(255,255,255,0.22);
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #fff;
                    margin-bottom: 6px;
                    /* Prevent text overflow on tiny screens */
                    max-width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                @media (min-width: 480px) {
                    .hs-eyebrow { font-size: 10px; padding: 4px 10px; margin-bottom: 7px; }
                }
                @media (min-width: 640px) {
                    .hs-eyebrow { font-size: 11px; margin-bottom: 10px; padding: 5px 12px; }
                }

                /* Headline */
                .hs-headline {
                    display: flex;
                    flex-direction: column;
                    font-weight: 900;
                    line-height: 1.08;
                    letter-spacing: -0.02em;
                    /* Mobile: fixed comfortable size, scales up from 480px */
                    font-size: 1.35rem;
                    animation: hs-slide-up 0.42s ease forwards;
                    margin: 0;
                }
                @media (min-width: 360px)  { .hs-headline { font-size: 1.5rem; } }
                @media (min-width: 480px)  { .hs-headline { font-size: clamp(1.5rem, 4vw, 2.2rem); } }
                @media (min-width: 640px)  { .hs-headline { font-size: clamp(1.8rem, 4.5vw, 3.2rem); } }

                .hs-line-plain  { color: #fff; }
                .hs-line-accent {
                    background: linear-gradient(135deg, #fbbf24, #fb923c);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }

                /* Sub — hidden on very short / narrow screens to prevent overflow */
                .hs-sub {
                    margin-top: 6px;
                    font-size: 0.72rem;
                    line-height: 1.5;
                    color: rgba(255,255,255,0.82);
                    max-width: 480px;
                    animation: hs-slide-up 0.5s ease 0.06s both;
                    /* Clamp to 2 lines on mobile */
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                @media (min-width: 480px) {
                    .hs-sub { font-size: 0.78rem; margin-top: 8px; -webkit-line-clamp: 3; }
                }
                @media (min-width: 640px) {
                    .hs-sub {
                        font-size: clamp(0.78rem, 1.6vw, 1rem);
                        margin-top: 10px;
                        -webkit-line-clamp: unset;
                        overflow: visible;
                        display: block;
                    }
                }

                /* CTA row */
                .hs-ctas {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 6px;
                    margin-top: 10px;
                }
                @media (min-width: 480px) { .hs-ctas { margin-top: 12px; gap: 8px; } }
                @media (min-width: 640px) { .hs-ctas { margin-top: 18px; gap: 10px; } }

                .hs-cta-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    /* Mobile: compact padding */
                    padding: 7px 14px;
                    border-radius: 999px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #fff;
                    text-decoration: none;
                    box-shadow: 0 3px 12px rgba(249,115,22,0.38);
                    transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
                    white-space: nowrap;
                    touch-action: manipulation;
                    /* Ensure minimum tap target */
                    min-height: 36px;
                }
                @media (min-width: 480px) {
                    .hs-cta-primary { padding: 8px 16px; font-size: 0.78rem; }
                }
                @media (min-width: 640px) {
                    .hs-cta-primary {
                        padding: 9px 18px;
                        font-size: clamp(0.78rem, 1.5vw, 0.875rem);
                        box-shadow: 0 4px 16px rgba(249,115,22,0.4);
                        gap: 6px;
                    }
                }
                .hs-cta-primary:hover {
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 6px 22px rgba(249,115,22,0.5);
                    filter: brightness(1.06);
                }
                .hs-cta-primary:active { transform: scale(0.97); }
                .hs-cta-arrow { transition: transform 0.2s; }
                .hs-cta-primary:hover .hs-cta-arrow { transform: translateX(3px); }

                .hs-cta-ghost {
                    display: inline-flex;
                    align-items: center;
                    padding: 7px 14px;
                    border-radius: 999px;
                    border: 1.5px solid rgba(255,255,255,0.28);
                    background: rgba(255,255,255,0.1);
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #fff;
                    text-decoration: none;
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    transition: background 0.2s, border-color 0.2s;
                    white-space: nowrap;
                    touch-action: manipulation;
                    min-height: 36px;
                }
                @media (min-width: 480px) {
                    .hs-cta-ghost { padding: 8px 16px; font-size: 0.78rem; }
                }
                @media (min-width: 640px) {
                    .hs-cta-ghost {
                        padding: 9px 18px;
                        font-size: clamp(0.78rem, 1.5vw, 0.875rem);
                    }
                }
                .hs-cta-ghost:hover {
                    background: rgba(255,255,255,0.2);
                    border-color: rgba(255,255,255,0.5);
                }

                /* Trust pills
                   On mobile (<360px) completely hidden to save vertical space.
                   From 360px show 2 pills, from 480px show all 4.
                */
                .hs-pills {
                    display: none;
                }
                @media (min-width: 360px) {
                    .hs-pills {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 5px;
                        margin-top: 8px;
                    }
                    /* Show only first 2 pills on 360–479 */
                    .hs-pill:nth-child(n+3) { display: none; }
                }
                @media (min-width: 480px) {
                    .hs-pills { margin-top: 10px; gap: 6px; }
                    .hs-pill:nth-child(n+3) { display: inline-flex; }
                }
                @media (min-width: 640px) {
                    .hs-pills { margin-top: 14px; }
                }

                .hs-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 3px 8px;
                    border-radius: 999px;
                    border: 1px solid rgba(255,255,255,0.2);
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    font-size: 9px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.9);
                    white-space: nowrap;
                }
                @media (min-width: 480px) {
                    .hs-pill { padding: 4px 9px; font-size: 10px; gap: 5px; }
                }
                @media (min-width: 640px) {
                    .hs-pill { font-size: clamp(9px, 1.2vw, 11px); padding: 4px 10px; }
                }
                .hs-pill-icon { color: #fcd34d; flex-shrink: 0; }

                /* ────────────────────────────────────────────
                   DOTS
                ──────────────────────────────────────────── */
                .hs-dots {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                @media (min-width: 640px) {
                    .hs-dots { bottom: 14px; gap: 6px; }
                }
                .hs-dot {
                    height: 6px;
                    width: 6px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.4);
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    transition: width 0.3s ease, background 0.3s ease;
                    touch-action: manipulation;
                }
                .hs-dot--active {
                    width: 20px;
                    background: #fbbf24;
                }
                @media (min-width: 640px) {
                    .hs-dot { height: 8px; width: 8px; }
                    .hs-dot--active { width: 28px; }
                }

                /* ────────────────────────────────────────────
                   PROGRESS BAR
                ──────────────────────────────────────────── */
                .hs-progress-track {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: rgba(255,255,255,0.1);
                    z-index: 20;
                }
                .hs-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #fbbf24, #f97316);
                    transform-origin: left;
                    animation: hs-progress ${AUTOPLAY_MS}ms linear forwards;
                }

                /* ────────────────────────────────────────────
                   STATS STRIP
                ──────────────────────────────────────────── */
                .hs-stats {
                    margin-top: 10px;
                    border-top: 1px solid #FDE68A;
                    border-bottom: 1px solid #FDE68A;
                    background: #fff;
                }
                @media (min-width: 768px) {
                    .hs-stats { margin-top: 12px; }
                }

                .hs-stats-grid {
                    max-width: 1280px;
                    margin: 0 auto;
                    /* Mobile: 2×2 grid, compact padding */
                    padding: 10px 12px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px 8px;
                }
                @media (min-width: 480px) {
                    .hs-stats-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 8px;
                        padding: 12px 16px;
                    }
                }
                @media (min-width: 768px) {
                    .hs-stats-grid { padding: 16px 32px; }
                }

                .hs-stat {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                /* Dividers only when 4-col layout */
                @media (min-width: 480px) {
                    .hs-stat:not(:last-child) {
                        border-right: 1px solid #FEF3C7;
                        padding-right: 10px;
                    }
                }
                @media (min-width: 768px) {
                    .hs-stat:not(:last-child) { padding-right: 12px; }
                }

                /* Smaller emoji on mobile */
                .hs-stat-emoji { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
                @media (min-width: 480px) { .hs-stat-emoji { font-size: 1.5rem; } }
                @media (min-width: 768px) { .hs-stat-emoji { font-size: 1.75rem; } }

                .hs-stat-value {
                    font-size: clamp(0.82rem, 2vw, 1.15rem);
                    font-weight: 900;
                    line-height: 1;
                    color: #1C1917;
                    margin: 0;
                }
                .hs-stat-label {
                    font-size: clamp(8px, 1.1vw, 11px);
                    font-weight: 600;
                    color: #A8A29E;
                    margin-top: 3px;
                    /* Prevent label wrap on tiny screens */
                    white-space: nowrap;
                }

                /* ────────────────────────────────────────────
                   KEYFRAMES
                ──────────────────────────────────────────── */
                @keyframes hs-slide-up {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes hs-progress {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
            `}</style>
        </section>
    );
}