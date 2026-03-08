"use client";

// src/components/auth/LoginForm.tsx
// Light warm premium login form — Sunrise Fast Food & Juice and Ice-Cream Corner.
// Faster-feel auth redirect using window.location.href for immediate navigation.

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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

function Field({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    autoComplete,
    icon,
    rightEl,
    required,
}: FieldProps) {
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
                    className="w-full rounded-xl border border-amber-200 bg-amber-50/40 py-3 pl-10 pr-10 text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all duration-200 hover:border-amber-300 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
                />

                {rightEl && <span className="absolute right-3.5">{rightEl}</span>}
            </div>
        </div>
    );
}

export default function LoginForm({ redirectTo = "/" }: LoginFormProps) {
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Login failed. Please try again.");
                return;
            }

            // Save lightweight user info immediately for smoother next-page navbar hydration
            try {
                if (data?.user) {
                    localStorage.setItem(
                        "cafeapp_user",
                        JSON.stringify({
                            name: data.user.name ?? "",
                            email: data.user.email ?? "",
                            phone: data.user.phone ?? "",
                            address: data.user.address ?? "",
                        })
                    );
                }
            } catch {}

            toast.success("Welcome back! 🌅 Redirecting you now...", {
                duration: 2200,
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

            const role = data.user?.role ?? "user";
            const qParam = searchParams.get("redirect");
            const intended = qParam || redirectTo;

            let dest = "/";

            if (role === "admin") {
                dest = intended?.startsWith("/admin") ? intended : "/admin";
            } else {
                dest =
                    intended &&
                    intended !== "/" &&
                    !intended.startsWith("/admin") &&
                    !intended.startsWith("/auth")
                        ? intended
                        : "/";
            }

            // Slightly defer so toast paints, then hard navigate for immediate-feel auth transition
            setTimeout(() => {
                window.location.href = dest;
            }, 150);
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

            <div className="-mt-1 flex justify-end">
                <a
                    href="#"
                    className="text-[11px] font-bold text-stone-400 underline underline-offset-2 transition-colors hover:text-orange-500"
                >
                    Forgot password?
                </a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:brightness-110 hover:shadow-orange-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Signing you in...
                    </>
                ) : (
                    <>
                        Sign In to Your Account
                        <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </>
                )}
            </button>

            <p className="text-center text-[11px] font-medium text-stone-400">
                🍽️ Fresh food. Faster ordering. Made for you.
            </p>
        </form>
    );
}
