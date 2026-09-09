"use client";

import { CaretLeft, CaretRight, Minus, Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DATE_MAX,
  addDays,
  clampDate,
  formatDay,
  monthCells,
  monthLabel,
  todayLocal,
} from "@/lib/dates";
import { packages } from "@/lib/data";
import { PressButton, btnPrimary } from "./Pressable";

const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export type StayValues = {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  package: string;
};

export function StayFinder({
  intent = "book",
  onConfirm,
  initial,
  hidePackages = false,
}: {
  intent?: "book" | "estimate" | "inline";
  onConfirm?: (values: StayValues) => void;
  initial?: Partial<StayValues>;
  hidePackages?: boolean;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [minDate, setMinDate] = useState("2026-01-01");
  const [checkin, setCheckin] = useState(initial?.checkin || "");
  const [checkout, setCheckout] = useState(initial?.checkout || "");
  const [adults, setAdults] = useState(initial?.adults || 2);
  const [children, setChildren] = useState(initial?.children ?? 0);
  const [pkg, setPkg] = useState(initial?.package || "cove");
  const [cal, setCal] = useState<null | "in" | "out">(null);
  const [cursor, setCursor] = useState({ y: 2026, m: 9 });
  const [error, setError] = useState("");

  useEffect(() => {
    const today = todayLocal();
    setMinDate(today);
    setCheckin((c) => c || initial?.checkin || today);
    setCheckout((c) => c || initial?.checkout || addDays(today, 3));
    const seed = initial?.checkin || today;
    const [y, m] = seed.split("-").map(Number);
    if (y && m) setCursor({ y, m });
  }, [initial?.checkin, initial?.checkout]);

  const cells = useMemo(() => monthCells(cursor.y, cursor.m), [cursor]);
  const guests = adults + children;

  function pick(iso: string) {
    const next = clampDate(iso, minDate, DATE_MAX);
    if (!next) return;
    if (cal === "in" || !cal) {
      setCheckin(next);
      if (!checkout || checkout <= next) {
        const leave = addDays(next, 1);
        setCheckout(leave > DATE_MAX ? DATE_MAX : leave);
      }
      setCal("out");
      return;
    }
    if (next <= checkin) {
      setCheckin(next);
      setCheckout(addDays(next, 1));
      return;
    }
    setCheckout(next > DATE_MAX ? DATE_MAX : next);
    setCal(null);
  }

  function go() {
    if (!checkin || !checkout || checkout <= checkin) {
      setError("Choose a check-out after check-in.");
      return;
    }
    setError("");
    const values: StayValues = {
      checkin,
      checkout,
      adults,
      children,
      package: pkg,
    };
    if (onConfirm) {
      onConfirm(values);
      return;
    }
    const q = new URLSearchParams({
      checkin,
      checkout,
      guests: String(guests),
      adults: String(adults),
      children: String(children),
      package: pkg,
    });
    router.push(intent === "estimate" ? `/plan?${q}` : `/book?${q}`);
  }

  return (
    <div className="relative max-w-[980px] rounded-lg border border-ivory/20 bg-[rgba(18,19,18,0.62)] p-3 backdrop-blur-md md:p-4">
      <div className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-[0.9fr_0.9fr_auto_auto_auto]">
        <button
          type="button"
          onClick={() => setCal(cal === "in" ? null : "in")}
          className={`rounded-md px-2 py-1 text-left ${cal === "in" ? "bg-ivory/10" : ""}`}
        >
          <span className="block text-[11px] tracking-wide text-muted">Arrive</span>
          <span className="mt-0.5 block font-display text-[22px] leading-none md:text-[24px]">{formatDay(checkin)}</span>
        </button>
        <button
          type="button"
          onClick={() => setCal(cal === "out" ? null : "out")}
          className={`rounded-md px-2 py-1 text-left ${cal === "out" ? "bg-ivory/10" : ""}`}
        >
          <span className="block text-[11px] tracking-wide text-muted">Leave</span>
          <span className="mt-0.5 block font-display text-[22px] leading-none md:text-[24px]">{formatDay(checkout)}</span>
        </button>
        <GuestCount label="Adults" hint="18+" value={adults} min={1} max={6} onChange={setAdults} />
        <GuestCount label="Children" hint="0-17" value={children} min={0} max={4} onChange={setChildren} />
        <PressButton type="button" className={`${btnPrimary} w-full lg:w-auto`} onClick={go}>
          {intent === "estimate" ? "Plan stay" : intent === "inline" ? "Continue" : "Check availability"}
        </PressButton>
      </div>

      {hidePackages || intent === "inline" ? null : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPkg(p.id)}
              className={`rounded-md border px-3 py-2 text-left transition-colors ${
                pkg === p.id ? "border-olive bg-olive/20 text-ivory" : "border-ivory/15 text-ivory-soft"
              }`}
            >
              <span className="block font-display text-lg leading-none">{p.name}</span>
              <span className="mt-1 block text-[12px] text-ivory-soft">{p.summary}</span>
              <span className="mt-1 block text-[12px] text-bronze">{p.priceHint}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence initial={false}>
        {cal ? (
          <motion.div
            key="calendar"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-lg border border-ivory/10 bg-bg-2 p-3">
              <p className="mb-2 text-[12px] text-muted">
                {cal === "in" ? "Choose arrival" : "Choose departure"}
              </p>
              <div className="mb-2 flex items-center justify-between">
                <button type="button" className="grid h-11 w-11 place-items-center" onClick={() => setCursor((c) => (c.m === 1 ? { y: c.y - 1, m: 12 } : { y: c.y, m: c.m - 1 }))} aria-label="Previous month">
                  <CaretLeft size={18} />
                </button>
                <p className="m-0 font-display text-lg">{monthLabel(cursor.y, cursor.m)}</p>
                <button type="button" className="grid h-11 w-11 place-items-center" onClick={() => setCursor((c) => (c.m === 12 ? { y: c.y + 1, m: 1 } : { y: c.y, m: c.m + 1 }))} aria-label="Next month">
                  <CaretRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
                {WEEK.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((cell, i) => {
                  if (!cell) return <span key={`e-${i}`} />;
                  const disabled = cell.iso < minDate || cell.iso > DATE_MAX;
                  const selected = cell.iso === checkin || cell.iso === checkout;
                  const inRange = !!(checkin && checkout && cell.iso > checkin && cell.iso < checkout);
                  return (
                    <button
                      key={cell.iso}
                      type="button"
                      disabled={disabled}
                      onClick={() => pick(cell.iso)}
                      className={`h-9 rounded-md text-sm ${
                        selected ? "bg-ivory text-bg" : inRange ? "bg-olive/25 text-ivory" : "text-ivory-soft hover:bg-ivory/10"
                      } disabled:opacity-30`}
                    >
                      {Number(cell.iso.slice(8))}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {error ? <p className="mt-2 m-0 text-[13px] text-[#e0b4a8]">{error}</p> : null}
    </div>
  );
}

function GuestCount({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="min-w-[148px] rounded-md border border-ivory/10 px-2 py-1">
      <p className="m-0 text-[11px] leading-tight text-muted">
        {label} <span className="text-ivory/50">({hint})</span>
      </p>
      <div className="mt-1 flex items-center gap-1">
        <button type="button" className="grid h-9 w-9 place-items-center rounded-md border border-ivory/20" onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Fewer ${label}`}>
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-display text-xl leading-none">{value}</span>
        <button type="button" className="grid h-9 w-9 place-items-center rounded-md border border-ivory/20" onClick={() => onChange(Math.min(max, value + 1))} aria-label={`More ${label}`}>
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
