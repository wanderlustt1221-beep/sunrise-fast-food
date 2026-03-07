"use client";

// src/components/shared/InstallPwaButton.tsx
// Updated: After successful install, triggers the notification opt-in prompt
// by dispatching a custom "pwa-installed" event.

import { useEffect, useRef, useState } from "react";
import { Download, X, Sun, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "sunrise_pwa_dismissed";

export default function InstallPwaButton() {
    const [prompt,     setPrompt]     = useState<BeforeInstallPromptEvent | null>(null);
    const [visible,    setVisible]    = useState(false);
    const [installing, setInstalling] = useState(false);
    const [installed,  setInstalled]  = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (window.matchMedia("(display-mode: standalone)").matches) return;
        if (sessionStorage.getItem(DISMISS_KEY)) return;

        const handler = (e: Event) => {
            e.preventDefault();
            setPrompt(e as BeforeInstallPromptEvent);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setVisible(true), 2500);
        };

        const installedHandler = () => {
            setInstalled(true);
            setVisible(false);
            // Signal NotificationPrompt to show soon after install
            try {
                window.dispatchEvent(new CustomEvent("pwa-installed"));
            } catch { /* ignore */ }
        };

        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener("appinstalled", installedHandler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
            window.removeEventListener("appinstalled", installedHandler);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleInstall = async () => {
        if (!prompt) return;
        setInstalling(true);
        try {
            await prompt.prompt();
            const { outcome } = await prompt.userChoice;
            if (outcome === "accepted") setInstalled(true);
        } catch { /* ignore */ }
        setInstalling(false);
        setVisible(false);
    };

    const dismiss = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setVisible(false);
        try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ }
    };

    if (!visible || installed) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe-area-inset-bottom md:left-auto md:right-6 md:max-w-sm">
            <div className="relative overflow-hidden rounded-t-3xl border border-amber-200 bg-[#fffdf8] shadow-[0_20px_60px_rgba(251,146,60,0.25)] md:rounded-3xl">
                <div
                    className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
                    style={{ background: "radial-gradient(circle, rgba(251,191,36,0.45), transparent 70%)" }}
                />

                <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Close install prompt"
                    className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-xl text-stone-500 transition hover:bg-amber-50 hover:text-orange-600"
                >
                    <X size={16} />
                </button>

                <div className="relative p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                            <Sun size={24} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[17px] font-bold text-stone-900">Install Sunrise App</p>
                            <p className="text-xs text-stone-500">Faster ordering · Works offline</p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                            ⚡ 60 sec ordering
                        </span>
                        <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700">
                            🔔 Order updates
                        </span>
                        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                            📶 Works offline
                        </span>
                    </div>

                    <button
                        onClick={handleInstall}
                        disabled={installing}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-70"
                    >
                        {installing ? (
                            <>
                                <Smartphone size={16} className="animate-pulse" />
                                Installing…
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                Install App
                            </>
                        )}
                    </button>

                    <p className="mt-2 text-center text-[10px] text-stone-500">
                        No Play Store needed · Install instantly
                    </p>
                </div>
            </div>
        </div>
    );
}