"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { DATE_MAX, addDays, clampDate, todayLocal } from "@/lib/dates";
import { PressButton, btnPrimary } from "./Pressable";

export function SearchBar({
  roomId,
  maxGuests = 6,
}: {
  roomId?: string;
  maxGuests?: number;
}) {
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

  function onCheckin(value: string) {
    const nextIn = clampDate(value, minDate, DATE_MAX);
    if (!nextIn) {
      setCheckin("");
      return;
    }
    setCheckin(nextIn);
    const minOut = addDays(nextIn, 1);
    setCheckout((current) => {
      if (!current || current <= nextIn) return minOut > DATE_MAX ? DATE_MAX : minOut;
      return current > DATE_MAX ? DATE_MAX : current;
    });
  }

  function onCheckout(value: string) {
    const minOut = checkin ? addDays(checkin, 1) : addDays(minDate, 1);
    const nextOut = clampDate(value, minOut, DATE_MAX);
    setCheckout(nextOut);
  }

  function onSubmit(e: FormEvent) {
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
    if (roomId) q.set("room", roomId);
    router.push(`/book?${q.toString()}`);
  }

  const minOut = checkin ? addDays(checkin, 1) : addDays(minDate, 1);

  return (
    <form
      onSubmit={onSubmit}
      className="grid max-w-[920px] grid-cols-1 items-end gap-3 rounded-lg border border-ivory/20 bg-[rgba(18,19,18,0.55)] p-4 backdrop-blur-md md:grid-cols-[1.1fr_1.1fr_.9fr_auto]"
    >
      <label className="flex flex-col gap-1.5 text-xs tracking-wide text-muted">
        Check-in
        <input
          type="date"
          required
          value={checkin}
          min={minDate}
          max={DATE_MAX}
          onChange={(e) => onCheckin(e.target.value)}
          className="min-h-10 w-full border-0 border-b border-ivory/20 bg-transparent py-2 text-base text-ivory outline-none focus:border-olive"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs tracking-wide text-muted">
        Check-out
        <input
          type="date"
          required
          value={checkout}
          min={minOut}
          max={DATE_MAX}
          onChange={(e) => onCheckout(e.target.value)}
          className="min-h-10 w-full border-0 border-b border-ivory/20 bg-transparent py-2 text-base text-ivory outline-none focus:border-olive"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs tracking-wide text-muted">
        Guests
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="min-h-10 w-full border-0 border-b border-ivory/20 bg-transparent py-2 text-base text-ivory outline-none focus:border-olive"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n} className="bg-bg-2">
              {n}
            </option>
          ))}
        </select>
      </label>
      <PressButton type="submit" className={btnPrimary}>
        Check dates
      </PressButton>
      {error ? (
        <p className="col-span-full m-0 text-[13px] text-[#e0b4a8]" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
