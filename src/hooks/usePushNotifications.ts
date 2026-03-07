// src/hooks/usePushNotifications.ts
// Custom hook that manages the full Web Push subscription lifecycle:
// - Service worker registration
// - Permission state tracking
// - Subscribe / unsubscribe
// - Sync subscription to backend

"use client";

import { useState, useEffect, useCallback } from "react";

export type PushState =
    | "unsupported"    // browser doesn't support push
    | "loading"        // checking current state
    | "default"        // not yet asked
    | "granted"        // subscribed and active
    | "denied"         // user blocked notifications
    | "prompt";        // ready to ask (permission = 'default')

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64  = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const raw     = atob(base64);
    return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export function usePushNotifications() {
    const [state,        setState]        = useState<PushState>("loading");
    const [subscribing,  setSubscribing]  = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    // ── Check current push state on mount ────────────────────────────────
    useEffect(() => {
        if (typeof window === "undefined") return;

        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
            setState("unsupported");
            return;
        }

        const checkState = async () => {
            try {
                const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
                setRegistration(reg);
                await navigator.serviceWorker.ready;

                const permission = Notification.permission;
                if (permission === "denied") { setState("denied"); return; }

                const sub = await reg.pushManager.getSubscription();
                if (sub && permission === "granted") {
                    setState("granted");
                } else {
                    setState(permission === "granted" ? "prompt" : "prompt");
                }
            } catch (err) {
                console.error("[Push] SW registration failed:", err);
                setState("unsupported");
            }
        };

        checkState();
    }, []);

    // ── Subscribe ─────────────────────────────────────────────────────────
    const subscribe = useCallback(async (): Promise<boolean> => {
        if (!registration) return false;

        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
            console.error("[Push] NEXT_PUBLIC_VAPID_PUBLIC_KEY not set");
            return false;
        }

        setSubscribing(true);
        try {
            // 1. Request permission
            const permission = await Notification.requestPermission();
            if (permission !== "granted") {
                setState(permission === "denied" ? "denied" : "prompt");
                return false;
            }

            // 2. Get or create push subscription
            const existing = await registration.pushManager.getSubscription();
            const sub = existing ?? await registration.pushManager.subscribe({
                userVisibleOnly:      true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey),
            });

            // 3. Send to backend
            const res = await fetch("/api/push/subscribe", {
                method:      "POST",
                credentials: "include",
                headers:     { "Content-Type": "application/json" },
                body: JSON.stringify({
                    endpoint:  sub.endpoint,
                    keys:      sub.toJSON().keys,
                    userAgent: navigator.userAgent,
                }),
            });

            if (!res.ok) throw new Error("Backend save failed");

            setState("granted");
            return true;
        } catch (err) {
            console.error("[Push] Subscribe failed:", err);
            return false;
        } finally {
            setSubscribing(false);
        }
    }, [registration]);

    // ── Unsubscribe ───────────────────────────────────────────────────────
    const unsubscribe = useCallback(async (): Promise<boolean> => {
        if (!registration) return false;
        try {
            const sub = await registration.pushManager.getSubscription();
            if (sub) {
                await fetch("/api/push/unsubscribe", {
                    method:      "POST",
                    credentials: "include",
                    headers:     { "Content-Type": "application/json" },
                    body:        JSON.stringify({ endpoint: sub.endpoint }),
                });
                await sub.unsubscribe();
            }
            setState("prompt");
            return true;
        } catch (err) {
            console.error("[Push] Unsubscribe failed:", err);
            return false;
        }
    }, [registration]);

    return { state, subscribing, subscribe, unsubscribe };
}