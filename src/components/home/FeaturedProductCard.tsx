"use client";

// src/components/home/FeaturedProductCard.tsx
// Client component — needed because of the onError image handler.

import Link from "next/link";
import { ShoppingCart, TrendingUp } from "lucide-react";
import type { HomeProduct } from "@/app/(main)/page";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&auto=format&fit=crop";

export default function FeaturedProductCard({ product }: { product: HomeProduct }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-0.5">
            <div className="relative h-44 w-full overflow-hidden bg-amber-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-stone-700 backdrop-blur-sm">
                    {product.category}
                </span>
                {product.isFeatured && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 text-[10px] font-black text-white shadow-md">
                        <TrendingUp size={9} strokeWidth={3} /> Popular
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 text-sm font-black text-stone-900 md:text-base">
                    {product.name}
                </h3>
                {(product.shortDescription || product.description) && (
                    <p className="mt-1 line-clamp-1 text-[11px] text-stone-400">
                        {product.shortDescription || product.description}
                    </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-3">
                    <p className="text-xl font-black text-orange-600">₹{product.price}</p>
                    <Link
                        href="/menu"
                        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-black text-white shadow-sm shadow-orange-200 transition-all hover:brightness-110 active:scale-95"
                    >
                        <ShoppingCart size={11} strokeWidth={2.5} />
                        Order
                    </Link>
                </div>
            </div>
        </div>
    );
}