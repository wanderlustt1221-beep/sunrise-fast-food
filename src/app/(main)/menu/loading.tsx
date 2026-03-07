export default function Loading() {
    return (
        <main className="min-h-screen bg-[#FEF3E2] overflow-x-hidden">
            {/* ── Shimmer keyframe ── */}
            <style>{`
                @keyframes shimmer {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes shimmerFast {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                .shimmer-sweep::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 35%,
                        rgba(255,255,255,0.7) 50%,
                        transparent 65%
                    );
                    animation: shimmer 1.6s ease-in-out infinite;
                }
                .shimmer-fast::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 30%,
                        rgba(255,255,255,0.6) 50%,
                        transparent 70%
                    );
                    animation: shimmerFast 1.4s ease-in-out infinite;
                }
            `}</style>

            {/* ── Decorative ambient orbs ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 overflow-hidden"
            >
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-300 opacity-25 blur-3xl" />
                <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-orange-300 opacity-25 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">

                {/* ════════════════════════════════
                    HERO SKELETON
                ════════════════════════════════ */}
                <section className="mb-10 md:mb-14">

                    {/* Eyebrow badge */}
                    <div
                        className="relative mb-4 h-7 w-36 overflow-hidden rounded-full bg-amber-200 shimmer-sweep"
                        style={{ animationDelay: "0ms" }}
                    />

                    {/* Main heading — two lines on mobile */}
                    <div className="mb-2 space-y-2.5">
                        <div
                            className="relative h-9 w-[70%] max-w-sm overflow-hidden rounded-xl bg-amber-200 shimmer-sweep sm:h-11 md:w-[55%]"
                            style={{ animationDelay: "80ms" }}
                        />
                        <div
                            className="relative h-9 w-[45%] max-w-xs overflow-hidden rounded-xl bg-amber-200/80 shimmer-sweep sm:h-11"
                            style={{ animationDelay: "140ms" }}
                        />
                    </div>

                    {/* Sub-heading */}
                    <div className="mt-4 space-y-2">
                        <div
                            className="relative h-4 w-full max-w-lg overflow-hidden rounded bg-stone-200 shimmer-fast"
                            style={{ animationDelay: "200ms" }}
                        />
                        <div
                            className="relative h-4 w-[65%] max-w-sm overflow-hidden rounded bg-stone-200 shimmer-fast"
                            style={{ animationDelay: "240ms" }}
                        />
                    </div>

                    {/* Trust / info chips row */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                        {[80, 96, 72, 88].map((w, i) => (
                            <div
                                key={i}
                                className="relative h-8 overflow-hidden rounded-full bg-orange-200 shimmer-sweep"
                                style={{ width: w, animationDelay: `${300 + i * 60}ms` }}
                            />
                        ))}
                    </div>
                </section>

                {/* ════════════════════════════════
                    CONTROLS SKELETON
                ════════════════════════════════ */}
                <section className="mb-6 space-y-3">

                    {/* Search + Sort row */}
                    <div className="flex gap-3">
                        {/* Search bar */}
                        <div
                            className="relative flex-1 overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm shimmer-fast"
                            style={{ height: 48 }}
                        >
                            <div className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-stone-300 animate-pulse" />
                            <div className="absolute left-12 top-1/2 h-3 w-36 -translate-y-1/2 rounded bg-stone-200 animate-pulse" />
                        </div>
                        {/* Sort button */}
                        <div className="relative h-12 w-24 overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm shimmer-fast" />
                    </div>

                    {/* Category chips horizontal scroll */}
                    <div className="flex gap-2.5 overflow-hidden">
                        {[68, 84, 76, 92, 72, 80].map((w, i) => (
                            <div
                                key={i}
                                className="relative h-9 flex-shrink-0 overflow-hidden rounded-full bg-amber-100 border border-amber-200 shimmer-sweep"
                                style={{ width: w, animationDelay: `${i * 50}ms` }}
                            />
                        ))}
                    </div>
                </section>

                {/* ════════════════════════════════
                    PRODUCT GRID SKELETON
                ════════════════════════════════ */}
                <section>
                    {/* Section label */}
                    <div className="mb-4 flex items-center gap-3">
                        <div className="relative h-5 w-28 overflow-hidden rounded bg-stone-200 shimmer-fast" />
                        <div className="h-px flex-1 bg-amber-200" />
                        <div className="relative h-4 w-16 overflow-hidden rounded bg-stone-200 shimmer-fast" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} delay={i * 60} />
                        ))}
                    </div>
                </section>

                {/* ════════════════════════════════
                    BOTTOM DECORATIVE STRIP
                ════════════════════════════════ */}
                <div className="mt-12 flex items-center justify-center gap-2 opacity-60">
                    {[16, 24, 16].map((w, i) => (
                        <div
                            key={i}
                            className="h-1.5 rounded-full bg-amber-400 animate-pulse"
                            style={{ width: w, animationDelay: `${i * 200}ms` }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

/* ── Individual product card skeleton ── */
function ProductCardSkeleton({ delay }: { delay: number }) {
    return (
        <div
            className="flex flex-col overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-md"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Image zone */}
            <div
                className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 shimmer-sweep"
                style={{ height: 148 }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-amber-200/70 animate-pulse" />
                </div>
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-3 sm:p-4">
                {/* Category chip */}
                <div
                    className="relative mb-2.5 h-5 w-16 overflow-hidden rounded-full bg-orange-200 shimmer-fast"
                    style={{ animationDelay: `${delay + 40}ms` }}
                />

                {/* Product title */}
                <div
                    className="relative mb-1.5 h-4 w-[85%] overflow-hidden rounded bg-stone-200 shimmer-fast"
                    style={{ animationDelay: `${delay + 80}ms` }}
                />
                <div
                    className="relative mb-3 h-4 w-[55%] overflow-hidden rounded bg-stone-200/80 shimmer-fast"
                    style={{ animationDelay: `${delay + 100}ms` }}
                />

                {/* Description */}
                <div
                    className="relative mb-1 h-3 w-full overflow-hidden rounded bg-stone-200/70 shimmer-fast"
                    style={{ animationDelay: `${delay + 120}ms` }}
                />
                <div
                    className="relative h-3 w-[70%] overflow-hidden rounded bg-stone-200/60 shimmer-fast"
                    style={{ animationDelay: `${delay + 140}ms` }}
                />

                <div className="flex-1" />

                {/* Price + CTA */}
                <div className="mt-4 flex items-center justify-between gap-2">
                    <div
                        className="relative h-6 w-14 overflow-hidden rounded-lg bg-amber-200 shimmer-sweep"
                        style={{ animationDelay: `${delay + 160}ms` }}
                    />
                    <div
                        className="relative h-9 w-[46%] overflow-hidden rounded-xl bg-gradient-to-r from-orange-200 to-amber-200 shimmer-sweep"
                        style={{ animationDelay: `${delay + 180}ms` }}
                    />
                </div>
            </div>
        </div>
    );
}