"use client";
import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { useRouter } from "__MIRBIR_BASE__assets/js-v8/shims/next-navigation.js";
import { useEffect, useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
import { DATE_MAX, addDays, clampDate, todayLocal } from "__MIRBIR_BASE__assets/js-v8/lib/dates.js";
import { PressButton, btnPrimary } from "./Pressable.js";
export function SearchBar({ roomId, maxGuests = 6, }) {
    const router = useRouter();
    const [minDate, setMinDate] = useState("2026-01-01");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [guests, setGuests] = useState("2");
    const [error, setError] = useState("");
    useEffect(() => {
        const today = todayLocal();
        setMinDate(today);
        setCheckin((current) => current || today);
        setCheckout((current) => current || addDays(today, 1));
    }, []);
    function onCheckin(value) {
        const nextIn = clampDate(value, minDate, DATE_MAX);
        if (!nextIn) {
            setCheckin("");
            return;
        }
        setCheckin(nextIn);
        const minOut = addDays(nextIn, 1);
        setCheckout((current) => {
            if (!current || current <= nextIn)
                return minOut > DATE_MAX ? DATE_MAX : minOut;
            return current > DATE_MAX ? DATE_MAX : current;
        });
    }
    function onCheckout(value) {
        const minOut = checkin ? addDays(checkin, 1) : addDays(minDate, 1);
        const nextOut = clampDate(value, minOut, DATE_MAX);
        setCheckout(nextOut);
    }
    function onSubmit(e) {
        e.preventDefault();
        if (!checkin || !checkout || checkout <= checkin) {
            setError("Choose a check-out date after check-in.");
            return;
        }
        if (checkin > DATE_MAX || checkout > DATE_MAX) {
            setError("Stays can be booked through 31 December 2030.");
            return;
        }
        setError("");
        const q = new URLSearchParams({ checkin, checkout, guests });
        if (roomId)
            q.set("room", roomId);
        router.push(`__MIRBIR_BASE__book/?${q.toString()}`);
    }
    const minOut = checkin ? addDays(checkin, 1) : addDays(minDate, 1);
    return (_jsxs("form", { onSubmit: onSubmit, className: "grid max-w-[920px] grid-cols-1 items-end gap-3 rounded-lg border border-ivory/20 bg-[rgba(18,19,18,0.55)] p-4 backdrop-blur-md md:grid-cols-[1.1fr_1.1fr_.9fr_auto]", children: [_jsxs("label", { className: "flex flex-col gap-1.5 text-xs tracking-wide text-muted", children: ["Check-in", _jsx("input", { type: "date", required: true, value: checkin, min: minDate, max: DATE_MAX, onChange: (e) => onCheckin(e.target.value), className: "min-h-10 w-full border-0 border-b border-ivory/20 bg-transparent py-2 text-base text-ivory outline-none focus:border-olive" })] }), _jsxs("label", { className: "flex flex-col gap-1.5 text-xs tracking-wide text-muted", children: ["Check-out", _jsx("input", { type: "date", required: true, value: checkout, min: minOut, max: DATE_MAX, onChange: (e) => onCheckout(e.target.value), className: "min-h-10 w-full border-0 border-b border-ivory/20 bg-transparent py-2 text-base text-ivory outline-none focus:border-olive" })] }), _jsxs("label", { className: "flex flex-col gap-1.5 text-xs tracking-wide text-muted", children: ["Guests", _jsx("select", { value: guests, onChange: (e) => setGuests(e.target.value), className: "min-h-10 w-full border-0 border-b border-ivory/20 bg-transparent py-2 text-base text-ivory outline-none focus:border-olive", children: Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (_jsx("option", { value: n, className: "bg-bg-2", children: n }, n))) })] }), _jsx(PressButton, { type: "submit", className: btnPrimary, children: "Check dates" }), error ? (_jsx("p", { className: "col-span-full m-0 text-[13px] text-[#e0b4a8]", role: "alert", children: error })) : null] }));
}
