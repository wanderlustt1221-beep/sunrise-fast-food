// public/sw.js
// Service Worker for Sunrise Fast Food PWA.
// Handles: push notifications, notificationclick, offline cache (basic).
//
// IMPORTANT: This file must be at /public/sw.js so it is served from root scope.
// Register it in your layout or a client component with:
//   navigator.serviceWorker.register('/sw.js')

const CACHE_NAME = "sunrise-v1";
const OFFLINE_URL = "/";

// ─── Install ──────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([OFFLINE_URL, "/icon-192.png", "/icon-512.png"]);
        })
    );
    self.skipWaiting();
});

// ─── Activate ─────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// ─── Fetch (basic network-first) ─────────────────────────────────────────
self.addEventListener("fetch", (event) => {
    // Only handle same-origin GET requests
    if (
        event.request.method !== "GET" ||
        !event.request.url.startsWith(self.location.origin)
    ) return;

    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then((r) => r || caches.match(OFFLINE_URL))
        )
    );
});

// ─── Push ─────────────────────────────────────────────────────────────────
self.addEventListener("push", (event) => {
    let data = {
        title: "🌅 Sunrise Fast Food",
        body:  "Something delicious is waiting for you!",
        url:   "/menu",
        icon:  "/icon-192.png",
        badge: "/icon-192.png",
    };

    try {
        if (event.data) {
            const parsed = event.data.json();
            data = { ...data, ...parsed };
        }
    } catch {
        // Use defaults
    }

    const options = {
        body:             data.body,
        icon:             data.icon,
        badge:            data.badge,
        data:             { url: data.url },
        vibrate:          [150, 50, 150],
        requireInteraction: false,
        tag:              "sunrise-promo",   // replaces previous if unread
        renotify:         true,
        actions: [
            { action: "order", title: "Order Now 🍔" },
            { action: "dismiss", title: "Later" },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// ─── Notification Click ───────────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    if (event.action === "dismiss") return;

    const targetUrl = event.notification.data?.url ?? "/menu";
    const fullUrl   = new URL(targetUrl, self.location.origin).href;

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
            // If app already open, focus it and navigate
            for (const client of windowClients) {
                if (client.url.startsWith(self.location.origin) && "focus" in client) {
                    client.focus();
                    if ("navigate" in client) client.navigate(fullUrl);
                    return;
                }
            }
            // Otherwise open a new tab
            if (clients.openWindow) {
                return clients.openWindow(fullUrl);
            }
        })
    );
});

// ─── Push Subscription Change ────────────────────────────────────────────
// Handles browser-initiated re-subscription (rare but important)
self.addEventListener("pushsubscriptionchange", (event) => {
    event.waitUntil(
        self.registration.pushManager.subscribe({
            userVisibleOnly:      true,
            applicationServerKey: self.__VAPID_PUBLIC_KEY__,
        }).then((subscription) => {
            return fetch("/api/push/subscribe", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({
                    endpoint:  subscription.endpoint,
                    keys:      subscription.toJSON().keys,
                    userAgent: navigator.userAgent,
                }),
            });
        })
    );
});