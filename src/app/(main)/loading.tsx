export default function Loading() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#FEF3E2]">
            {/* ── Keyframes ── */}
            <style>{`
                @keyframes shimmer {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes shimmerSlow {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes floatDot {
                    0%, 100% { opacity: 0.35; transform: translateY(0); }
                    50%       { opacity: 1;    transform: translateY(-4px); }
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.18; }
                    50%       { opacity: 0.32; }
                }
                .sk-shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .sk-shimmer::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 30%,
                        rgba(255,255,255,0.72) 50%,
                        transparent 70%
                    );
                    animation: shimmer 1.7s ease-in-out infinite;
                }
                .sk-shimmer-slow::after {
                    animation-duration: 2.2s;
                }
                .dot-bounce {
                    display: inline-block;
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #F97316;
                    animation: floatDot 1.1s ease-in-out infinite;
                }
                .dot-bounce:nth-child(2) { animation-delay: 0.18s; }
                .dot-bounce:nth-child(3) { animation-delay: 0.36s; }
                .orb-glow {
                    animation: glowPulse 3s ease-in-out infinite;
                }
            `}</style>

            {/* ── Ambient orbs ── */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="orb-glow absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-amber-300 blur-3xl" />
                <div className="orb-glow absolute top-1/2 -right-32 h-[380px] w-[380px] rounded-full bg-orange-300 blur-3xl" style={{ animationDelay: "1.4s" }} />
                <div className="orb-glow absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-yellow-200 blur-3xl" style={{ animationDelay: "0.7s" }} />
            </div>

            {/* ══════════════════════════════════════════
                NAV SKELETON
            ══════════════════════════════════════════ */}
            <nav className="sticky top-0 z-40 border-b border-amber-200 bg-[#FEF3E2]/90 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
                    {/* Logo */}
                    <div className="sk-shimmer h-8 w-36 rounded-xl bg-amber-200" />
                    {/* Nav links — desktop */}
                    <div className="hidden items-center gap-6 md:flex">
                        {[56, 48, 64, 52].map((w, i) => (
                            <div
                                key={i}
                                className="sk-shimmer h-4 rounded bg-stone-200"
                                style={{ width: w, animationDelay: `${i * 60}ms` }}
                            />
                        ))}
                    </div>
                    {/* CTA + cart */}
                    <div className="flex items-center gap-3">
                        <div className="sk-shimmer h-9 w-9 rounded-full bg-amber-200" />
                        <div className="sk-shimmer h-9 w-24 rounded-xl bg-orange-200" />
                    </div>
                </div>
            </nav>

            <div className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8">

                {/* ══════════════════════════════════════════
                    BRANDED LOADING MESSAGE
                ══════════════════════════════════════════ */}
                <div className="flex flex-col items-center py-8 md:py-10">
                    <p className="mb-3 text-sm font-medium tracking-widest text-amber-600 uppercase">
                        Sunrise Fast Food &amp; Juice Corner
                    </p>
                    <p className="text-center text-lg font-semibold text-stone-600 md:text-xl">
                        Sunrise specials are almost ready
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="dot-bounce" />
                        <span className="dot-bounce" />
                        <span className="dot-bounce" />
                    </div>
                </div>

                {/* ══════════════════════════════════════════
                    HERO SKELETON
                ══════════════════════════════════════════ */}
                <section className="mb-6">
                    <div className="overflow-hidden rounded-[2rem] border border-amber-200 bg-white shadow-md md:rounded-[2.5rem]">
                        {/* Hero image zone */}
                        <div
                            className="sk-shimmer sk-shimmer-slow relative bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100"
                            style={{ height: 380 }}
                        >
                            {/* Decorative plate hint */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-32 w-32 animate-pulse rounded-full bg-amber-200/50 md:h-44 md:w-44" />
                            </div>
                        </div>

                        {/* Hero text content */}
                        <div className="p-5 md:p-7">
                            {/* Eyebrow badge */}
                            <div
                                className="sk-shimmer mb-4 h-7 w-40 rounded-full bg-amber-200"
                                style={{ animationDelay: "60ms" }}
                            />

                            {/* Headline */}
                            <div className="mb-2.5 space-y-2.5">
                                <div
                                    className="sk-shimmer h-10 w-[72%] rounded-xl bg-amber-200 md:h-12"
                                    style={{ animationDelay: "100ms" }}
                                />
                                <div
                                    className="sk-shimmer h-10 w-[50%] rounded-xl bg-amber-200/70 md:h-12"
                                    style={{ animationDelay: "140ms" }}
                                />
                            </div>

                            {/* Supporting text */}
                            <div className="mt-4 space-y-2">
                                <div
                                    className="sk-shimmer h-4 w-full max-w-md rounded bg-stone-200"
                                    style={{ animationDelay: "180ms" }}
                                />
                                <div
                                    className="sk-shimmer h-4 w-[60%] max-w-xs rounded bg-stone-200"
                                    style={{ animationDelay: "210ms" }}
                                />
                            </div>

                            {/* CTA buttons */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                <div
                                    className="sk-shimmer h-12 w-40 rounded-2xl bg-gradient-to-r from-orange-200 to-amber-200"
                                    style={{ animationDelay: "240ms" }}
                                />
                                <div
                                    className="sk-shimmer h-12 w-36 rounded-2xl bg-stone-200"
                                    style={{ animationDelay: "280ms" }}
                                />
                            </div>

                            {/* Trust chips */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {[88, 100, 76, 92].map((w, i) => (
                                    <div
                                        key={i}
                                        className="sk-shimmer h-8 rounded-full bg-amber-100 border border-amber-200"
                                        style={{ width: w, animationDelay: `${320 + i * 55}ms` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section divider */}
                <SectionDivider />

                {/* ══════════════════════════════════════════
                    STATS / TRUST STRIP
                ══════════════════════════════════════════ */}
                <section className="mb-6">
                    <div className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">
                        <div className="grid grid-cols-2 gap-px bg-amber-100 md:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white px-5 py-5"
                                    style={{ animationDelay: `${i * 70}ms` }}
                                >
                                    <div
                                        className="sk-shimmer h-11 w-11 flex-shrink-0 rounded-2xl bg-amber-200"
                                        style={{ animationDelay: `${i * 70}ms` }}
                                    />
                                    <div className="flex-1 space-y-2">
                                        <div
                                            className="sk-shimmer h-5 w-16 rounded bg-orange-200"
                                            style={{ animationDelay: `${i * 70 + 40}ms` }}
                                        />
                                        <div
                                            className="sk-shimmer h-3 w-24 rounded bg-stone-200"
                                            style={{ animationDelay: `${i * 70 + 70}ms` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section divider */}
                <SectionDivider />

                {/* ══════════════════════════════════════════
                    FEATURED PRODUCTS SECTION
                ══════════════════════════════════════════ */}
                <section className="mb-6">
                    {/* Section header */}
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <div
                                className="sk-shimmer mb-2 h-5 w-24 rounded-full bg-amber-200"
                                style={{ animationDelay: "40ms" }}
                            />
                            <div
                                className="sk-shimmer h-8 w-52 rounded-xl bg-orange-200"
                                style={{ animationDelay: "80ms" }}
                            />
                        </div>
                        <div
                            className="sk-shimmer h-10 w-28 rounded-2xl bg-stone-200"
                            style={{ animationDelay: "120ms" }}
                        />
                    </div>

                    {/* Product card grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <FoodCardSkeleton key={i} delay={i * 70} />
                        ))}
                    </div>
                </section>

                {/* Section divider */}
                <SectionDivider />

                {/* ══════════════════════════════════════════
                    SECONDARY SECTION PLACEHOLDER
                    (e.g. Categories / Specials / Offers)
                ══════════════════════════════════════════ */}
                <section className="mb-6">
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <div className="sk-shimmer mb-2 h-4 w-20 rounded-full bg-amber-200" />
                            <div className="sk-shimmer h-8 w-44 rounded-xl bg-stone-200" style={{ animationDelay: "50ms" }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="sk-shimmer flex flex-col items-center overflow-hidden rounded-3xl border border-amber-200 bg-white py-5 shadow-sm"
                                style={{ animationDelay: `${i * 55}ms` }}
                            >
                                <div className="mb-3 h-14 w-14 animate-pulse rounded-full bg-amber-100" />
                                <div className="h-3.5 w-16 animate-pulse rounded bg-stone-200" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    BOTTOM BRAND PULSE
                ══════════════════════════════════════════ */}
                <div className="mt-10 flex items-center justify-center gap-2 opacity-50">
                    {[20, 32, 20].map((w, i) => (
                        <div
                            key={i}
                            className="h-1.5 rounded-full bg-amber-400 animate-pulse"
                            style={{ width: w, animationDelay: `${i * 220}ms` }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

/* ── Food card skeleton ── */
function FoodCardSkeleton({ delay }: { delay: number }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-md">
            {/* Image zone */}
            <div
                className="sk-shimmer relative bg-gradient-to-br from-amber-100 to-orange-100"
                style={{ height: 148 }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 animate-pulse rounded-full bg-amber-200/60" />
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-3 sm:p-4">
                {/* Category chip */}
                <div
                    className="sk-shimmer mb-2.5 h-5 w-16 rounded-full bg-orange-200"
                    style={{ animationDelay: `${delay + 40}ms` }}
                />
                {/* Title */}
                <div
                    className="sk-shimmer mb-1.5 h-4 w-[82%] rounded bg-stone-200"
                    style={{ animationDelay: `${delay + 75}ms` }}
                />
                <div
                    className="sk-shimmer mb-3 h-4 w-[52%] rounded bg-stone-200/75"
                    style={{ animationDelay: `${delay + 95}ms` }}
                />
                {/* Description */}
                <div
                    className="sk-shimmer mb-1 h-3 w-full rounded bg-stone-200/65"
                    style={{ animationDelay: `${delay + 115}ms` }}
                />
                <div
                    className="sk-shimmer h-3 w-[68%] rounded bg-stone-200/55"
                    style={{ animationDelay: `${delay + 130}ms` }}
                />

                <div className="flex-1" />

                {/* Price + CTA */}
                <div className="mt-4 flex items-center justify-between gap-2">
                    <div
                        className="sk-shimmer h-6 w-14 rounded-lg bg-amber-200"
                        style={{ animationDelay: `${delay + 150}ms` }}
                    />
                    <div
                        className="sk-shimmer h-9 w-[46%] rounded-xl bg-gradient-to-r from-orange-200 to-amber-200"
                        style={{ animationDelay: `${delay + 170}ms` }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ── Decorative section divider ── */
function SectionDivider() {
    return (
        <div className="my-6 flex items-center gap-3 md:my-8">
            <div className="h-px flex-1 bg-amber-200" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            <div className="h-px flex-1 bg-amber-200" />
        </div>
    );
}