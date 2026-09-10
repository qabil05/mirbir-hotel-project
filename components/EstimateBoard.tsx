"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DATE_MAX, addDays, nightsBetween, todayLocal } from "@/lib/dates";
import { TAX, extras, packages, rooms } from "@/lib/data";
import { PressLink, btnPrimary } from "./Pressable";
import { StayFinder, type StayValues } from "./StayFinder";

type EstimateInitial = {
  room?: string;
  package?: string;
  checkin?: string;
  checkout?: string;
  adults?: string;
  guests?: string;
  children?: string;
};

function safeCount(value: string | undefined, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

export function EstimateBoard({ initial = {} }: { initial?: EstimateInitial }) {
  const fallbackCheckin = todayLocal();
  const seededCheckin = initial.checkin || fallbackCheckin;
  const seededCheckout = initial.checkout || addDays(seededCheckin, 3);
  const seededAdults = safeCount(initial.adults || initial.guests, 2, 1, 6);
  const seededChildren = safeCount(initial.children, 0, 0, 4);
  const seededRoom = rooms.some((room) => room.id === initial.room) ? initial.room! : rooms[0].id;
  const seededPackage = packages.some((pkg) => pkg.id === initial.package) ? initial.package! : "cove";

  const [roomId, setRoomId] = useState(seededRoom);
  const [pkgId, setPkgId] = useState(seededPackage);
  const [checkin, setCheckin] = useState(seededCheckin);
  const [checkout, setCheckout] = useState(seededCheckout);
  const [adults, setAdults] = useState(seededAdults);
  const [children, setChildren] = useState(seededChildren);
  const [picked, setPicked] = useState<Record<string, boolean>>({
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

  function handleStay(values: StayValues) {
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
    window.history.replaceState(null, "", `/plan?${next.toString()}`);
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

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <StayFinder
          intent="estimate"
          hidePackages
          initial={{ checkin, checkout, adults, children, package: pkgId }}
          onConfirm={handleStay}
        />
        <div className="mt-10">
          <h2 className="mb-4 font-display text-[clamp(28px,3vw,40px)]">Room</h2>
          <div className="grid gap-2">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoomId(r.id)}
                className={`grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-lg border p-2 text-left ${
                  roomId === r.id ? "border-olive" : "border-ivory/10"
                }`}
              >
                <Image src={r.image} alt="" width={96} height={64} sizes="96px" className="h-16 w-24 rounded object-cover" loading="lazy" />
                <span>
                  <strong className="font-display text-lg">{r.name}</strong>
                  <span className="mt-1 block text-sm text-muted">
                    {r.size} m² · {r.guests} guests
                  </span>
                </span>
                <span className="pr-2 text-sm">EUR {r.price}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="mb-4 font-display text-[clamp(28px,3vw,40px)]">Package</h2>
          <p className="mb-4 max-w-[52ch] text-ivory-soft">One choice. The nightly total on the right follows it.</p>
          <div className="grid gap-3">
            {packages.map((p) => {
              const night = Math.round(room.price * p.mult);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPkgId(p.id)}
                  className={`rounded-lg border p-4 text-left ${
                    pkgId === p.id ? "border-olive bg-olive/10" : "border-ivory/10"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl">{p.name}</span>
                    <span className="text-bronze">EUR {night}/night</span>
                  </div>
                  <p className="mt-1 text-sm text-ivory-soft">{p.summary}</p>
                  <p className="mt-2 text-[13px] text-muted">{p.includes.join(", ")}</p>
                  <p className="mt-1 text-[12px] text-bronze">{p.priceHint}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="mb-4 font-display text-[clamp(28px,3vw,40px)]">Add if you want</h2>
          <div className="grid gap-3">
            {extras.map((e) => {
              const on = !!picked[e.id];
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setPicked((state) => ({ ...state, [e.id]: !state[e.id] }))}
                  className={`flex items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    on ? "border-olive bg-olive/10" : "border-ivory/10 bg-transparent"
                  }`}
                >
                  <span>
                    <span className="block">{e.name}</span>
                    <span className="text-sm text-muted">
                      EUR {e.each}
                      {e.per === "adult-night" ? " / adult / night" : " once"}
                    </span>
                  </span>
                  <span
                    className={`relative h-7 w-12 rounded-full transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "bg-olive" : "bg-ivory/20"}`}
                    aria-hidden
                  >
                    <span
                      className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <aside className="sticky top-24 rounded-lg border border-ivory/10 bg-bg-2 p-6">
        <p className="text-muted">
          {nights} night{nights === 1 ? "" : "s"} · {adults} adult{adults === 1 ? "" : "s"}
          {children ? ` · ${children} child${children === 1 ? "" : "ren"}` : ""}
        </p>
        <p className="mt-2 font-display text-3xl">{room.name}</p>
        <p className="text-bronze">
          {pkg.name} · {pkg.summary}
        </p>
        <ul className="mt-6 grid gap-2 p-0 text-ivory-soft">
          <li className="flex justify-between border-t border-ivory/10 pt-3">
            <span>
              {pkg.name} × {nights}
            </span>
            <span>EUR {ledger.roomTotal}</span>
          </li>
          {ledger.extraLines.map((line) => (
            <li key={line.name} className="flex justify-between">
              <span>{line.name}</span>
              <span>EUR {line.amount}</span>
            </li>
          ))}
          <li className="flex justify-between">
            <span>Tax</span>
            <span>EUR {ledger.tax}</span>
          </li>
        </ul>
        <p className="mt-6 font-display text-[40px] leading-none">EUR {ledger.total}</p>
        <p className="mt-2 text-sm text-muted">Through {DATE_MAX.slice(0, 4)}. Cancel {pkg.cancelDays} days before arrival.</p>
        <div className="mt-6">
          <PressLink href={`/book?${q.toString()}`} className={btnPrimary}>
            Hold this stay
          </PressLink>
        </div>
      </aside>
    </div>
  );
}
