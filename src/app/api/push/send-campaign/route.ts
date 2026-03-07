// src/app/api/push/send-campaign/route.ts
// POST — cron-triggered route to send scheduled push notifications.
//
// Protected by CRON_SECRET env var. Call this from:
// - Vercel Cron Jobs (vercel.json)
// - GitHub Actions
// - Any external cron service (cron-job.org, EasyCron, etc.)
//
// Schedule suggestion (2 pushes/day, 10AM–8PM):
//   Slot "morning" → trigger at 11:30 AM IST  (06:00 UTC)
//   Slot "evening" → trigger at 05:30 PM IST  (12:00 UTC)
//
// To add a 3rd push later, add another cron trigger for slot "evening" at 7PM.

import { NextRequest, NextResponse } from "next/server";
import { broadcastCampaign, type NotificationSlot } from "@/lib/webpush";

// ── IST time helpers ──────────────────────────────────────────────────────
function getISTHour(): number {
    const now = new Date();
    // IST = UTC + 5:30
    const istOffset = 5.5 * 60 * 60 * 1000;
    const ist = new Date(now.getTime() + istOffset);
    return ist.getUTCHours();
}

export async function POST(req: NextRequest) {
    try {
        // ── Auth: verify cron secret ──────────────────────────────────────
        const authHeader = req.headers.get("authorization");
        const expected   = `Bearer ${process.env.CRON_SECRET}`;

        if (!process.env.CRON_SECRET || authHeader !== expected) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // ── Time guard: only allow 10:00 AM – 8:00 PM IST ─────────────────
        const istHour = getISTHour();
        if (istHour < 10 || istHour >= 20) {
            return NextResponse.json({
                success: false,
                message: `Outside allowed hours (IST hour: ${istHour}). Allowed: 10–20.`,
            });
        }

        // ── Determine slot from query param or body ────────────────────────
        const body = await req.json().catch(() => ({}));
        const slot: NotificationSlot =
            (body.slot === "morning" || body.slot === "evening")
                ? body.slot
                : istHour < 14 ? "morning" : "evening";

        // ── Broadcast ────────────────────────────────────────────────────
        const result = await broadcastCampaign(slot);

        return NextResponse.json({
            success: true,
            slot,
            istHour,
            ...result,
        });
    } catch (error) {
        console.error("PUSH_CAMPAIGN_ERROR", error);
        return NextResponse.json(
            { success: false, message: "Campaign failed" },
            { status: 500 }
        );
    }
}

// Also support GET so Vercel Cron can call it (Vercel Cron uses GET by default)
export async function GET(req: NextRequest) {
    return POST(req);
}