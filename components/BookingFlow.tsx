"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { DATE_MAX, addDays, nightsBetween, todayLocal } from "@/lib/dates";
import { packages, rooms } from "@/lib/data";
import { PressButton, btnGhost, btnPrimary } from "./Pressable";
import { StayFinder } from "./StayFinder";

const steps = ["Dates", "Room", "Guest", "Review", "Confirmed"];

export function BookingFlow() {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(params.get("room") && params.get("checkin") ? 2 : 1);
  const [checkin, setCheckin] = useState(params.get("checkin") || "");
  const [checkout, setCheckout] = useState(params.get("checkout") || "");
  const [guests, setGuests] = useState(Number(params.get("guests") || 2));
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
    return (
      <aside className="rounded-lg border border-ivory/10 bg-bg-2 p-6" aria-live="polite">
        <h3 className="mb-2 font-display text-[22px]">Your stay</h3>
        <p className="text-muted">
          {checkin || "Dates open"} to {checkout || "open"}
        </p>
        <p className="text-muted">
          {guests} guest{guests === 1 ? "" : "s"} · {nights} night{nights === 1 ? "" : "s"}
        </p>
        {room ? (
          <>
            <p className="mt-4">{room.name}</p>
            <p className="text-muted">{rate.name}</p>
            <p className="mt-4 font-display text-[28px]">
              EUR {total} <span className="font-sans text-sm text-muted">inc. tax</span>
            </p>
          </>
        ) : (
          <p className="mt-4 text-muted">Select a room to see the total.</p>
        )}
      </aside>
    );
  }

  function onDates(e: FormEvent) {
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

  function onRoom(e: FormEvent) {
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

  function onGuest(e: FormEvent) {
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
      const rec = { code: next, checkin, checkout, guests, roomId, total, created: new Date().toISOString() };
      const all = JSON.parse(localStorage.getItem("mirbir-stays") || "[]");
      all.push(rec);
      localStorage.setItem("mirbir-stays", JSON.stringify(all));
      sessionStorage.setItem("mirbir-ref", next);
      setHolding(false);
      setStep(5);
    }, 900);
  }

  const panel =
    step === 1 ? (
      <div>
        <StayFinder
          intent="inline"
          initial={{
            checkin,
            checkout,
            adults: guests,
            children: 0,
            package: pkgId,
          }}
          onConfirm={(values) => {
            setCheckin(values.checkin);
            setCheckout(values.checkout);
            setGuests(values.adults + values.children);
            setPkgId(values.package);
            setError("");
            setStep(2);
          }}
        />
        {error ? <p className="mt-3 text-[13px] text-[#e0b4a8]">{error}</p> : null}
      </div>
    ) : step === 2 ? (
      available.length ? (
        <form onSubmit={onRoom} className="grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-lg border border-ivory/10 bg-bg-2 p-6">
            <p className="mb-4 text-[12px] tracking-[0.2em] text-muted">Available stays</p>
            <div className="grid gap-3">
              {available.map((r) => (
                <label
                  key={r.id}
                  className={`grid cursor-pointer grid-cols-[120px_1fr_auto] items-center gap-4 rounded-lg border p-3 ${
                    roomId === r.id ? "border-olive" : "border-ivory/10"
                  }`}
                >
                  <img src={r.image} alt="" className="h-20 w-[120px] rounded object-cover" />
                  <span>
                    <strong className="text-ivory">{r.name}</strong>
                    <br />
                    <span className="text-ivory-soft">
                      {r.size} m2 · {r.guests} guests
                    </span>
                  </span>
                  <span className="font-sans text-ivory">from EUR {r.price}</span>
                  <input className="sr-only" type="radio" name="room" checked={roomId === r.id} onChange={() => setRoomId(r.id)} />
                </label>
              ))}
            </div>
            {error ? <p className="mt-3 text-[13px] text-[#e0b4a8]">{error}</p> : null}
            <PressButton type="submit" className={`${btnPrimary} mt-5`}>Continue</PressButton>
          </div>
          <aside className="rounded-lg border border-ivory/10 bg-bg-2 p-6">
            <p className="mb-4 text-[12px] tracking-[0.2em] text-muted">How you stay</p>
            <div className="grid gap-2">
              {packages.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setPkgId(r.id)}
                  className={`rounded-lg border p-3 text-left transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    pkgId === r.id ? "border-olive bg-olive/10" : "border-ivory/10"
                  }`}
                >
                  <span className="font-display text-lg">{r.name}</span>
                  <span className="ml-2 text-[12px] text-bronze">{r.priceHint}</span>
                  <p className="mt-1 text-sm text-ivory-soft">{r.summary}</p>
                </button>
              ))}
            </div>
            <div className="mt-6 border-t border-ivory/10 pt-5">
              {room ? (
                <>
                  <p className="text-sm text-ivory-soft">
                    {room.name} · {rate.name} · {nights} night{nights === 1 ? "" : "s"} · {guests} guest{guests === 1 ? "" : "s"}
                  </p>
                  <p className="mt-2 text-sm text-muted">Room EUR {sub} · Tax EUR {tax}</p>
                  <p className="mt-3 font-display text-[32px] leading-none">EUR {total}</p>
                  <p className="mt-1 text-[12px] text-muted">What you pay for this stay</p>
                </>
              ) : (
                <p className="text-ivory-soft">Select a room to see the full total.</p>
              )}
            </div>
          </aside>
        </form>
      ) : (
        <div className="rounded-lg border border-ivory/10 bg-bg-2 p-6">
          <p>No rooms hold this party size for those dates. Try fewer guests, or write to stay@mirbir.com.</p>
          <PressButton className={`${btnGhost} mt-4`} onClick={() => setStep(1)}>Change dates</PressButton>
        </div>
      )
    ) : step === 3 ? (
      <form onSubmit={onGuest} className="grid gap-4 rounded-lg border border-ivory/10 bg-bg-2 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-muted">Full name<input required className="min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="flex flex-col gap-1.5 text-xs text-muted">Email<input required type="email" className="min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-muted">Phone<input required className="min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
          <label className="flex flex-col gap-1.5 text-xs text-muted">Country<input required className="min-h-10 border-0 border-b border-ivory/20 bg-transparent text-ivory" value={country} onChange={(e) => setCountry(e.target.value)} /></label>
        </div>
        <label className="flex flex-col gap-1.5 text-xs text-muted">Special requests<textarea rows={3} className="border-0 border-b border-ivory/20 bg-transparent text-ivory" value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
        <label className="flex items-center gap-2.5 text-sm">
          <input type="checkbox" required />
          <span>I agree to the <Link href="/privacy">privacy policy</Link> and house rules.</span>
        </label>
        {error ? <p className="text-[13px] text-[#e0b4a8]">{error}</p> : null}
        <PressButton type="submit" className={btnPrimary}>Review stay</PressButton>
      </form>
    ) : step === 4 && room ? (
      <div className="rounded-lg border border-ivory/10 bg-bg-2 p-6">
        <h3 className="font-display text-[22px]">Review</h3>
        <p className="mt-2">{room.name}<br /><span className="text-muted">{rate.kind} {rate.name}. {rate.note}</span></p>
        <p>{checkin} to {checkout} · {guests} guests</p>
        <p>{name}<br />{email}<br />{phone}</p>
        <p>Room EUR {sub} · Tax EUR {tax}</p>
        <p className="mt-4 font-display text-[28px]">EUR {total} <span className="font-sans text-sm text-muted">total</span></p>
        <PressButton className={`${btnPrimary} mt-4`} disabled={holding} onClick={confirm}>
          {holding ? "Holding your room" : "Confirm reservation"}
        </PressButton>
      </div>
    ) : (
      <div className="overflow-hidden rounded-lg border border-ivory/10 bg-bg-2">
        <img src={room?.image || "/images/hero-cove.jpg"} alt="" className="h-56 w-full object-cover" />
        <div className="p-8">
          <p className="text-[12px] tracking-[0.22em] text-bronze">Reservation confirmed</p>
          <h3 className="mt-3 font-display text-[clamp(32px,5vw,56px)] leading-none">Thank you for choosing MIRBIR</h3>
          <p className="mt-4 text-ivory-soft">Your stay is reserved. {room?.name}. {checkin} to {checkout}. {guests} guests.</p>
          <p className="mt-6 font-display text-[28px] tracking-[0.08em]">{code}</p>
          <p className="mt-2 text-muted">We will write to {email} with the details of the house.</p>
          <p className="mt-6 font-display text-[40px] leading-none">EUR {total}</p>
          <Link href="/" className={`${btnGhost} mt-8 inline-flex`}>Return home</Link>
        </div>
      </div>
    );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2 text-[13px] text-muted">
        {steps.map((s, i) => (
          <span key={s} className={i + 1 === step ? "text-ivory" : ""}>
            {s}{i < steps.length - 1 ? " / " : ""}
          </span>
        ))}
      </div>
      <div className={`grid items-start gap-10 ${step !== 2 && step < 5 ? "lg:grid-cols-[1.2fr_.8fr]" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
        {step !== 2 && step < 5 ? summary() : null}
      </div>
    </>
  );
}
