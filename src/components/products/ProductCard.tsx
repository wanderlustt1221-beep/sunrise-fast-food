"use client";

// src/components/products/ProductCard.tsx

import { toast } from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Flame, Star, BadgeCheck, Plus } from "lucide-react";
import { useState } from "react";

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

// Deterministic badge based on product id — stable across renders
function getProductBadge(id: string): { label: string; color: string; icon: React.ReactNode } | null {
    const n = parseInt(id.slice(-2), 16) % 5;
    if (n === 0) return {
        label: "🔥 Hot Pick",
        icon: <Flame size={9} strokeWidth={3} />,
        color: "bg-red-500 text-white",
    };
    if (n === 1) return {
        label: "⭐ Chef's Pick",
        icon: <Star size={9} strokeWidth={3} />,
        color: "bg-amber-400 text-stone-900",
    };
    if (n === 2) return {
        label: "✓ Fan Favourite",
        icon: <BadgeCheck size={9} strokeWidth={3} />,
        color: "bg-orange-500 text-white",
    };
    // n === 3 or 4: no badge — keeps it from feeling too cluttered
    return null;
}

function normalizeCategory(cat: string): string {
    return cat.trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ProductCard({
    product,
    index = 0,
}: {
    product: Product;
    index?: number;
}) {
    const addItem = useCartStore((state) => state.addItem);
    const isUnavailable = !product.isAvailable || product.stock <= 0;
    const badge = getProductBadge(product._id);
    const [imgError, setImgError] = useState(false);
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {
        if (isUnavailable) {
            toast.error("This item is currently unavailable");
            return;
        }
        setAdding(true);
        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            stock: product.stock,
            category: product.category,
        });
        toast.success(`${product.name} added! 🛒`, {
            style: {
                background: "#fff7ed",
                color: "#7c2d12",
                border: "1px solid #fed7aa",
                borderRadius: "14px",
            },
            iconTheme: { primary: "#f97316", secondary: "#fff7ed" },
        });
        setTimeout(() => setAdding(false), 600);
    };

    return (
        <article
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 sm:rounded-3xl ${
                isUnavailable
                    ? "border-stone-200 opacity-70 shadow-sm"
                    : "border-amber-100 shadow-sm hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/60"
            }`}
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {/* ── Image ── */}
            <div className="relative h-36 w-full shrink-0 overflow-hidden bg-amber-50 sm:h-44 md:h-48">
                {!imgError ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={() => setImgError(true)}
                        className={`h-full w-full object-cover transition-transform duration-500 ${
                            isUnavailable ? "grayscale-[50%]" : "group-hover:scale-[1.07]"
                        }`}
                        loading="lazy"
                    />
                ) : (
                    // Fallback when image 404s
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                        <span className="text-5xl opacity-60">🍽️</span>
                    </div>
                )}

                {/* Soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Unavailable overlay */}
                {isUnavailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                        <span className="rounded-full border border-stone-300 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-stone-500 shadow-sm">
                            Unavailable
                        </span>
                    </div>
                )}

                {/* Badge */}
                {badge && !isUnavailable && (
                    <div className={`absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black shadow-md sm:text-[10px] ${badge.color}`}>
                        {badge.label}
                    </div>
                )}

                {/* Price overlay on mobile */}
                <div className="absolute bottom-2 right-2">
                    <span className="rounded-lg bg-white/90 px-2 py-0.5 text-sm font-black text-orange-600 shadow-sm backdrop-blur-sm sm:hidden">
                        ₹{product.price}
                    </span>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex flex-1 flex-col p-3 sm:p-4">

                {/* Category + stock */}
                <div className="mb-2 flex items-center justify-between gap-1">
                    <span className="truncate rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-orange-500 sm:text-[10px]">
                        {normalizeCategory(product.category)}
                    </span>
                    <span
                        className={`flex shrink-0 items-center gap-1 text-[9px] font-bold sm:text-[10px] ${
                            !isUnavailable ? "text-green-600" : "text-red-400"
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${
                                !isUnavailable ? "bg-green-500" : "bg-red-400"
                            }`}
                        />
                        {!isUnavailable ? "Available" : "Out of Stock"}
                    </span>
                </div>

                {/* Name */}
                <h3 className="line-clamp-2 text-sm font-black leading-snug text-stone-800 sm:text-[0.95rem] md:text-base">
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="mt-1 hidden line-clamp-1 text-[11px] leading-relaxed text-stone-400 sm:block">
                        {product.description}
                    </p>
                )}

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    {/* Price — hidden on mobile (shown in image overlay) */}
                    <p className="hidden font-black text-lg text-orange-600 sm:block md:text-xl">
                        ₹{product.price}
                    </p>
                    {/* Mobile price row */}
                    <p className="font-black text-sm text-orange-600 sm:hidden">
                        ₹{product.price}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        disabled={isUnavailable || adding}
                        aria-label={`Add ${product.name} to cart`}
                        className={`group/btn flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-black transition-all duration-200 sm:gap-1.5 sm:rounded-xl sm:px-3.5 sm:text-xs ${
                            isUnavailable
                                ? "cursor-not-allowed border border-stone-200 bg-stone-100 text-stone-400"
                                : adding
                                ? "bg-green-500 text-white shadow-md shadow-green-200 scale-95"
                                : "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200 hover:brightness-110 hover:shadow-orange-300 active:scale-95"
                        }`}
                    >
                        {adding ? (
                            <>
                                <span className="text-xs">✓</span>
                                <span className="hidden sm:inline">Added!</span>
                            </>
                        ) : isUnavailable ? (
                            <>
                                <ShoppingCart size={11} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Sold Out</span>
                            </>
                        ) : (
                            <>
                                <Plus
                                    size={12}
                                    strokeWidth={3}
                                    className="transition-transform duration-200 group-hover/btn:scale-125"
                                />
                                <span className="hidden sm:inline">Add</span>
                                <ShoppingCart size={11} strokeWidth={2.5} className="sm:hidden" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}