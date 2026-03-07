// src/app/layout.tsx
// Updated: Added NotificationPrompt for push notification opt-in flow.

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NotificationPrompt from "@/components/shared/NotificationPrompt";

// ─── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
    themeColor:   "#f59e0b",
    width:        "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit:  "cover",
};

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: {
        default:  "Sunrise Fast Food — Juice & Ice-Cream Corner",
        template: "%s | Sunrise Fast Food",
    },
    description:
        "Fresh burgers, pizza, momos, shakes, juices & ice cream. Hot & fast delivery. Order online from Sunrise Fast Food & Juice and Ice-Cream Corner.",
    applicationName: "Sunrise Fast Food",

    manifest: "/manifest.webmanifest",
    appleWebApp: {
        capable:        true,
        statusBarStyle: "default",
        title:          "Sunrise Fast Food",
        startupImage:   [{ url: "/icon-512.png" }],
    },

    openGraph: {
        type:        "website",
        siteName:    "Sunrise Fast Food & Juice and Ice-Cream Corner",
        title:       "Sunrise Fast Food — Fresh, Hot & Delicious",
        description: "Burgers, pizza, momos, shakes, juices & ice cream — delivered fresh.",
        images:      [{ url: "/icon-512.png", width: 512, height: 512 }],
    },

    icons: {
        icon: [
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple:    [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
        shortcut: "/icon-192.png",
    },

    keywords: [
        "fast food", "burger", "pizza", "momos", "juice", "ice cream",
        "online order", "food delivery", "sunrise fast food", "sandwich",
        "shake", "pasta", "noodles", "pavbhaji", "tea", "coffee",
    ],
    robots: { index: true, follow: true },
};

// ─── Root layout ───────────────────────────────────────────────────────────
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="bg-[#FFFBF5] text-stone-800 antialiased">
                {children}

                {/* Global notification opt-in prompt */}
                <NotificationPrompt />

                {/* Toast — warm light-theme styling */}
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background:   "#ffffff",
                            color:        "#292524",
                            border:       "1px solid #fed7aa",
                            borderRadius: "14px",
                            fontSize:     "14px",
                            fontWeight:   "500",
                            boxShadow:    "0 4px 24px rgba(251,146,60,0.15)",
                        },
                        success: { iconTheme: { primary: "#f97316", secondary: "#fff7ed" } },
                        error:   { iconTheme: { primary: "#ef4444", secondary: "#fff1f2" } },
                    }}
                />
            </body>
        </html>
    );
}