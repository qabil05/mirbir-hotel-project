"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "/assets/vendor-v6/react-jsx-runtime.js";
import Image from "/assets/js-v6/shims/next-image.js";
import { AnimatePresence, motion, useReducedMotion } from "/assets/js-v6/lib/motion-lite.js";
import Link from "/assets/js-v6/shims/next-link.js";
import { useSearchParams } from "/assets/js-v6/shims/next-navigation.js";
import { useMemo, useState } from "/assets/vendor-v6/react.js";
import { DATE_MAX, nightsBetween, todayLocal } from "/assets/js-v6/lib/dates.js";
import { packages, rooms } from "/assets/js-v6/lib/data.js";
import { PressButton, btnGhost, btnPrimary } from "./Pressable.js";
import { StayFinder } from "./StayFinder.js";
const steps = ["Dates", "Room", "Guest", "Review", "Confirmed"];
export function BookingFlow() {
    const params = useSearchParams();
    const reduce = useReducedMotion();
    const [step, setStep] = useState(params.get("room") && params.get("checkin") ? 2 : 1);
    const [checkin, setCheckin] = useState(params.get("checkin") || "");
    const [checkout, setCheckout] = useState(params.get("checkout") || "");
    const seededAdults = Number(params.get("adults") || params.get("guests") || 2);
    const seededChildren = Number(params.get("children") || 0);
    const [adults, setAdults] = useState(Number.isFinite(seededAdults) ? seededAdults : 2);
    const [children, setChildren] = useState(Number.isFinite(seededChildren) ? seededChildren : 0);
    const guests = adults + children;
    const [roomId, setRoomId] = useState(params.get("room") || "");
    const [pkgId, setPkgId] = useState(params.get("package") || "cove");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [holding, setHolding] = useState(false);
    const nights = useMemo(() => nightsBetween(checkin, checkout), [checkin, checkout]);
    const room = rooms.find((r) => r.id === roomId);
    const rate = packages.find((r) => r.id === pkgId) || packages[1];
    const sub = room ? Math.round(room.price * nights * rate.mult) : 0;
    const tax = Math.round(sub * 0.12);
    const total = sub + tax;
    const available = rooms.filter((r) => r.guests >= guests);
    function summary() {
        return (_jsxs("aside", { className: "rounded-lg border border-ivory/10 bg-bg-2 p-6", "aria-live": "polite", children: [_jsx("h3", { className: "mb-2 font-display text-[22px]", children: "Your stay" }), _jsxs("p", { className: "text-muted", children: [checkin || "Dates open", " to ", checkout || "open"] }), _jsxs("p", { className: "text-muted", children: [guests, " guest", guests === 1 ? "" : "s", " \u00B7 ", nights, " night", nights === 1 ? "" : "s"] }), room ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "mt-4", children: room.name }), _jsx("p", { className: "text-muted", children: rate.name }), _jsxs("p", { className: "mt-4 font-display text-[28px]", children: ["EUR ", total, " ", _jsx("span", { className: "font-sans text-sm text-muted", children: "inc. tax" })] })] })) : (_jsx("p", { className: "mt-4 text-muted", children: "Select a room to see the total." }))] }));
    }
    function onDates(e) {
        e.preventDefault();
        const min = todayLocal();
        if (!checkin || !checkout || checkout <= checkin) {
            setError("Check-out must fall after check-in.");
            return;
        }
        if (checkin < min) {
            setError("Check-in cannot be in the past.");
            return;
        }
        if (checkin > DATE_MAX || checkout > DATE_MAX) {
            setError("Stays can be booked through 31 December 2030.");
            return;
        }
        setError("");
        setStep(2);
    }
    function onRoom(e) {
        e.preventDefault();
        if (!roomId) {
            setError("Select a room to continue.");
            return;
        }
        const r = rooms.find((x) => x.id === roomId);
        if (r && guests > r.guests) {
            setError("This room sleeps fewer guests than selected.");
            return;
        }
        setError("");
        setStep(3);
    }
    function onGuest(e) {
        e.preventDefault();
        if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
            setError("Enter a valid email address.");
            return;
        }
        setError("");
        setStep(4);
    }
    function confirm() {
        setHolding(true);
        window.setTimeout(() => {
            const next = "MB-" + String(Math.floor(100000 + Math.random() * 900000));
            setCode(next);
            const rec = { code: next, checkin, checkout, adults, children, guests, roomId, total, created: new Date().toISOString() };
            const all = JSON.parse(localStorage.getItem("mirbir-stays") || "[]");
            all.push(rec);
            localStorage.setItem("mirbir-stays", JSON.stringify(all));
            sessionStorage.setItem("mirbir-ref", next);
            setHolding(false);
            setStep(5);
        }, 900);
    }
    const panel = step === 1 ? (_jsxs("div", { children: [_jsx(StayFinder, { intent: "inline", initial: {
                    checkin,
                    checkout,
                    adults,
                    children,
                    package: pkgId,
                }, onConfirm: (values) => {
                    setCheckin(values.checkin);
                    setCheckout(values.checkout);
                    setAdults(values.adults);
                    setChildren(values.children);
                    setPkgId(values.package);
                    setError("");
                    setStep(2);
                } }), error ? _jsx("p", { className: "mt-3 text-[13px] text-[#e0b4a8]", children: error }) : null] })) : step === 2 ? (available.length ? (_jsxs("form", { onSubmit: onRoom, className: "grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr]", children: [_jsxs("div", { className: "rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsx("p", { className: "mb-4 text-[12px] tracking-[0.2em] text-muted", children: "Available stays" }), _jsx("div", { className: "grid gap-3", children: available.map((r) => (_jsxs("label", { className: `grid cursor-pointer grid-cols-[120px_1fr_auto] items-center gap-4 rounded-lg border p-3 ${roomId === r.id ? "border-olive" : "border-ivory/10"}`, children: [_jsx(Image, { src: r.image, alt: "", width: 120, height: 80, sizes: "120px", className: "h-20 w-[120px] rounded object-cover", loading: "lazy" }), _jsxs("span", { children: [_jsx("strong", { className: "text-ivory", children: r.name }), _jsx("br", {}), _jsxs("span", { className: "text-ivory-soft", children: [r.size, " m2 \u00B7 ", r.guests, " guests"] })] }), _jsxs("span", { className: "font-sans text-ivory", children: ["from EUR ", r.price] }), _jsx("input", { className: "sr-only", type: "radio", name: "room", checked: roomId === r.id, onChange: () => setRoomId(r.id) })] }, r.id))) }), error ? _jsx("p", { className: "mt-3 text-[13px] text-[#e0b4a8]", children: error }) : null, _jsx(PressButton, { type: "submit", className: `${btnPrimary} mt-5`, children: "Continue" })] }), _jsxs("aside", { className: "rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsx("p", { className: "mb-4 text-[12px] tracking-[0.2em] text-muted", children: "How you stay" }), _jsx("div", { className: "grid gap-2", children: packages.map((r) => (_jsxs("button", { type: "button", onClick: () => setPkgId(r.id), className: `rounded-lg border p-3 text-left transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${pkgId === r.id ? "border-olive bg-olive/10" : "border-ivory/10"}`, children: [_jsx("span", { className: "font-display text-lg", children: r.name }), _jsx("span", { className: "ml-2 text-[12px] text-bronze", children: r.priceHint }), _jsx("p", { className: "mt-1 text-sm text-ivory-soft", children: r.summary })] }, r.id))) }), _jsx("div", { className: "mt-6 border-t border-ivory/10 pt-5", children: room ? (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-sm text-ivory-soft", children: [room.name, " \u00B7 ", rate.name, " \u00B7 ", nights, " night", nights === 1 ? "" : "s", " \u00B7 ", guests, " guest", guests === 1 ? "" : "s"] }), _jsxs("p", { className: "mt-2 text-sm text-muted", children: ["Room EUR ", sub, " \u00B7 Tax EUR ", tax] }), _jsxs("p", { className: "mt-3 font-display text-[32px] leading-none", children: ["EUR ", total] }), _jsx("p", { className: "mt-1 text-[12px] text-muted", children: "What you pay for this stay" })] })) : (_jsx("p", { className: "text-ivory-soft", children: "Select a room to see the full total." })) })] })] })) : (_jsxs("div", { className: "rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsx("p", { children: "No rooms hold this party size for those dates. Try fewer guests, or write to stay@mirbir.com." }), _jsx(PressButton, { className: `${btnGhost} mt-4`, onClick: () => setStep(1), children: "Change dates" })] }))) : step === 3 ? (_jsxs("form", { onSubmit: onGuest, className: "grid gap-4 rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col gap-1.5 text-xs text-muted", children: ["Full name", _jsx("input", { required: true, className: "min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("label", { className: "flex flex-col gap-1.5 text-xs text-muted", children: ["Email", _jsx("input", { required: true, type: "email", className: "min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory", value: email, onChange: (e) => setEmail(e.target.value) })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col gap-1.5 text-xs text-muted", children: ["Phone", _jsx("input", { required: true, className: "min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory", value: phone, onChange: (e) => setPhone(e.target.value) })] }), _jsxs("label", { className: "flex flex-col gap-1.5 text-xs text-muted", children: ["Country", _jsx("input", { required: true, className: "min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory", value: country, onChange: (e) => setCountry(e.target.value) })] })] }), _jsxs("label", { className: "flex flex-col gap-1.5 text-xs text-muted", children: ["Special requests", _jsx("textarea", { rows: 3, className: "border-0 border-b border-ivory/20 bg-transparent text-ivory", value: notes, onChange: (e) => setNotes(e.target.value) })] }), _jsxs("label", { className: "flex items-center gap-2.5 text-sm", children: [_jsx("input", { type: "checkbox", required: true }), _jsxs("span", { children: ["I agree to the ", _jsx(Link, { href: "/privacy/", children: "privacy policy" }), " and house rules."] })] }), error ? _jsx("p", { className: "text-[13px] text-[#e0b4a8]", children: error }) : null, _jsx(PressButton, { type: "submit", className: btnPrimary, children: "Review stay" })] })) : step === 4 && room ? (_jsxs("div", { className: "rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsx("h3", { className: "font-display text-[22px]", children: "Review" }), _jsxs("p", { className: "mt-2", children: [room.name, _jsx("br", {}), _jsxs("span", { className: "text-muted", children: [rate.kind, " ", rate.name, ". ", rate.note] })] }), _jsxs("p", { children: [checkin, " to ", checkout, " \u00B7 ", guests, " guests"] }), _jsxs("p", { children: [name, _jsx("br", {}), email, _jsx("br", {}), phone] }), _jsxs("p", { children: ["Room EUR ", sub, " \u00B7 Tax EUR ", tax] }), _jsxs("p", { className: "mt-4 font-display text-[28px]", children: ["EUR ", total, " ", _jsx("span", { className: "font-sans text-sm text-muted", children: "total" })] }), _jsx(PressButton, { className: `${btnPrimary} mt-4`, disabled: holding, onClick: confirm, children: holding ? "Holding your room" : "Confirm reservation" })] })) : (_jsxs("div", { className: "overflow-hidden rounded-lg border border-ivory/10 bg-bg-2", children: [_jsx(Image, { src: room?.image || "/images/hero-cove.jpg", alt: "", width: 1400, height: 420, sizes: "100vw", className: "h-56 w-full object-cover", loading: "lazy" }), _jsxs("div", { className: "p-8", children: [_jsx("p", { className: "text-[12px] tracking-[0.22em] text-bronze", children: "Reservation confirmed" }), _jsx("h3", { className: "mt-3 font-display text-[clamp(32px,5vw,56px)] leading-none", children: "Thank you for choosing MIRBIR" }), _jsxs("p", { className: "mt-4 text-ivory-soft", children: ["Your stay is reserved. ", room?.name, ". ", checkin, " to ", checkout, ". ", guests, " guests."] }), _jsx("p", { className: "mt-6 font-display text-[28px] tracking-[0.08em]", children: code }), _jsxs("p", { className: "mt-2 text-muted", children: ["We will write to ", email, " with the details of the house."] }), _jsxs("p", { className: "mt-6 font-display text-[40px] leading-none", children: ["EUR ", total] }), _jsx(Link, { href: "/", className: `${btnGhost} mt-8 inline-flex`, children: "Return home" })] })] }));
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-8 flex flex-wrap gap-2 text-[13px] text-muted", children: steps.map((s, i) => (_jsxs("span", { className: i + 1 === step ? "text-ivory" : "", children: [s, i < steps.length - 1 ? " / " : ""] }, s))) }), _jsxs("div", { className: `grid items-start gap-10 ${step !== 2 && step < 5 ? "lg:grid-cols-[1.2fr_.8fr]" : ""}`, children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: reduce ? undefined : { opacity: 0, y: -10 }, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, children: panel }, step) }), step !== 2 && step < 5 ? summary() : null] })] }));
}
