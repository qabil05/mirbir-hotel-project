import { DATE_MAX, addDays, formatDay, todayLocal } from "@/lib/dates";
import { btnPrimary } from "./Pressable";

const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function HomeStayFinder() {
  const checkin = todayLocal();
  const checkout = addDays(checkin, 3);
  const [year, month] = checkin.split("-").map(Number);

  const script = `(() => {
    const root = document.getElementById('mirbir-home-finder');
    if (!root || root.dataset.ready === '1') return;
    root.dataset.ready = '1';

    const DATE_MAX = '${DATE_MAX}';
    const today = '${checkin}';
    let checkin = '${checkin}';
    let checkout = '${checkout}';
    let adults = 2;
    let children = 0;
    let mode = null;
    let cursorY = ${year};
    let cursorM = ${month};

    const arriveButton = root.querySelector('[data-date-mode="in"]');
    const leaveButton = root.querySelector('[data-date-mode="out"]');
    const arriveText = root.querySelector('[data-arrive-text]');
    const leaveText = root.querySelector('[data-leave-text]');
    const calendarShell = root.querySelector('[data-calendar-shell]');
    const calendarCaption = root.querySelector('[data-calendar-caption]');
    const monthLabel = root.querySelector('[data-month-label]');
    const days = root.querySelector('[data-calendar-days]');
    const error = root.querySelector('[data-finder-error]');
    const checkinInput = root.querySelector('[name="checkin"]');
    const checkoutInput = root.querySelector('[name="checkout"]');
    const adultsInput = root.querySelector('[name="adults"]');
    const childrenInput = root.querySelector('[name="children"]');
    const guestsInput = root.querySelector('[name="guests"]');

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const iso = (y,m,d) => String(y).padStart(4,'0') + '-' + String(m).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    const addDays = (value, amount) => {
      const [y,m,d] = value.split('-').map(Number);
      const next = new Date(y, m - 1, d + amount);
      return iso(next.getFullYear(), next.getMonth() + 1, next.getDate());
    };
    const formatDay = (value) => {
      const [y,m,d] = value.split('-').map(Number);
      return d + ' ' + months[m - 1];
    };

    const sync = () => {
      arriveText.textContent = formatDay(checkin);
      leaveText.textContent = formatDay(checkout);
      checkinInput.value = checkin;
      checkoutInput.value = checkout;
      adultsInput.value = String(adults);
      childrenInput.value = String(children);
      guestsInput.value = String(adults + children);
      root.querySelector('[data-adults-value]').textContent = String(adults);
      root.querySelector('[data-children-value]').textContent = String(children);
    };

    const render = () => {
      monthLabel.textContent = months[cursorM - 1] + ' ' + cursorY;
      calendarCaption.textContent = mode === 'out' ? 'Choose departure' : 'Choose arrival';
      days.replaceChildren();
      const first = new Date(cursorY, cursorM - 1, 1);
      const pad = first.getDay() === 0 ? 6 : first.getDay() - 1;
      const count = new Date(cursorY, cursorM, 0).getDate();
      for (let i = 0; i < pad; i++) {
        const spacer = document.createElement('span');
        spacer.className = 'h-9';
        days.appendChild(spacer);
      }
      for (let d = 1; d <= count; d++) {
        const value = iso(cursorY, cursorM, d);
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = String(d);
        button.className = 'h-9 rounded-md text-sm transition-colors';
        const disabled = value < today || value > DATE_MAX;
        const selected = value === checkin || value === checkout;
        const inRange = checkin && checkout && value > checkin && value < checkout;
        if (disabled) {
          button.disabled = true;
          button.className += ' opacity-30';
        } else if (selected) {
          button.className += ' bg-ivory text-bg';
        } else if (inRange) {
          button.className += ' bg-olive/25 text-ivory';
        } else {
          button.className += ' text-ivory-soft hover:bg-ivory/10';
        }
        button.addEventListener('click', () => pick(value));
        days.appendChild(button);
      }
    };

    const setMode = (nextMode) => {
      mode = mode === nextMode ? null : nextMode;
      calendarShell.classList.toggle('is-open', !!mode);
      calendarShell.setAttribute('aria-hidden', mode ? 'false' : 'true');
      arriveButton.classList.toggle('bg-ivory/10', mode === 'in');
      leaveButton.classList.toggle('bg-ivory/10', mode === 'out');
      if (mode) render();
    };

    const pick = (value) => {
      if (mode === 'in') {
        checkin = value;
        if (!checkout || checkout <= checkin) checkout = addDays(checkin, 1);
        mode = 'out';
      } else {
        if (value <= checkin) {
          checkin = value;
          checkout = addDays(value, 1);
          mode = 'out';
        } else {
          checkout = value;
          mode = null;
        }
      }
      sync();
      calendarShell.classList.toggle('is-open', !!mode);
      calendarShell.setAttribute('aria-hidden', mode ? 'false' : 'true');
      arriveButton.classList.toggle('bg-ivory/10', mode === 'in');
      leaveButton.classList.toggle('bg-ivory/10', mode === 'out');
      if (mode) render();
    };

    arriveButton.addEventListener('click', () => setMode('in'));
    leaveButton.addEventListener('click', () => setMode('out'));
    root.querySelector('[data-prev-month]').addEventListener('click', () => {
      if (cursorM === 1) { cursorM = 12; cursorY -= 1; } else cursorM -= 1;
      render();
    });
    root.querySelector('[data-next-month]').addEventListener('click', () => {
      if (cursorM === 12) { cursorM = 1; cursorY += 1; } else cursorM += 1;
      render();
    });

    root.querySelectorAll('[data-guest-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.guestTarget;
        const delta = Number(button.dataset.guestAction || 0);
        if (target === 'adults') adults = Math.max(1, Math.min(6, adults + delta));
        if (target === 'children') children = Math.max(0, Math.min(4, children + delta));
        sync();
      });
    });

    root.addEventListener('submit', (event) => {
      if (!checkin || !checkout || checkout <= checkin) {
        event.preventDefault();
        error.hidden = false;
        return;
      }
      error.hidden = true;
      sync();
    });

    sync();
  })();`;

  return (
    <>
      <form
        id="mirbir-home-finder"
        action="/book"
        method="get"
        className="relative max-w-[980px] rounded-lg border border-ivory/20 bg-[rgba(18,19,18,0.62)] p-3 md:p-4 lg:backdrop-blur-md"
      >
        <div className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-[0.9fr_0.9fr_auto_auto_auto]">
          <button type="button" data-date-mode="in" className="rounded-md px-2 py-1 text-left transition-colors">
            <span className="block text-[11px] tracking-wide text-muted">Arrive</span>
            <span data-arrive-text className="mt-0.5 block font-display text-[22px] leading-none md:text-[24px]">{formatDay(checkin)}</span>
          </button>

          <button type="button" data-date-mode="out" className="rounded-md px-2 py-1 text-left transition-colors">
            <span className="block text-[11px] tracking-wide text-muted">Leave</span>
            <span data-leave-text className="mt-0.5 block font-display text-[22px] leading-none md:text-[24px]">{formatDay(checkout)}</span>
          </button>

          <GuestCount label="Adults" hint="18+" target="adults" value={2} min={1} />
          <GuestCount label="Children" hint="0-17" target="children" value={0} min={0} />

          <button type="submit" className={`${btnPrimary} w-full lg:w-auto`}>Continue</button>
        </div>

        <input type="hidden" name="checkin" defaultValue={checkin} />
        <input type="hidden" name="checkout" defaultValue={checkout} />
        <input type="hidden" name="adults" defaultValue="2" />
        <input type="hidden" name="children" defaultValue="0" />
        <input type="hidden" name="guests" defaultValue="2" />
        <input type="hidden" name="package" value="cove" />

        <div data-calendar-shell aria-hidden="true" className="mirbir-home-calendar-shell">
          <div className="min-h-0 overflow-hidden">
            <div className="mt-3 rounded-lg border border-ivory/10 bg-bg-2 p-3">
              <p data-calendar-caption className="mb-2 text-[12px] text-muted">Choose arrival</p>
              <div className="mb-2 flex items-center justify-between">
                <button type="button" data-prev-month className="grid h-11 w-11 place-items-center text-[24px] leading-none" aria-label="Previous month">‹</button>
                <p data-month-label className="m-0 font-display text-lg">Sep 2026</p>
                <button type="button" data-next-month className="grid h-11 w-11 place-items-center text-[24px] leading-none" aria-label="Next month">›</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
                {WEEK.map((day) => <span key={day}>{day}</span>)}
              </div>
              <div data-calendar-days className="mt-1 grid grid-cols-7 gap-1" />
            </div>
          </div>
        </div>

        <p data-finder-error hidden className="mt-2 m-0 text-[13px] text-[#e0b4a8]">Choose a check-out after check-in.</p>
      </form>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}

function GuestCount({
  label,
  hint,
  target,
  value,
  min,
}: {
  label: string;
  hint: string;
  target: "adults" | "children";
  value: number;
  min: number;
}) {
  return (
    <div className="min-w-[148px] rounded-md border border-ivory/10 px-2 py-1">
      <p className="m-0 text-[11px] leading-tight text-muted">{label} <span className="text-ivory/50">({hint})</span></p>
      <div className="mt-1 flex items-center gap-1">
        <button type="button" data-guest-target={target} data-guest-action="-1" className="grid h-9 w-9 place-items-center rounded-md border border-ivory/20 text-lg" aria-label={`Fewer ${label}`}>−</button>
        <span data-adults-value={target === "adults" ? "" : undefined} data-children-value={target === "children" ? "" : undefined} className="w-6 text-center font-display text-xl leading-none">{Math.max(min, value)}</span>
        <button type="button" data-guest-target={target} data-guest-action="1" className="grid h-9 w-9 place-items-center rounded-md border border-ivory/20 text-lg" aria-label={`More ${label}`}>+</button>
      </div>
    </div>
  );
}
