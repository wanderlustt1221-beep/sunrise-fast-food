"use client";

// src/components/auth/LoginForm.tsx
// Light warm premium login form — Sunrise Fast Food & Juice and Ice-Cream Corner.
// Robust redirect: intended destination > homepage. Admin-safe.

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

type LoginFormProps = { redirectTo?: string };

type FieldProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    autoComplete?: string;
    icon: React.ReactNode;
    rightEl?: React.ReactNode;
    required?: boolean;
};

function Field({ id, label, type, value, onChange, placeholder, autoComplete, icon, rightEl, required }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">
                {label}
            </label>
            <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3.5 text-stone-400">
                    {icon}
                </span>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    className="w-full rounded-xl border border-amber-200 bg-amber-50/40 py-3 pl-10 pr-10 text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-amber-300"
                />
                {rightEl && <span className="absolute right-3.5">{rightEl}</span>}
            </div>
        </div>
    );
}

export default function LoginForm({ redirectTo = "/" }: LoginFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading]   = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Login failed. Please try again.");
                return;
            }

            // ── Premium success toast ──────────────────────────────────
            toast.success("Welcome back! 🌅 Order your favourites.", {
                duration: 3500,
                style: {
                    background: "#fff",
                    color: "#1c1917",
                    border: "1.5px solid #fed7aa",
                    borderRadius: "16px",
                    fontWeight: "700",
                    fontSize: "13px",
                    boxShadow: "0 8px 24px rgba(249,115,22,0.15)",
                },
                iconTheme: { primary: "#f97316", secondary: "#fff" },
            });

            // ── Robust redirect logic ──────────────────────────────────
            const role     = data.user?.role ?? "user";
            // Prefer query param redirect > prop redirect > "/"
            const qParam   = searchParams.get("redirect");
            const intended = qParam || redirectTo;

            if (role === "admin") {
                // Admin: go to admin area, or their intended admin page
                const dest = intended?.startsWith("/admin") ? intended : "/admin";
                router.push(dest);
            } else {
                // Normal user: go to intended page, but NEVER /admin
                const dest =
                    intended && intended !== "/" && !intended.startsWith("/admin") && !intended.startsWith("/auth")
                        ? intended
                        : "/";
                router.push(dest);
            }

        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            <Field
                id="login-email"
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                autoComplete="email"
                icon={<Mail size={15} strokeWidth={2} />}
                required
            />

            <Field
                id="login-password"
                label="Password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                autoComplete="current-password"
                icon={<Lock size={15} strokeWidth={2} />}
                rightEl={
                    <button
                        type="button"
                        onClick={() => setShowPass((p) => !p)}
                        aria-label={showPass ? "Hide password" : "Show password"}
                        className="text-stone-400 transition-colors hover:text-orange-500 focus:outline-none"
                    >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                }
                required
            />

            {/* Forgot password */}
            <div className="-mt-1 flex justify-end">
                <a
                    href="#"
                    className="text-[11px] font-bold text-stone-400 underline underline-offset-2 transition-colors hover:text-orange-500"
                >
                    Forgot password?
                </a>
            </div>

            {/* CTA */}
            <button
                type="submit"
                disabled={loading}
                className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:brightness-110 hover:shadow-orange-300 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <>
                        Sign In to Your Account
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-300" />
                    </>
                )}
            </button>

            {/* Microcopy */}
            <p className="text-center text-[11px] font-medium text-stone-400">
                🍽️ Fresh food. Faster ordering. Made for you.
            </p>
        </form>
    );
}