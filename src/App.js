/*
LiftPad - Single-file React + Tailwind frontend
File name suggestion: LiftPadWebsite.jsx

REQUIREMENTS (how to run)
- A React toolchain (Vite, Create React App, or Next.js). This is plain React component so it works in any framework.
- Tailwind CSS configured (https://tailwindcss.com/docs/installation)
- framer-motion installed for subtle animations: `npm i framer-motion`

How to use
1. Add this file to your src/ directory and import it in your app (e.g. App.jsx -> <LiftPadWebsite />).
2. Add Tailwind to your project and make sure tailwind directives are included in your CSS.
3. Replace placeholder assets and links (BROCHURE_URL, VIDEO_URL) with your real files.
4. To create a QR for your business card: point the QR to your hosted site (e.g. https://liftpad.example) — use any online QR generator or an npm library like `qrcode`.

Notes
- All visuals are SVGs or placeholders so the site renders without external images.
- Buttons that trigger downloads or videos use placeholder links; replace them with real assets before publishing.

Accessibility & SEO tips
- Add meta tags and OpenGraph tags in your HTML head.
- Fill `alt` attributes for any real images you add.

Enjoy — open the preview and tell me what to tweak.
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FEATURES = [
    {
        title: 'Height Safety System',
        desc: 'Adjustable guard rails, anti-slip surface and automatic lock when elevated.',
        icon: 'shield',
    },
    {
        title: 'Smart Weight Assistant',
        desc: 'Platform carries materials to prevent back strain and repetitive lifting.',
        icon: 'box',
    },
    {
        title: 'Gas & Radiation Detection',
        desc: 'Real-time MQ-series sensor monitoring and Geiger counter integration.',
        icon: 'sensor',
    },
    {
        title: 'AI Voice & SOS',
        desc: 'Hands-free voice commands and automatic emergency SOS dispatch.',
        icon: 'mic',
    },
    {
        title: 'Independent Power',
        desc: 'On-board battery with BMS for hours of continuous operation.',
        icon: 'battery',
    },
    {
        title: 'Remote Monitoring',
        desc: 'Cloud-ready telemetry for supervisors and safety analytics (optional).',
        icon: 'cloud',
    },
];

function Icon({ name, className = 'w-8 h-8' }) {
    switch (name) {
        case 'shield':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 2l7 3v5c0 5-3.5 9.74-7 12-3.5-2.26-7-7-7-12V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case 'box':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21.73a2 2 0 0 0 2 0l7-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case 'sensor':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M19 12c0-3.87-3.13-7-7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12c0 3.87 3.13 7 7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case 'mic':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M19 11v1a7 7 0 0 1-14 0v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
            );
        case 'battery':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M22 11v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
            );
        case 'cloud':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M20 17.58A5.5 5.5 0 0016.5 7a6 6 0 00-11 2A4.5 4.5 0 006.5 20h13.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        default:
            return <svg className={className} aria-hidden />;
    }
}

export default function LiftPadWebsite() {
    const [open, setOpen] = useState(false);
    <title>LiftPad</title>
    return (
        <div className="min-h-screen font-Inter text-slate-800 bg-gradient-to-b from-white to-slate-50">
            {/* NAV */}
            <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-slate-200">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="#hero" className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-slate-900 text-white shadow-md">
                            {/* Logo */}
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                                <path d="M6 6h12v12H6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold leading-tight">LiftPad</h1>
                            <p className="text-xs text-slate-500 -mt-1">Smart safety & lifting platform</p>
                        </div>
                    </a>

                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#features" className="hover:text-slate-900">Features</a>
                        <a href="#how" className="hover:text-slate-900">How it works</a>
                        <a href="#prototype" className="hover:text-slate-900">Prototype</a>
                        <a href="#team" className="hover:text-slate-900">Team</a>
                        <a href="#contact" className="text-white bg-slate-900 px-4 py-2 rounded-md shadow-sm hover:opacity-95">Contact</a>
                    </nav>

                    <div className="md:hidden">
                        <button aria-label="toggle menu" onClick={() => setOpen(!open)} className="p-2 rounded-md">
                            {open ? (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden border-t border-slate-200 bg-white/90">
                        <div className="px-6 py-4 flex flex-col gap-3">
                            <a href="#features" onClick={() => setOpen(false)}>Features</a>
                            <a href="#how" onClick={() => setOpen(false)}>How it works</a>
                            <a href="#prototype" onClick={() => setOpen(false)}>Prototype</a>
                            <a href="#team" onClick={() => setOpen(false)}>Team</a>
                            <a href="#contact" onClick={() => setOpen(false)} className="text-white bg-slate-900 px-4 py-2 rounded-md">Contact</a>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO */}
            <main>
                <section id="hero" className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.h2 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
                            LiftPad — safer work at height.
                        </motion.h2>
                        <p className="mt-4 text-slate-600 max-w-xl">A mobile, AI-assisted lifting platform that prevents falls, detects hazardous gases & radiation, aids heavy lifting, and connects instantly with emergency services.</p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="#prototype" className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-md shadow hover:opacity-95">See prototype</a>
                            <a href="#contact" className="inline-flex items-center gap-2 border border-slate-900 px-5 py-3 rounded-md">Contact & Quote</a>
                            <a href="/assets/LiftPad_Brochure.pdf" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border" download>Download Brochure</a>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                            <div className="p-4 bg-white rounded-lg shadow-sm">
                                <h4 className="text-sm font-semibold">Estimated accident reduction</h4>
                                <p className="text-2xl font-bold text-slate-900">40%</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm">
                                <h4 className="text-sm font-semibold">Avg. faster completion</h4>
                                <p className="text-2xl font-bold text-slate-900">25%</p>
                            </div>
                        </div>
                    </div>

                    <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="relative">
                        {/* Mockup card */}
                        <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-2xl shadow-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">LiftPad Prototype</h3>
                                    <p className="text-sm text-slate-200">Motorized scissor lift • Voice control • Sensors</p>
                                </div>
                                <div className="text-xs bg-white/10 px-3 py-1 rounded">WRO 2025</div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-white/6 rounded p-3">
                                    <div className="h-100 flex items-center justify-center text-sm">
                                        <img
                                            src="/LiftPad_Image_1.jpg"
                                            alt="Logo"
                                            className="h-full w-auto object-contain rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="bg-white/ rounded p-3">
                                    <div className="h-100 flex items-center justify-center text-sm">
                                        <img
                                            src="/LiftPad_Image_3.jpg"
                                            alt="Logo"
                                            className="h-full w-auto object-contain rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 text-sm text-slate-200">LiftPad isn't just a tool; it's your trusted companion in every lift. Designed for those who value precision, safety, and seamless integration.</div>
                        </div>

                        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-indigo-50/80 blur-md" aria-hidden />
                    </motion.div>
                </section>

                {/* FEATURES */}
                <section id="features" className="container mx-auto px-6 py-12">
                    <h3 className="text-2xl font-bold">Key features</h3>
                    <p className="mt-2 text-slate-600 max-w-2xl">LiftPad integrates mechanical safety with real-time hazard detection and seamless worker interaction.</p>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((f) => (
                            <motion.article key={f.title} whileHover={{ y: -6 }} className="bg-white rounded-lg p-5 shadow-sm border">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-100 rounded-md text-slate-900">
                                        <Icon name={f.icon} className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{f.title}</h4>
                                        <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section id="how" className="container mx-auto px-6 py-12">
                    <h3 className="text-2xl font-bold">How LiftPad works</h3>
                    <div className="mt-6 grid md:grid-cols-3 gap-6">
                        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
                            <ol className="space-y-6">
                                <li>
                                    <h5 className="font-semibold">1. Deploy & power</h5>
                                    <p className="text-sm text-slate-600">Push the mobile platform into position — onboard battery and wireless sockets power tools for hours.</p>
                                </li>
                                <li>
                                    <h5 className="font-semibold">2. Voice or remote control</h5>
                                    <p className="text-sm text-slate-600">Workers use short voice commands to lift, lower, lock safety rails, or trigger SOS hands-free.</p>
                                </li>
                                <li>
                                    <h5 className="font-semibold">3. Continuous monitoring</h5>
                                    <p className="text-sm text-slate-600">Gas sensors, radiation detectors and load cells constantly watch for hazards and react automatically.</p>
                                </li>
                                <li>
                                    <h5 className="font-semibold">4. Emergency response</h5>
                                    <p className="text-sm text-slate-600">When SOS is triggered, LiftPad sends location and status to supervisors or local emergency services (configurable).</p>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-slate-900 text-white p-6 rounded-lg shadow-xl">
                            <h4 className="text-lg font-semibold">Technical snapshot</h4>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li>Microcontroller: ESP8266 / Arduino</li>
                                <li>Actuators: 4000N linear actuator / DC motors</li>
                                <li>Sensors: MQ-series gas sensor, SBM-20 Geiger tube</li>
                                <li>Battery: Li-ion pack + BMS, ~6h runtime (prototype)</li>
                                <li>Connectivity: Wi‑Fi telemetry / SOS messaging</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* PROTOTYPE */}
                <section id="prototype" className="container mx-auto px-6 py-12">
                    <h3 className="text-2xl font-bold">Prototype & Evidence</h3>
                    <p className="mt-2 text-slate-600 max-w-2xl">Provide a short demo video showing the lifting mechanism, voice commands, and sensor reactions. Below is a placeholder area — swap with your real media.</p>

                    <div className="mt-6 grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                            <div className="w-full aspect-video bg-slate-100 rounded overflow-hidden flex items-center justify-center">
                                <video
                                    src="/LiftPad_Video.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full rounded-xl"
                                />

                            </div>

                            {/*<div className="mt-4 grid grid-cols-3 gap-3">*/}
                            {/*    <div className="p-3 bg-slate-50 rounded">Image 1</div>*/}
                            {/*    <div className="p-3 bg-slate-50 rounded">Image 2</div>*/}
                            {/*    <div className="p-3 bg-slate-50 rounded">Image 3</div>*/}
                            {/*</div>*/}
                        </div>

                        <aside className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold">Evidence checklist</h4>
                            <ul className="mt-3 text-sm space-y-2 text-slate-600">
                                <li>Prototype video (60–120s)</li>
                                <li>Test logs (weights, run-time, safety stops)</li>
                                <li>Photos of the build process & code snippets</li>
                                <li>Pilot feedback or local site test</li>
                            </ul>
                        </aside>
                    </div>
                </section>

                {/* TEAM */}
                <section id="team" className="container mx-auto px-6 py-12">
                    <h3 className="text-2xl font-bold">Meet the team</h3>
                    <p className="mt-2 text-slate-600 max-w-2xl">The multidisciplinary team behind LiftPad.</p>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold">NA</div>
                            <h5 className="mt-3 font-semibold">Naile Aslanova</h5>
                            <p className="text-sm text-slate-600">Designer</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold">NM</div>
                            <h5 className="mt-3 font-semibold">Nigar Mammadova</h5>
                            <p className="text-sm text-slate-600">Marketing Manager</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold">AO</div>
                            <h5 className="mt-3 font-semibold">Ahmad Osmanli</h5>
                            <p className="text-sm text-slate-600">Engineer</p>
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="container mx-auto px-6 py-12">
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-700 text-white rounded-lg p-8 grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-2xl font-bold">Get in touch</h3>
                            <p className="mt-2 text-slate-200">Want us to demonstrate LiftPad at your site, or need pricing for a pilot? Send a quick message and we’ll get back within 48 hours.</p>

                            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-slate-200">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8l7 5 11-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div>demo@liftpad.example</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V21a1 1 0 0 1-1.08 1 19 19 0 0 1-8.63-3.07A19 19 0 0 1 3.09 6.71 1 1 0 0 1 4 6h4.09a1 1 0 0 1 1 .75c.16.9.45 2.26-.24 3.54-.43.87-.21 1.98.57 2.6l2.2 1.69a12 12 0 0 0 3.48 1.98c.7.22 1.45-.05 1.76-.7l.86-1.89a1 1 0 0 1 .9-.59H20a1 1 0 0 1 1 1z" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div>+994 50 000 0000</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11l9-7 9 7-9 7-9-7z" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    <div>Baku, Azerbaijan</div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.target); const name = data.get('name'); const email = data.get('email'); const message = data.get('message'); window.location.href = `mailto:demo@liftpad.example?subject=${encodeURIComponent('LiftPad contact from ' + name)}&body=${encodeURIComponent(message + '\n\nContact: ' + email)}`; }} className="bg-white text-slate-900 rounded p-4">
                            <div className="grid gap-3">
                                <input name="name" required className="border p-3 rounded" placeholder="Your name" />
                                <input name="email" type="email" required className="border p-3 rounded" placeholder="Email" />
                                <textarea name="message" rows={4} required className="border p-3 rounded" placeholder="How can we help?"></textarea>
                                <div className="flex items-center justify-between">
                                    <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded">Send message</button>
                                    <a href="/assets/LiftPad_Brochure.pdf" download className="text-sm text-slate-600">Download brochure</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 mt-12">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-600">© {new Date().getFullYear()} LiftPad — Made for WRO 2025</div>
                    <div className="flex items-center gap-4">
                        <a className="text-sm text-slate-600" href="#">Privacy</a>
                        <a className="text-sm text-slate-600" href="#">Terms</a>
                        <a className="text-sm text-slate-600" href="#">Sitemap</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
