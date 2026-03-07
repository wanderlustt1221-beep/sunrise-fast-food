"use client";

// src/components/shared/NotificationPrompt.tsx
// Premium branded notification opt-in prompt for Sunrise Fast Food.
// Shows after app install or meaningful engagement (not on page load).
// Smooth slide-up on mobile, card on desktop — warm food-brand design.

import { useEffect, useState } from "react";
import { Bell, BellOff, X, Zap, UtensilsCrossed, Clock } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

const DISMISS_KEY    = "sunrise_notif_dismissed_v1";
const SHOW_DELAY_MS  = 4000;    // show 4s after trigger
const ENGAGE_SCROLL  = 600;     // px scrolled = "meaningful engagement"

export default function NotificationPrompt() {
    const { state, subscribing, subscribe } = usePushNotifications();
    const [visible,   setVisible]   = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [success,   setSuccess]   = useState(false);

    // ── Show logic ────────────────────────────────────────────────────────
    // Only show if:
    // 1. Push is supported and permission is still "default" (prompt state)
    // 2. User hasn't dismissed this session
    // 3. User has scrolled at least ENGAGE_SCROLL px (meaningful engagement)
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (state !== "prompt") return;
        if (sessionStorage.getItem(DISMISS_KEY)) return;

        let timer: ReturnType<typeof setTimeout>;

        const onScroll = () => {
            if (window.scrollY > ENGAGE_SCROLL && !visible) {
                window.removeEventListener("scroll", onScroll);
                timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (timer) clearTimeout(timer);
        };
    }, [state, visible]);

    const handleDismiss = () => {
        setVisible(false);
        setDismissed(true);
        try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ }
    };

    const handleAllow = async () => {
        const ok = await subscribe();
        if (ok) {
            setSuccess(true);
            setTimeout(() => { setVisible(false); }, 2500);
        } else {
            handleDismiss();
        }
    };

    if (dismissed || state === "unsupported" || state === "denied" || state === "granted" || state === "loading") {
        return null;
    }
    if (!visible) return null;

    return (
        <>
            {/* Backdrop (mobile) */}
            <div
                className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:hidden"
                onClick={handleDismiss}
            />

            {/* Prompt card */}
            <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 md:bottom-6 md:left-auto md:right-6 md:max-w-sm">
                <div
                    className="relative overflow-hidden rounded-3xl border border-amber-200 bg-[#fffdf8] shadow-[0_24px_64px_rgba(251,146,60,0.22)]"
                    style={{ animation: "slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                    {/* Warm glow */}
                    <div
                        className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-50 blur-3xl"
                        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.5), transparent 70%)" }}
                    />
                    <div
                        className="pointer-events-none absolute -right-12 bottom-0 h-32 w-32 rounded-full opacity-30 blur-2xl"
                        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)" }}
                    />

                    {/* Close */}
                    <button
                        onClick={handleDismiss}
                        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-xl text-stone-400 transition-all hover:bg-amber-50 hover:text-stone-600"
                        aria-label="Dismiss"
                    >
                        <X size={15} />
                    </button>

                    <div className="relative p-6">
                        {success ? (
                            /* ── Success state ── */
                            <div className="flex flex-col items-center py-2 text-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-200">
                                    <Bell size={24} className="text-white" />
                                </div>
                                <p className="text-lg font-black text-stone-900">You're in! 🎉</p>
                                <p className="mt-1 text-sm text-stone-500">
                                    We'll ping you when something delicious is ready.
                                </p>
                            </div>
                        ) : (
                            /* ── Opt-in state ── */
                            <>
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200">
                                        <Bell size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[16px] font-black text-stone-900 leading-tight">
                                            Bhook lage toh yaad aaye
                                        </p>
                                        <p className="text-xs text-stone-500 mt-0.5">
                                            Notifications on karo — free hai 😋
                                        </p>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="mb-5 space-y-2">
                                    {[
                                        { icon: Zap,             text: "Daily food cravings at the right time" },
                                        { icon: UtensilsCrossed, text: "Special offers & combo alerts" },
                                        { icon: Clock,           text: "Only 2 notifications per day — no spam" },
                                    ].map(({ icon: Icon, text }, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                                                <Icon size={12} className="text-amber-600" strokeWidth={2.5} />
                                            </div>
                                            <p className="text-[12px] text-stone-600 font-medium">{text}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={handleAllow}
                                    disabled={subscribing}
                                    className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all hover:brightness-110 disabled:opacity-70 active:scale-[0.98]"
                                >
                                    {subscribing ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Setting up…
                                        </>
                                    ) : (
                                        <>
                                            <Bell size={15} strokeWidth={2.5} />
                                            Haan, notify karo! 🔔
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleDismiss}
                                    className="flex w-full items-center justify-center gap-1.5 py-2 text-[12px] font-semibold text-stone-400 transition-colors hover:text-stone-600"
                                >
                                    <BellOff size={11} />
                                    Nahi chahiye abhi
                                </button>

                                <p className="mt-3 text-center text-[10px] text-stone-400">
                                    Browser notifications · Kabhi bhi band kar sakte ho
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
            `}</style>
        </>
    );
}