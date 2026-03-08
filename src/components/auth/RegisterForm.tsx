"use client";

// src/components/auth/RegisterForm.tsx
// Light warm premium registration form — Sunrise Fast Food & Juice and Ice-Cream Corner.
// On success: auto-login + immediate homepage redirect.

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    User,
    Mail,
    Lock,
    Phone,
    Calendar,
    MapPin,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    Building2,
    Hash,
    Navigation,
} from "lucide-react";

type FieldProps = {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    autoComplete?: string;
    icon: React.ReactNode;
    rightEl?: React.ReactNode;
    required?: boolean;
    colSpan?: boolean;
    optional?: boolean;
};

function Field({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    autoComplete,
    icon,
    rightEl,
    required,
    colSpan,
    optional,
}: FieldProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${colSpan ? "sm:col-span-2" : ""}`}>
            <label htmlFor={id} className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-stone-500">
                {label}
                {optional && (
                    <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[9px] font-bold normal-case tracking-normal text-stone-400">
                        optional
                    </span>
                )}
                {required && <span className="text-orange-500">*</span>}
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
                    className="w-full rounded-xl border border-amber-200 bg-amber-50/40 py-2.5 pl-10 pr-10 text-sm font-medium text-stone-800 placeholder:text-stone-400 transition-all duration-200 hover:border-amber-300 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
                />

                {rightEl && <span className="absolute right-3.5">{rightEl}</span>}
            </div>
        </div>
    );
}

function SectionHead({ emoji, title }: { emoji: string; title: string }) {
    return (
        <div className="flex items-center gap-2 pt-1">
            <span className="text-base">{emoji}</span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600">
                {title}
            </span>
            <div className="h-px flex-1 bg-amber-200/60" />
        </div>
    );
}

type FormState = {
    name: string;
    dob: string;
    email: string;
    phone: string;
    password: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
};

const INITIAL: FormState = {
    name: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
};

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = useState<FormState>(INITIAL);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const set =
        (key: keyof FormState) =>
        (v: string) =>
            setForm((f) => ({ ...f, [key]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const required: (keyof FormState)[] = [
            "name",
            "email",
            "phone",
            "password",
            "addressLine1",
            "city",
            "state",
            "pincode",
        ];

        const missing = required.filter((k) => !form[k].trim());

        if (missing.length) {
            toast.error("Please fill in all required fields ✱", {
                style: {
                    border: "1.5px solid #fca5a5",
                    borderRadius: "14px",
                },
            });
            return;
        }

        setLoading(true);

        try {
            // 1) Register user
            const registerRes = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const registerData = await registerRes.json();

            if (!registerRes.ok) {
                toast.error(registerData.message || "Registration failed. Please try again.", {
                    style: {
                        border: "1.5px solid #fca5a5",
                        borderRadius: "14px",
                        fontWeight: "700",
                        fontSize: "13px",
                    },
                });
                return;
            }

            // 2) Auto-login immediately after successful registration
            const loginRes = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email.trim(),
                    password: form.password,
                }),
            });

            const loginData = await loginRes.json();

            if (!loginRes.ok) {
                toast.success("Account created! Please sign in to continue. 🎉", {
                    duration: 2600,
                    style: {
                        background: "#fff",
                        color: "#1c1917",
                        border: "1.5px solid #fed7aa",
                        borderRadius: "16px",
                        fontWeight: "700",
                        fontSize: "13px",
                        boxShadow: "0 8px 32px rgba(249,115,22,0.18)",
                    },
                    iconTheme: { primary: "#f97316", secondary: "#fff" },
                });

                setForm(INITIAL);
                onSuccess();
                return;
            }

            // 3) Save lightweight user info for smoother navbar paint
            try {
                if (loginData?.user) {
                    localStorage.setItem(
                        "cafeapp_user",
                        JSON.stringify({
                            name: loginData.user.name ?? form.name.trim(),
                            email: loginData.user.email ?? form.email.trim(),
                            phone: loginData.user.phone ?? form.phone.trim(),
                            address: loginData.user.address ?? form.addressLine1.trim(),
                        })
                    );
                }
            } catch {}

            toast.success("🎉 Welcome to Sunrise! Your account is ready.", {
                duration: 2200,
                style: {
                    background: "#fff",
                    color: "#1c1917",
                    border: "1.5px solid #fed7aa",
                    borderRadius: "16px",
                    fontWeight: "700",
                    fontSize: "13px",
                    boxShadow: "0 8px 32px rgba(249,115,22,0.18)",
                },
                iconTheme: { primary: "#f97316", secondary: "#fff" },
            });

            setForm(INITIAL);

            setTimeout(() => {
                window.location.href = "/";
            }, 150);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <SectionHead emoji="👤" title="Personal Info" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                    id="reg-name"
                    label="Full Name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    autoComplete="name"
                    icon={<User size={14} strokeWidth={2} />}
                    required
                    colSpan
                />

                <Field
                    id="reg-phone"
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    icon={<Phone size={14} strokeWidth={2} />}
                    required
                />

                <Field
                    id="reg-dob"
                    label="Date of Birth"
                    type="date"
                    value={form.dob}
                    onChange={set("dob")}
                    placeholder=""
                    autoComplete="bday"
                    icon={<Calendar size={14} strokeWidth={2} />}
                    optional
                />
            </div>

            <SectionHead emoji="🔐" title="Account" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                    id="reg-email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                    icon={<Mail size={14} strokeWidth={2} />}
                    required
                    colSpan
                />

                <Field
                    id="reg-password"
                    label="Password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    icon={<Lock size={14} strokeWidth={2} />}
                    rightEl={
                        <button
                            type="button"
                            onClick={() => setShowPass((p) => !p)}
                            aria-label={showPass ? "Hide password" : "Show password"}
                            className="text-stone-400 transition-colors hover:text-orange-500 focus:outline-none"
                        >
                            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    }
                    required
                    colSpan
                />
            </div>

            <SectionHead emoji="📍" title="Delivery Address" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                    id="reg-addr1"
                    label="Address Line 1"
                    value={form.addressLine1}
                    onChange={set("addressLine1")}
                    placeholder="House / Flat / Building No."
                    autoComplete="address-line1"
                    icon={<MapPin size={14} strokeWidth={2} />}
                    required
                    colSpan
                />

                <Field
                    id="reg-addr2"
                    label="Address Line 2"
                    value={form.addressLine2}
                    onChange={set("addressLine2")}
                    placeholder="Street / Colony / Area"
                    autoComplete="address-line2"
                    icon={<MapPin size={14} strokeWidth={2} />}
                    optional
                    colSpan
                />

                <Field
                    id="reg-landmark"
                    label="Landmark"
                    value={form.landmark}
                    onChange={set("landmark")}
                    placeholder="Near temple, school..."
                    autoComplete="off"
                    icon={<Navigation size={14} strokeWidth={2} />}
                    optional
                    colSpan
                />

                <Field
                    id="reg-city"
                    label="City"
                    value={form.city}
                    onChange={set("city")}
                    placeholder="City"
                    autoComplete="address-level2"
                    icon={<Building2 size={14} strokeWidth={2} />}
                    required
                />

                <Field
                    id="reg-state"
                    label="State"
                    value={form.state}
                    onChange={set("state")}
                    placeholder="State"
                    autoComplete="address-level1"
                    icon={<Building2 size={14} strokeWidth={2} />}
                    required
                />

                <Field
                    id="reg-pincode"
                    label="Pincode"
                    value={form.pincode}
                    onChange={set("pincode")}
                    placeholder="000000"
                    autoComplete="postal-code"
                    icon={<Hash size={14} strokeWidth={2} />}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:brightness-110 hover:shadow-orange-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Creating your account...
                    </>
                ) : (
                    <>
                        Create My Account 🎉
                        <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </>
                )}
            </button>

            <p className="text-center text-[11px] font-medium text-stone-400">
                Join <span className="font-black text-orange-500">2,450+</span> customers already ordering with us.
            </p>
        </form>
    );
}
