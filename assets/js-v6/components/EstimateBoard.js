"use client";
import { jsx as _jsx, jsxs as _jsxs } from "/assets/vendor-v6/react-jsx-runtime.js";
import Image from "/assets/js-v6/shims/next-image.js";
import { useMemo, useState } from "/assets/vendor-v6/react.js";
import { DATE_MAX, addDays, nightsBetween, todayLocal } from "/assets/js-v6/lib/dates.js";
import { TAX, extras, packages, rooms } from "/assets/js-v6/lib/data.js";
import { PressLink, btnPrimary } from "./Pressable.js";
import { StayFinder } from "./StayFinder.js";
function safeCount(value, fallback, min, max) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed))
        return fallback;
    return Math.min(max, Math.max(min, Math.round(parsed)));
}
export function EstimateBoard({ initial = {} }) {
    const fallbackCheckin = todayLocal();
    const seededCheckin = initial.checkin || fallbackCheckin;
    const seededCheckout = initial.checkout || addDays(seededCheckin, 3);
    const seededAdults = safeCount(initial.adults || initial.guests, 2, 1, 6);
    const seededChildren = safeCount(initial.children, 0, 0, 4);
    const seededRoom = rooms.some((room) => room.id === initial.room) ? initial.room : rooms[0].id;
    const seededPackage = packages.some((pkg) => pkg.id === initial.package) ? initial.package : "cove";
    const [roomId, setRoomId] = useState(seededRoom);
    const [pkgId, setPkgId] = useState(seededPackage);
    const [checkin, setCheckin] = useState(seededCheckin);
    const [checkout, setCheckout] = useState(seededCheckout);
    const [adults, setAdults] = useState(seededAdults);
    const [children, setChildren] = useState(seededChildren);
    const [picked, setPicked] = useState({
        hammam: false,
        dinner: false,
        transfer: false,
    });
    const nights = nightsBetween(checkin, checkout);
    const room = rooms.find((r) => r.id === roomId) || rooms[0];
    const pkg = packages.find((p) => p.id === pkgId) || packages[1];
    const ledger = useMemo(() => {
        const roomTotal = Math.round(room.price * pkg.mult * nights);
        const extraLines = extras
            .filter((e) => picked[e.id])
            .map((e) => {
            const qty = e.per === "adult-night" ? adults * nights : 1;
            return { name: e.name, amount: e.each * qty };
        });
        const sub = roomTotal + extraLines.reduce((sum, line) => sum + line.amount, 0);
        const tax = Math.round(sub * TAX);
        return { roomTotal, extraLines, sub, tax, total: sub + tax };
    }, [adults, nights, picked, pkg.mult, room.price]);
    function handleStay(values) {
        setCheckin(values.checkin);
        setCheckout(values.checkout);
        setAdults(values.adults);
        setChildren(values.children);
        const next = new URLSearchParams({
            checkin: values.checkin,
            checkout: values.checkout,
            guests: String(values.adults + values.children),
            adults: String(values.adults),
            children: String(values.children),
            room: room.id,
            package: pkg.id,
        });
        window.location.assign(`/plan/?${next.toString()}`);
    }
    const q = new URLSearchParams({
        checkin,
        checkout,
        guests: String(adults + children),
        adults: String(adults),
        children: String(children),
        room: room.id,
        package: pkg.id,
    });
    return (_jsxs("div", { className: "grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr]", children: [_jsxs("div", { children: [_jsx(StayFinder, { intent: "estimate", hidePackages: true, initial: { checkin, checkout, adults, children, package: pkgId }, onConfirm: handleStay }), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "mb-4 font-display text-[clamp(28px,3vw,40px)]", children: "Room" }), _jsx("div", { className: "grid gap-2", children: rooms.map((r) => (_jsxs("button", { type: "button", onClick: () => setRoomId(r.id), className: `grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-lg border p-2 text-left ${roomId === r.id ? "border-olive" : "border-ivory/10"}`, children: [_jsx(Image, { src: r.image, alt: "", width: 96, height: 64, sizes: "96px", className: "h-16 w-24 rounded object-cover", loading: "lazy" }), _jsxs("span", { children: [_jsx("strong", { className: "font-display text-lg", children: r.name }), _jsxs("span", { className: "mt-1 block text-sm text-muted", children: [r.size, " m\u00B2 \u00B7 ", r.guests, " guests"] })] }), _jsxs("span", { className: "pr-2 text-sm", children: ["EUR ", r.price] })] }, r.id))) })] }), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "mb-4 font-display text-[clamp(28px,3vw,40px)]", children: "Package" }), _jsx("p", { className: "mb-4 max-w-[52ch] text-ivory-soft", children: "One choice. The nightly total on the right follows it." }), _jsx("div", { className: "grid gap-3", children: packages.map((p) => {
                                    const night = Math.round(room.price * p.mult);
                                    return (_jsxs("button", { type: "button", onClick: () => setPkgId(p.id), className: `rounded-lg border p-4 text-left ${pkgId === p.id ? "border-olive bg-olive/10" : "border-ivory/10"}`, children: [_jsxs("div", { className: "flex items-baseline justify-between gap-4", children: [_jsx("span", { className: "font-display text-2xl", children: p.name }), _jsxs("span", { className: "text-bronze", children: ["EUR ", night, "/night"] })] }), _jsx("p", { className: "mt-1 text-sm text-ivory-soft", children: p.summary }), _jsx("p", { className: "mt-2 text-[13px] text-muted", children: p.includes.join(", ") }), _jsx("p", { className: "mt-1 text-[12px] text-bronze", children: p.priceHint })] }, p.id));
                                }) })] }), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "mb-4 font-display text-[clamp(28px,3vw,40px)]", children: "Add if you want" }), _jsx("div", { className: "grid gap-3", children: extras.map((e) => {
                                    const on = !!picked[e.id];
                                    return (_jsxs("button", { type: "button", onClick: () => setPicked((state) => ({ ...state, [e.id]: !state[e.id] })), className: `flex items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "border-olive bg-olive/10" : "border-ivory/10 bg-transparent"}`, children: [_jsxs("span", { children: [_jsx("span", { className: "block", children: e.name }), _jsxs("span", { className: "text-sm text-muted", children: ["EUR ", e.each, e.per === "adult-night" ? " / adult / night" : " once"] })] }), _jsx("span", { className: `relative h-7 w-12 rounded-full transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "bg-olive" : "bg-ivory/20"}`, "aria-hidden": true, children: _jsx("span", { className: `absolute top-1 left-1 h-5 w-5 rounded-full bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "translate-x-5" : "translate-x-0"}` }) })] }, e.id));
                                }) })] })] }), _jsxs("aside", { className: "sticky top-24 rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsxs("p", { className: "text-muted", children: [nights, " night", nights === 1 ? "" : "s", " \u00B7 ", adults, " adult", adults === 1 ? "" : "s", children ? ` · ${children} child${children === 1 ? "" : "ren"}` : ""] }), _jsx("p", { className: "mt-2 font-display text-3xl", children: room.name }), _jsxs("p", { className: "text-bronze", children: [pkg.name, " \u00B7 ", pkg.summary] }), _jsxs("ul", { className: "mt-6 grid gap-2 p-0 text-ivory-soft", children: [_jsxs("li", { className: "flex justify-between border-t border-ivory/10 pt-3", children: [_jsxs("span", { children: [pkg.name, " \u00D7 ", nights] }), _jsxs("span", { children: ["EUR ", ledger.roomTotal] })] }), ledger.extraLines.map((line) => (_jsxs("li", { className: "flex justify-between", children: [_jsx("span", { children: line.name }), _jsxs("span", { children: ["EUR ", line.amount] })] }, line.name))), _jsxs("li", { className: "flex justify-between", children: [_jsx("span", { children: "Tax" }), _jsxs("span", { children: ["EUR ", ledger.tax] })] })] }), _jsxs("p", { className: "mt-6 font-display text-[40px] leading-none", children: ["EUR ", ledger.total] }), _jsxs("p", { className: "mt-2 text-sm text-muted", children: ["Through ", DATE_MAX.slice(0, 4), ". Cancel ", pkg.cancelDays, " days before arrival."] }), _jsx("div", { className: "mt-6", children: _jsx(PressLink, { href: `/book/?${q.toString()}`, className: btnPrimary, children: "Hold this stay" }) })] })] }));
}
