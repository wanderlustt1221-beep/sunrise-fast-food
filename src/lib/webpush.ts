// src/lib/webpush.ts
// Production-grade Web Push utility for Sunrise Fast Food.
// Handles VAPID setup, subscription sending, failure cleanup,
// and the rotating notification message pool.

import webpush from "web-push";
import { connectDB } from "@/lib/db";
import PushSubscription from "@/models/PushSubscription";

// ─── VAPID Setup ──────────────────────────────────────────────────────────
// Generate once with: npx web-push generate-vapid-keys
// Then add to .env.local:
//   NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
//   VAPID_PRIVATE_KEY=...
//   VAPID_CONTACT_EMAIL=your@email.com

const VAPID_PUBLIC  = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY!;
const VAPID_EMAIL   = process.env.VAPID_CONTACT_EMAIL ?? "admin@sunrisefastfood.com";

if (VAPID_PUBLIC && VAPID_PRIVATE) {
    webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, VAPID_PUBLIC, VAPID_PRIVATE);
}

// ─── Notification Message Pool ────────────────────────────────────────────
// Rotating pool of fun, craving-based messages.
// Slot A = late morning (around 11:30 AM)
// Slot B = evening (around 5:30 PM)

export type NotificationSlot = "morning" | "evening";

type NotifMessage = {
    title: string;
    body: string;
    url: string;
    slot: NotificationSlot;
};

export const NOTIFICATION_POOL: NotifMessage[] = [
    // ── Morning slot ─────────────────────────────────────────────────────
    {
        slot: "morning",
        title: "🌅 Aaj ka lunch sorted?",
        body: "Fresh burgers, momos, pizza — sab ready hai. Ek order kaafi hai!",
        url: "/menu",
    },
    {
        slot: "morning",
        title: "😋 Bhook lag rahi hai na?",
        body: "Sunrise ka desi twist wala burger try kiya? Abhi order karo!",
        url: "/menu",
    },
    {
        slot: "morning",
        title: "🍕 Pizza ya burger?",
        body: "Dono mil sakte hain — aaj lunch Sunrise ke saath karo.",
        url: "/menu",
    },
    {
        slot: "morning",
        title: "☀️ Good morning, foodie!",
        body: "Sab kuch fresh ban raha hai. Aaj lunch kahan se hoga?",
        url: "/menu",
    },
    {
        slot: "morning",
        title: "🥪 Office lunch sorted nahi hai?",
        body: "Delivery 25 min mein. Order abhi karo, khaana time pe aayega.",
        url: "/menu",
    },

    // ── Evening slot ──────────────────────────────────────────────────────
    {
        slot: "evening",
        title: "🧋 Evening snack time! 👀",
        body: "Cold shake + fries = perfect break. Kab order kar rahe ho?",
        url: "/menu",
    },
    {
        slot: "evening",
        title: "🍟 Fries ka mood hai?",
        body: "Crispy fries aur ek chilled shake — yahi chahiye abhi. Aao order karo!",
        url: "/menu",
    },
    {
        slot: "evening",
        title: "🌙 Raat ka khaana soch liya?",
        body: "Pizza, momos, ya burger — jo bhi ho, hum deliver karenge.",
        url: "/menu",
    },
    {
        slot: "evening",
        title: "🍦 Ice cream ka time aa gaya!",
        body: "Aaj ki shaam Sunrise ice cream ke saath meet karo. Karo order!",
        url: "/menu",
    },
    {
        slot: "evening",
        title: "😍 Aaj momos khaya? Nahi na!",
        body: "Steamy hot momos ready hain. 25 min mein door pe. Order karo!",
        url: "/menu",
    },
    {
        slot: "evening",
        title: "🔥 Hot & Fresh — abhi!",
        body: "Juice, shake, ya snack — Sunrise sab banata hai. Aao order karo!",
        url: "/menu",
    },
    {
        slot: "evening",
        title: "🍔 Burger ka mood hai?",
        body: "Sunrise wala double patty burger try karo — ek baar khao, baar baar yaad aayega.",
        url: "/menu",
    },
];

// Pick a random message for a given slot
export function pickMessage(slot: NotificationSlot): NotifMessage {
    const pool = NOTIFICATION_POOL.filter((m) => m.slot === slot);
    return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Payload Builder ──────────────────────────────────────────────────────
export type PushPayload = {
    title: string;
    body: string;
    url: string;
    icon?: string;
    badge?: string;
};

function buildPayload(msg: NotifMessage): PushPayload {
    return {
        title: msg.title,
        body:  msg.body,
        url:   msg.url,
        icon:  "/icon-192.png",
        badge: "/icon-192.png",
    };
}

// ─── Send to One Subscription ─────────────────────────────────────────────
// Returns true on success, false on failure (expired/invalid).
export async function sendPushToOne(
    subscriptionDoc: { _id: string; endpoint: string; p256dh: string; auth: string },
    payload: PushPayload
): Promise<boolean> {
    const subscription = {
        endpoint: subscriptionDoc.endpoint,
        keys: {
            p256dh: subscriptionDoc.p256dh,
            auth:   subscriptionDoc.auth,
        },
    };

    try {
        await webpush.sendNotification(subscription, JSON.stringify(payload));
        return true;
    } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        // 404 / 410 = subscription expired or user unsubscribed
        if (status === 404 || status === 410) {
            return false; // caller should deactivate
        }
        // Other errors (server/network) — don't deactivate yet
        console.error(`Push send error for ${subscriptionDoc._id}:`, err);
        return false;
    }
}

// ─── Broadcast Campaign ───────────────────────────────────────────────────
// Called by the scheduler route. Sends to all active subscriptions.
// Returns { sent, failed, deactivated } counts.
export async function broadcastCampaign(slot: NotificationSlot): Promise<{
    sent: number;
    failed: number;
    deactivated: number;
}> {
    await connectDB();

    const msg     = pickMessage(slot);
    const payload = buildPayload(msg);

    // Fetch all active subscriptions in batches of 100
    const BATCH = 100;
    let skip = 0;
    let sent = 0, failed = 0, deactivated = 0;

    while (true) {
        const subs = await PushSubscription.find({ isActive: true })
            .skip(skip)
            .limit(BATCH)
            .lean();

        if (subs.length === 0) break;

        await Promise.all(
            subs.map(async (sub) => {
                const ok = await sendPushToOne(
                    { _id: sub._id.toString(), endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
                    payload
                );

                if (ok) {
                    sent++;
                    // Reset fail count on success
                    await PushSubscription.updateOne({ _id: sub._id }, { $set: { failCount: 0 } });
                } else {
                    failed++;
                    // Increment fail count; deactivate after 3 consecutive failures
                    const updated = await PushSubscription.findByIdAndUpdate(
                        sub._id,
                        { $inc: { failCount: 1 } },
                        { new: true }
                    );
                    if (updated && updated.failCount >= 3) {
                        await PushSubscription.updateOne({ _id: sub._id }, { $set: { isActive: false } });
                        deactivated++;
                    }
                }
            })
        );

        skip += BATCH;
        if (subs.length < BATCH) break;
    }

    console.log(`[Push Campaign] slot=${slot} sent=${sent} failed=${failed} deactivated=${deactivated}`);
    return { sent, failed, deactivated };
}