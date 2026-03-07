"use client";

// src/components/products/MenuClient.tsx
// Full interactive menu experience for Sunrise Fast Food & Juice and Ice-Cream Corner

import { useState, useMemo, useCallback } from "react";
import ProductGrid from "./ProductGrid";
import {
    Search, X, ChevronDown, Flame, Zap, Leaf, Star, IceCream,
    Coffee, Pizza, Sandwich, UtensilsCrossed,
} from "lucide-react";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    isAvailable: boolean;
};

// ─── Category icon map ─────────────────────────────────────────────────────
const categoryIcons: Record<string, React.ReactNode> = {
    all: <UtensilsCrossed size={13} strokeWidth={2.5} />,
    pizza: <Pizza size={13} strokeWidth={2.5} />,
    burger: "🍔",
    sandwich: <Sandwich size={13} strokeWidth={2.5} />,
    coffee: <Coffee size={13} strokeWidth={2.5} />,
    juice: "🧃",
    shake: "🥤",
    "ice cream": <IceCream size={13} strokeWidth={2.5} />,
    momos: "🥟",
    fries: "🍟",
    pasta: "🍝",
    noodles: "🍜",
    maggi: "🍜",
    tea: "☕",
    snacks: <Flame size={13} strokeWidth={2.5} />,
    chinese: "🥡",
    pavbhaji: "🍛",
    patties: "🥙",
    combos: <Star size={13} strokeWidth={2.5} />,
};

function getCategoryIcon(cat: string) {
    const key = cat.toLowerCase();
    return categoryIcons[key] ?? "🍽️";
}

// ─── Sort options ──────────────────────────────────────────────────────────
const SORT_OPTIONS = [
    { value: "featured", label: "⭐ Featured" },
    { value: "price_asc", label: "Price: Low → High" },
    { value: "price_desc", label: "Price: High → Low" },
    { value: "name_asc", label: "Name: A → Z" },
    { value: "name_desc", label: "Name: Z → A" },
    { value: "available", label: "Available First" },
];

// ─── Trust chips ──────────────────────────────────────────────────────────
const trustChips = [
    { icon: <Flame size={11} />, label: "Made Fresh", bg: "bg-orange-100 text-orange-600 border-orange-200" },
    { icon: <Zap size={11} />, label: "Fast Service", bg: "bg-amber-100 text-amber-700 border-amber-200" },
    { icon: <Leaf size={11} />, label: "Quality Ingredients", bg: "bg-green-100 text-green-700 border-green-200" },
    { icon: <Star size={11} />, label: "Customer Favourites", bg: "bg-yellow-100 text-yellow-700 border-yellow-200" },
];

