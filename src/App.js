import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Phone, MapPin, Mail, Repeat, CheckCircle } from 'lucide-react';

// LiftPad Pro — full single-file React component with touch swipe + infinite carousel
// Tailwind CSS + Framer Motion assumed available

const THEME = {
    primary: '#e6b800',
    accent: '#ffb300',
    gradientFrom: '#0b0b0b',
    gradientTo: '#e6b800',
    textOnPrimary: '#000000'
};

export default function LiftPadPro() {
    const [cartQty, setCartQty] = useState(0);
    const [contact, setContact] = useState({ name: '', email: '', message: '' });
    const [showCart, setShowCart] = useState(false);

    // ---------------- CONFIG ----------------
    const GALLERY = ['/LiftPad_Picture_0.png','/LiftPad_Picture_1.png','/LiftPad_Picture_2.png','/LiftPad_Picture_3.jpg','/LiftPad_Picture_4.jpeg'];
    const carouselAutoplayMs = 3000;         // ms between slides (0 to disable)
    const carouselGapPx = 12;                // gap between tiles in px
    const mobileHeight = 192;                // px height on mobile
    const desktopHeight = 256;               // px height on md+ (desktop)
    const breakpointMd = 768;                // px
    // ----------------------------------------

    // responsive visible count (1 on small, 3 on md+)
    const [visibleCount, setVisibleCount] = useState(typeof window !== 'undefined' && window.innerWidth >= breakpointMd ? 3 : 1);
    useEffect(() => {
        function onResize() { setVisibleCount(window.innerWidth >= breakpointMd ? 3 : 1); }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // build extended array for infinite loop: clones before+after
    const extended = [
        ...GALLERY.slice(-visibleCount),
        ...GALLERY,
        ...GALLERY.slice(0, visibleCount)
    ];
    const startIndex = visibleCount; // index of first real item in extended array

    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [isAnimating, setIsAnimating] = useState(false);
    const trackRef = useRef(null);

    // touch swipe vars
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);
    const touchThreshold = 50; // px to trigger swipe

    // autoplay (pauses on hover)
    const hoverRef = useRef(false);
    const autoplayRef = useRef(null);
    useEffect(() => {
        if (!carouselAutoplayMs) return;
        function start() {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
            autoplayRef.current = setInterval(() => {
                if (!hoverRef.current) next();
            }, carouselAutoplayMs);
        }
        start();
        window.addEventListener('focus', start);
        window.addEventListener('blur', () => { if (autoplayRef.current) clearInterval(autoplayRef.current); });
        return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); window.removeEventListener('focus', start); };
    }, [visibleCount, carouselAutoplayMs, next]);

    // helpers to move carousel
    function next() { if (isAnimating) return; setIsAnimating(true); setCurrentIndex(i => i + 1); }
    function prev() { if (isAnimating) return; setIsAnimating(true); setCurrentIndex(i => i - 1); }
    function goTo(realIdx) { if (isAnimating) return; setIsAnimating(true); setCurrentIndex(startIndex + realIdx); }

    // handle seamless jump when hitting clones
    useEffect(() => {
        const node = trackRef.current;
        if (!node) return;
        function onTransitionEnd() {
            setIsAnimating(false);
            const n = GALLERY.length;
            if (currentIndex >= startIndex + n) {
                // moved to clones after -> snap to real first
                node.style.transition = 'none';
                setCurrentIndex(startIndex);
                // const _unused = node.offsetHeight; // force reflow (linter-friendly)
                node.style.transition = '';
            }
            if (currentIndex < startIndex) {
                // moved to clones before -> snap to last real
                node.style.transition = 'none';
                setCurrentIndex(startIndex + n - 1);
                // const _unused = node.offsetHeight; // force reflow (linter-friendly)
                node.style.transition = '';
            }
        }
        node.addEventListener('transitionend', onTransitionEnd);
        return () => node.removeEventListener('transitionend', onTransitionEnd);
    }, [currentIndex, GALLERY.length, startIndex]);

    // compute shift percent: each slide = 100 / visibleCount of viewport
    const shiftPercent = ((currentIndex - startIndex) * (100 / visibleCount));

    // ---------------- VIDEO: autoplay & remove white outline ----------------
    const videoRef = useRef(null);
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true; // required for autoplay in many browsers
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
    }, []);

    // UI helpers
    function addToCart(qty = 1) { setCartQty(q => Math.max(0, q + qty)); setShowCart(true); }
    function submitContact(e) { e.preventDefault(); alert(`Thanks ${contact.name || 'there'} — we will reply to ${contact.email || 'your email'}.`); setContact({ name:'', email:'', message:'' }); }

    // inline styles for carousel children to add gaps and avoid stretching
    const slideStyle = (visibleCount) => ({
        flex: `0 0 calc(${100 / visibleCount}% - ${(carouselGapPx * (visibleCount - 1)) / visibleCount}px)`,
        marginRight: `${carouselGapPx}px`,
        boxSizing: 'border-box'
    });

    // touch handlers
    function onTouchStart(e){ touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0; }
    function onTouchMove(e){ touchDeltaX.current = e.touches[0].clientX - touchStartX.current; }
    function onTouchEnd(){
        if (Math.abs(touchDeltaX.current) > touchThreshold){
            if (touchDeltaX.current < 0) next(); else prev();
        }
        touchDeltaX.current = 0;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
            {/* HEADER */}
            <header className="backdrop-blur bg-white/70 border-b sticky top-0 z-40">
                <title>LiftPad</title>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div style={{ color: THEME.primary }} className="text-2xl font-extrabold tracking-tight">LiftPad</div>
                        <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-600">
                            <a href="#product" className="hover:opacity-90">Product</a>
                            <a href="#specs" className="hover:opacity-90">Specs</a>
                            <a href="#pricing" className="hover:opacity-90">Pricing</a>
                            <a href="#support" className="hover:opacity-90">Support</a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => setShowCart(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border hover:shadow-sm">
                            <ShoppingCart size={16} />
                            <span className="text-sm">Cart</span>
                            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs rounded-full" style={{ background: THEME.primary, color: THEME.textOnPrimary }}>{cartQty}</span>
                        </button>
                        <a href="#contact" className="hidden sm:inline-block px-4 py-2 rounded-md text-sm font-medium" style={{ background: THEME.primary, color: THEME.textOnPrimary }}>Contact sales</a>
                    </div>
                </div>
            </header>

            <main>
                {/* HERO */}
                <section style={{ background: `linear-gradient(90deg, ${THEME.gradientFrom} 0%, ${THEME.gradientTo} 100%)` }} className="text-white">
                    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold leading-tight">Next-level work-at-height safety — built for real sites</motion.h1>
                            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mt-4 text-lg opacity-90 max-w-xl">LiftPad combines rugged sensors, hands-free voice control and fleet management to reduce incidents and speed up jobs — trusted by contractors and rental fleets.</motion.p>

                            <div className="mt-8 flex gap-4 flex-wrap">
                                <a href="#pricing" className="inline-flex items-center gap-3 px-5 py-3 rounded-lg font-semibold shadow" style={{ background: THEME.accent, color: '#000' }}>Buy now — $249</a>
                                <a href="#product" className="inline-flex items-center gap-2 border border-white/30 px-4 py-3 rounded-lg">See features</a>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm opacity-90">
                                <div className="inline-flex items-center gap-3"><CheckCircle size={16} /> <span>1-year warranty</span></div>
                                <div className="inline-flex items-center gap-3"><Repeat size={16} /> <span>On-site service available</span></div>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-0 shadow-2xl" style={{ border: 'none', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
                                {/* Video player - muted autoplay loop and forced play attempt */}
                                <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden">
                                    <video
                                        src="/LiftPad_Video.mp4"
                                        poster={GALLERY[0]}
                                        autoPlay loop muted playsInline preload="auto"
                                        className="w-full h-full object-cover block"
                                        style={{ background: '#000', border: 'none', outline: 'none', boxShadow: 'none' }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FEATURES + Quick specs */}
                <section id="product" className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold">Why contractors choose LiftPad</h2>
                            <p className="mt-2 text-gray-600 max-w-xl">Designed for durability and ease-of-use — rapid deployment, minimal training and measurable safety outcomes.</p>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: 'Industrial Voice Control', desc: 'Robust hands-free commands', icon: '🔊' },
                                    { title: 'Real-time Gas Detection', desc: 'Continuous monitoring', icon: '🧪' },
                                    { title: 'Integrated SOS + GPS', desc: 'One-touch emergency alert', icon: '🆘' },
                                    { title: 'Fleet Management', desc: 'Firmware updates & analytics', icon: '📡' },
                                ].map(f => (
                                    <motion.div key={f.title} whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow">
                                        <div className="text-2xl">{f.icon}</div>
                                        <h3 className="mt-3 font-semibold">{f.title}</h3>
                                        <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <aside className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-sm border">
                            <div className="font-semibold">Quick specs</div>
                            <dl className="mt-4 text-sm text-gray-700 grid grid-cols-1 gap-3">
                                {[
                                    ['Working Height','Up to 0.7 m (adjustable)'],
                                    ['Max Load','250 kg'],
                                    ['Drive','Dual 12V brushless motors'],
                                    ['Battery','Li-ion 7200mAh — 6–8 hours'],
                                    ['Sensors','MQ-2, Shock, IMU'],
                                    ['Connectivity','Wi-Fi, LTE (opt), GPS'],
                                ].map(s => (
                                    <div key={s[0]} className="flex items-center justify-between bg-white/50 px-3 py-2 rounded">
                                        <dt className="font-medium">{s[0]}</dt>
                                        <dd className="text-right text-sm font-semibold">{s[1]}</dd>
                                    </div>
                                ))}
                            </dl>

                            <div className="mt-6">
                                <a href="#specs" className="text-sm font-medium" style={{ color: THEME.primary }}>Full technical datasheet →</a>
                            </div>

                            <div className="mt-6 bg-white p-3 rounded-lg border">
                                <div className="text-xs text-gray-500">Need CAD/wiring?</div>
                                <div className="font-semibold">Request engineering pack</div>
                                <div className="mt-3">
                                    <a href="#contact" className="text-sm inline-block px-3 py-2 rounded-md" style={{ background: THEME.primary, color: THEME.textOnPrimary }}>Request now</a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* ------------------ Carousel (responsive multi-card infinite) ------------------ */}
                <section className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div
                            className="relative"
                            onMouseEnter={() => { hoverRef.current = true; }}
                            onMouseLeave={() => { hoverRef.current = false; }}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            <div className="overflow-hidden rounded-lg">
                                <div
                                    ref={trackRef}
                                    className="flex transition-transform duration-500"
                                    style={{ transform: `translateX(-${shiftPercent}%)` }}
                                >
                                    {extended.map((src, i) => (
                                        <div
                                            key={`${src}-${i}`}
                                            style={{
                                                ...slideStyle(visibleCount),
                                                marginRight: (i === extended.length - 1) ? '0px' : `${carouselGapPx}px`
                                            }}
                                        >
                                            <img
                                                src={src}
                                                alt={`gallery-${i}`}
                                                className="w-full"
                                                style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: (window.innerWidth >= breakpointMd ? desktopHeight : mobileHeight),
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)'
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controls */}
                            <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow">‹</button>
                            <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow">›</button>

                            {/* Dots */}
                            <div className="flex gap-2 justify-center mt-4">
                                {GALLERY.map((_, i) => (
                                    <button key={i} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full ${i === ((currentIndex - startIndex + GALLERY.length) % GALLERY.length) ? 'bg-gray-900' : 'bg-gray-300'}`} aria-label={`Go to ${i + 1}`}></button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-gray-600">High-resolution photos & short case study videos increase trust and conversion.</div>
                    </div>
                </section>

                {/* PRICING */}
                <section id="pricing" className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center">Purchase & rental options</h2>
                    <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">Flexible pricing for single units, fleet purchases and short-term rental.</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-sm text-gray-500">Starter</div>
                            <div className="mt-2 text-2xl font-semibold">$249</div>
                            <div className="mt-4 text-sm text-gray-600">Single unit, standard warranty</div>
                            <ul className="mt-4 text-sm text-gray-700 space-y-2">
                                <li>Voice control</li>
                                <li>Gas detection</li>
                                <li>Basic reporting</li>
                            </ul>
                            <div className="mt-6">
                                <button onClick={() => addToCart(1)} className="w-full py-2 rounded-md" style={{ background: THEME.primary, color: THEME.textOnPrimary }}>Add to cart</button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
                            <div className="text-sm text-gray-500">Pro</div>
                            <div className="mt-2 text-2xl font-semibold">$399</div>
                            <div className="mt-4 text-sm text-gray-600">Includes annual support and remote monitoring</div>
                            <ul className="mt-4 text-sm text-gray-700 space-y-2">
                                <li>Fleet dashboard</li>
                                <li>Priority service</li>
                                <li>Firmware OTA</li>
                            </ul>
                            <div className="mt-6">
                                <button onClick={() => addToCart(1)} className="w-full py-2 rounded-md" style={{ background: THEME.primary, color: THEME.textOnPrimary }}>Buy Pro</button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-sm text-gray-500">Rental</div>
                            <div className="mt-2 text-2xl font-semibold">From $19 / day</div>
                            <div className="mt-4 text-sm text-gray-600">Short-term options with maintenance included</div>
                            <ul className="mt-4 text-sm text-gray-700 space-y-2">
                                <li>Flexible periods</li>
                                <li>On-site swap</li>
                                <li>Training included</li>
                            </ul>
                            <div className="mt-6">
                                <a href="#contact" className="w-full inline-block text-center py-2 rounded-md" style={{ background: THEME.accent, color: '#fff' }}>Request rental</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SPECS DEEP DIVE */}
                <section id="specs" className="bg-gray-50 py-12">
                    <div className="max-w-5xl mx-auto px-6">
                        <h3 className="text-2xl font-bold">Technical specifications</h3>
                        <p className="mt-2 text-gray-600">Complete engineering details available on request (CAD, wiring diagrams, test reports).</p>

                        <div className="mt-6 bg-white p-6 rounded-xl shadow">
                            <table className="w-full text-sm">
                                <tbody>
                                {[
                                    ['Working Height', 'Up to 0.7 m (adjustable)'],
                                    ['Max Load', '250 kg (safety factor 2.5)'],
                                    ['Drive', 'Dual 12V brushless motors, differential steering'],
                                    ['Battery', 'Li-ion 6000mAh — typical 6–8 hours'],
                                    ['Sensors', 'MQ-2 Gas, Shock, Limit switches, IMU'],
                                    ['Connectivity', 'Wi-Fi, LTE (optional), GPS, BLE'],
                                    ['Protection', 'IP54 — suitable for dusty & wet sites'],
                                    ['Warranty', '1 year (with optional extended plans)'],
                                ].map(s => (
                                    <tr key={s[0]} className="border-b last:border-b-0">
                                        <td className="py-3 font-medium w-1/3">{s[0]}</td>
                                        <td className="py-3 text-gray-700">{s[1]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* TEAM */}
                <section id="team" className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center">Meet the <span className="text-purple-00">Lavanda</span> team</h2>
                    <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">Experienced people behind LiftPad — engineering, product and field operations.</p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Person 1 */}
                        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow">
                            <img src="/Naile_image.jpg" alt="Name 1 — CEO" className="w-28 h-28 rounded-full object-cover shadow-sm" />
                            <div className="mt-4">
                                <div className="text-lg font-semibold">Nalia Aslanova</div>
                                <div className="text-sm text-gray-500">Designer</div>
                                <p className="mt-3 text-sm text-gray-600">Founder &amp; Shapes LiftPad’s visual identity and user experience — combining clean design with industrial functionality.</p>
                            </div>
                        </div>

                        {/* Person 2 */}
                        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow">
                            <img src="/Nigar_image.jpg" alt="Name 2 — CTO" className="w-28 h-28 rounded-full object-cover shadow-sm" />
                            <div className="mt-4">
                                <div className="text-lg font-semibold">Nigar Mammadova</div>
                                <div className="text-sm text-gray-500">Marketing Manager</div>
                                <p className="mt-3 text-sm text-gray-600">Tells LiftPad’s story — connecting innovation with customers through creative campaigns and partnerships.</p>
                            </div>
                        </div>

                        {/* Person 3 */}
                        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow">
                            <img src="/Ahmad_image.jpg" alt="Name 3 — Head of Product" className="w-28 h-28 rounded-full object-cover shadow-sm" />
                            <div className="mt-4">
                                <div className="text-lg font-semibold">Ahmad Osmanli</div>
                                <div className="text-sm text-gray-500">Engineer</div>
                                <p className="mt-3 text-sm text-gray-600">Builds and optimizes LiftPad’s mechanical and safety systems — ensuring every unit performs flawlessly in real worksite conditions.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* TESTIMONIALS */}
                <section className="max-w-7xl mx-auto px-6 py-12">
                    <h3 className="text-2xl font-bold text-center">What customers say</h3>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow">“We cut incident reports by 60% in 3 months.” — Site Manager, major contractor</div>
                        <div className="bg-white p-6 rounded-xl shadow">“Easy to train crews and the SOS feature saved us time during an incident.” — Safety Officer</div>
                        <div className="bg-white p-6 rounded-xl shadow">“Rental ROI was immediate for short-term projects.” — Operations</div>
                    </div>
                </section>

                {/* FAQ + Contact */}
                <section id="support" className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold">Common questions</h3>
                            <div className="mt-4 space-y-4 text-sm text-gray-700">
                                <details className="p-4 bg-gray-50 rounded-lg"><summary className="font-medium">How long is the battery?</summary><p className="mt-2">Typical runtime 6–8 hours depending on load; swap-in batteries available for continuous operations.</p></details>
                                <details className="p-4 bg-gray-50 rounded-lg"><summary className="font-medium">Do you offer bulk discounts?</summary><p className="mt-2">Yes — contact sales for tiered pricing and fleet plans.</p></details>
                                <details className="p-4 bg-gray-50 rounded-lg"><summary className="font-medium">Is on-site training available?</summary><p className="mt-2">Yes — add training during checkout or request via contact form.</p></details>
                            </div>
                        </div>

                        <div id="contact" className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold">Contact sales & support</h3>
                            <form onSubmit={submitContact} className="mt-4 space-y-3">
                                <input required placeholder="Full name" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                                <input required type="email" placeholder="Work email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                                <textarea required placeholder="Message" value={contact.message} onChange={(e) => setContact({...contact, message: e.target.value})} className="w-full border rounded-md px-3 py-2 h-28" />
                                <div className="flex gap-3">
                                    <button type="submit" className="px-4 py-2 rounded-md" style={{background:THEME.primary,color:THEME.textOnPrimary}}>Send message</button>
                                    <button type="button" onClick={() => setContact({name:'',email:'',message:''})} className="px-4 py-2 rounded-md border">Clear</button>
                                </div>

                                <div className="text-xs text-gray-500 mt-2">Prefer phone? <a href="tel:+994509963245" className="" style={{color:THEME.primary}}>+994 50 996 32 45</a></div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-xl font-bold">LiftPad</div>
                            <div className="mt-3 text-sm text-gray-300">Industrial safety platforms — sales & rental</div>
                        </div>

                        <div className="text-sm text-gray-300">
                            <div className="font-medium">Contact</div>
                            <div className="mt-2 flex flex-col gap-1"><span><MapPin size={14}/> Zaqatala, Azerbaijan</span><span><Phone size={14}/> +994 50 996 32 45</span><span><Mail size={14}/> LiftPad.Company@gmail.com</span></div>
                        </div>

                        <div className="text-sm text-gray-300">
                            <div className="font-medium">Legal</div>
                            <div className="mt-2">Privacy • Terms • Warranty</div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 text-center text-xs text-gray-400 py-4">© {new Date().getFullYear()} LiftPad — All rights reserved.</div>
                </footer>
            </main>

            {/* CART MODAL */}
            {showCart && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-sm text-gray-500">Shopping cart</div>
                                <div className="text-xl font-semibold">{cartQty} × LiftPad</div>
                            </div>
                            <button onClick={() => setShowCart(false)} className="text-gray-500">✕</button>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <div className="text-sm">Subtotal</div>
                                <div className="font-semibold">${cartQty * 249}</div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button onClick={() => alert('Integrate Stripe/PayPal for production checkout')} className="col-span-2 py-2 rounded-md" style={{background:'#16a34a',color:'#fff'}}>Proceed to checkout</button>
                                <button onClick={() => { setCartQty(0); }} className="py-2 border rounded-md">Clear cart</button>
                                <button onClick={() => setShowCart(false)} className="py-2 border rounded-md">Continue shopping</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
