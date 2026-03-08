import webpush from "web-push";
import { connectDB } from "@/lib/db";
import PushSubscription from "@/models/PushSubscription";

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL =
  process.env.VAPID_CONTACT_EMAIL ?? "admin@sunrisefastfood.com";

if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, VAPID_PUBLIC, VAPID_PRIVATE);
} else {
  console.error("WEBPUSH_INIT_ERROR: Missing VAPID keys in environment");
}

export type NotificationSlot = "morning" | "evening";

type NotifMessage = {
  title: string;
  body: string;
  url: string;
  slot: NotificationSlot;
};

export const NOTIFICATION_POOL: NotifMessage[] = [
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
];

export function pickMessage(slot: NotificationSlot): NotifMessage {
  const pool = NOTIFICATION_POOL.filter((m) => m.slot === slot);
  return pool[Math.floor(Math.random() * pool.length)];
}

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
    body: msg.body,
    url: msg.url,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
  };
}

export async function sendPushToOne(
  subscriptionDoc: {
    _id: string;
    endpoint: string;
    p256dh: string;
    auth: string;
  },
  payload: PushPayload
): Promise<"sent" | "expired" | "failed"> {
  const subscription = {
    endpoint: subscriptionDoc.endpoint,
    keys: {
      p256dh: subscriptionDoc.p256dh,
      auth: subscriptionDoc.auth,
    },
  };

  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return "sent";
  } catch (err: unknown) {
    const status = (err as { statusCode?: number }).statusCode;

    if (status === 404 || status === 410) {
      return "expired";
    }

    console.error(`Push send error for ${subscriptionDoc._id}:`, err);
    return "failed";
  }
}

export async function broadcastCampaign(slot: NotificationSlot): Promise<{
  sent: number;
  failed: number;
  deactivated: number;
}> {
  await connectDB();

  const msg = pickMessage(slot);
  const payload = buildPayload(msg);

  const subs = await PushSubscription.find({ isActive: true }).lean();

  console.log(`PUSH_CAMPAIGN_SUBS: active=${subs.length}, slot=${slot}`);

  let sent = 0;
  let failed = 0;
  let deactivated = 0;

  await Promise.all(
    subs.map(async (sub) => {
      const result = await sendPushToOne(
        {
          _id: sub._id.toString(),
          endpoint: sub.endpoint,
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
        payload
      );

      if (result === "sent") {
        sent++;
        await PushSubscription.updateOne(
          { _id: sub._id },
          { $set: { failCount: 0, isActive: true } }
        );
        return;
      }

      failed++;

      if (result === "expired") {
        await PushSubscription.updateOne(
          { _id: sub._id },
          { $set: { isActive: false }, $inc: { failCount: 1 } }
        );
        deactivated++;
        return;
      }

      await PushSubscription.updateOne(
        { _id: sub._id },
        { $inc: { failCount: 1 } }
      );
    })
  );

  return { sent, failed, deactivated };
}