// ─── Category normalizer ──────────────────────────────────────────────────
function normalizeCategory(cat: string): string {
    return cat
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Main component ────────────────────────────────────────────────────────
export default function MenuClient({ products }: { products: Product[] }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("featured");
    const [sortOpen, setSortOpen] = useState(false);

    // Derive categories dynamically from DB data
    const categories = useMemo(() => {
        const raw = products.map((p) => normalizeCategory(p.category));
        const unique = Array.from(new Set(raw)).sort();
        return ["All", ...unique];
    }, [products]);

    // Filter + sort pipeline
    const filtered = useMemo(() => {
        let list = [...products];

        // Category filter
        if (category !== "All") {
            list = list.filter(
                (p) => normalizeCategory(p.category) === category
            );
        }

        // Search filter
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    (p.description || "").toLowerCase().includes(q)
            );
        }

        // Sort
        switch (sort) {
            case "price_asc":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                list.sort((a, b) => b.price - a.price);
                break;
            case "name_asc":
                list.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name_desc":
                list.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "available":
                list.sort((a, b) => {
                    const aOk = a.isAvailable && a.stock > 0 ? 0 : 1;
                    const bOk = b.isAvailable && b.stock > 0 ? 0 : 1;
                    return aOk - bOk;
                });
                break;
            default:
                // featured — available first, then by name
                list.sort((a, b) => {
                    const aOk = a.isAvailable && a.stock > 0 ? 0 : 1;
                    const bOk = b.isAvailable && b.stock > 0 ? 0 : 1;
                    return aOk - bOk || a.name.localeCompare(b.name);
                });
        }

        return list;
    }, [products, category, search, sort]);

    const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

    const handleCategoryChange = useCallback((cat: string) => {
        setCategory(cat);
        setSearch("");
    }, []);

    const handleReset = useCallback(() => {
        setSearch("");
        setCategory("All");
        setSort("featured");
    }, []);

    return (
        <main className="min-h-screen bg-[#FFFBF5]">

            {/* ── HERO ────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden">

                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" />
                <div
                    className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-20 blur-3xl"
                    style={{ background: "radial-gradient(ellipse, #fb923c 0%, #fbbf24 60%, transparent 100%)" }}
                />
                <div
                    className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-15 blur-3xl"
                    style={{ background: "radial-gradient(ellipse, #f97316 0%, #fcd34d 60%, transparent 100%)" }}
                />

                {/* Decorative dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #92400e 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">

                    {/* Eyebrow */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
                        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-600">
                            Sunrise Specials
                        </span>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-stone-900 md:text-4xl lg:text-5xl">
                                <span className="text-transparent"
                                    style={{
                                        WebkitTextStroke: "2px transparent",
                                        background: "linear-gradient(135deg, #ea580c 0%, #d97706 50%, #dc2626 100%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                    }}
                                >Hot &amp; Fresh</span>
                                <br />
                                <span className="text-stone-900">Made for Every Craving</span>
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-stone-500 md:text-base">
                                From cheesy burgers &amp; crispy fries to chilled shakes &amp; fresh juices —
                                everything hot, fast, and delicious. 🔥
                            </p>

                            {/* Trust chips */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {trustChips.map((c) => (
                                    <span
                                        key={c.label}
                                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${c.bg}`}
                                    >
                                        {c.icon}
                                        {c.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Decorative food emoji cluster — desktop */}
                        <div className="hidden shrink-0 select-none md:block">
                            <div className="relative h-32 w-40">
                                {["🍕", "🍔", "🧃", "🍦", "🥟", "☕"].map((em, i) => {
                                    const positions = [
                                        "top-0 left-4",
                                        "top-0 right-0",
                                        "top-10 left-0",
                                        "top-12 left-16",
                                        "bottom-0 left-6",
                                        "bottom-2 right-2",
                                    ];
                                    const sizes = ["text-4xl", "text-3xl", "text-2xl", "text-3xl", "text-3xl", "text-2xl"];
                                    return (
                                        <span
                                            key={i}
                                            className={`absolute ${positions[i]} ${sizes[i]} drop-shadow-sm`}
                                            style={{
                                                animation: `float${i % 3} ${3 + i * 0.4}s ease-in-out infinite`,
                                            }}
                                        >
                                            {em}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONTROLS BAR ──────────────────────────────────────────── */}
            <div className="sticky top-[0px] z-30 border-b border-amber-100 bg-[#FFFBF5]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(251,146,60,0.08)]">
                <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">

                    {/* Search + Sort row */}
                    <div className="flex items-center gap-2.5">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                                strokeWidth={2.5}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search pizza, burger, juice…"
                                className="w-full rounded-xl border border-amber-200 bg-white py-2.5 pl-9 pr-9 text-sm text-stone-700 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-stone-400 hover:text-orange-500 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <X size={14} strokeWidth={2.5} />
                                </button>
                            )}
                        </div>

                        {/* Sort */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setSortOpen((o) => !o)}
                                className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-xs font-semibold text-stone-600 shadow-sm hover:border-orange-300 hover:bg-amber-50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-200"
                            >
                                <span className="hidden sm:inline max-w-[90px] truncate">{sortLabel}</span>
                                <span className="sm:hidden">Sort</span>
                                <ChevronDown
                                    size={12}
                                    strokeWidth={2.5}
                                    className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {sortOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setSortOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full z-20 mt-1.5 w-52 overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-xl shadow-orange-100/60">
                                        {SORT_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => { setSort(opt.value); setSortOpen(false); }}
                                                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${sort === opt.value
                                                        ? "bg-orange-50 text-orange-600 font-bold"
                                                        : "text-stone-600 hover:bg-amber-50 hover:text-stone-800"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Item count pill */}
                        <div className="hidden shrink-0 items-center gap-1 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 sm:flex">
                            <span className="text-sm font-black text-orange-500">{filtered.length}</span>
                            <span className="text-xs text-stone-400 font-medium">items</span>
                        </div>
                    </div>

                    {/* Category pills */}
                    <div className="no-scrollbar mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5">
                        {categories.map((cat) => {
                            const active = cat === category;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ${active
                                            ? "border-orange-400 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200"
                                            : "border-stone-200 bg-white text-stone-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                                        }`}
                                >
                                    <span className="text-[12px] leading-none">{getCategoryIcon(cat)}</span>
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── PRODUCT GRID ──────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
                <ProductGrid
                    products={filtered}
                    onReset={handleReset}
                    hasFilters={search.trim() !== "" || category !== "All"}
                />
            </section>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes float0 { 0%, 100% { transform: translateY(0px) rotate(-3deg); } 50% { transform: translateY(-6px) rotate(3deg); } }
                @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(2deg); } 50% { transform: translateY(-8px) rotate(-2deg); } }
                @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
            `}</style>
        </main>
    );
}