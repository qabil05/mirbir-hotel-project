import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { DATE_MAX, addDays, formatDay, todayLocal } from "__MIRBIR_BASE__assets/js-v8/lib/dates.js";
import { btnPrimary } from "./Pressable.js";
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
      event.preventDefault();
      if (!checkin || !checkout || checkout <= checkin) {
        error.hidden = false;
        return;
      }
      error.hidden = true;
      sync();
      const q = new URLSearchParams({
        checkin,
        checkout,
        guests: String(adults + children),
        adults: String(adults),
        children: String(children),
        package: 'cove'
      });
      window.location.assign('__MIRBIR_BASE__book/?' + q.toString());
    });

    sync();
  })();`;
    return (_jsxs(_Fragment, { children: [_jsxs("form", { id: "mirbir-home-finder", action: "__MIRBIR_BASE__book/", method: "get", className: "relative max-w-[980px] rounded-lg border border-ivory/20 bg-[rgba(18,19,18,0.62)] p-3 md:p-4 lg:backdrop-blur-md", children: [_jsxs("div", { className: "grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-[0.9fr_0.9fr_auto_auto_auto]", children: [_jsxs("button", { type: "button", "data-date-mode": "in", className: "rounded-md px-2 py-1 text-left transition-colors", children: [_jsx("span", { className: "block text-[11px] tracking-wide text-muted", children: "Arrive" }), _jsx("span", { "data-arrive-text": true, className: "mt-0.5 block font-display text-[22px] leading-none md:text-[24px]", children: formatDay(checkin) })] }), _jsxs("button", { type: "button", "data-date-mode": "out", className: "rounded-md px-2 py-1 text-left transition-colors", children: [_jsx("span", { className: "block text-[11px] tracking-wide text-muted", children: "Leave" }), _jsx("span", { "data-leave-text": true, className: "mt-0.5 block font-display text-[22px] leading-none md:text-[24px]", children: formatDay(checkout) })] }), _jsx(GuestCount, { label: "Adults", hint: "18+", target: "adults", value: 2, min: 1 }), _jsx(GuestCount, { label: "Children", hint: "0-17", target: "children", value: 0, min: 0 }), _jsx("button", { type: "submit", className: `${btnPrimary} w-full lg:w-auto`, children: "Continue" })] }), _jsx("input", { type: "hidden", name: "checkin", defaultValue: checkin }), _jsx("input", { type: "hidden", name: "checkout", defaultValue: checkout }), _jsx("input", { type: "hidden", name: "adults", defaultValue: "2" }), _jsx("input", { type: "hidden", name: "children", defaultValue: "0" }), _jsx("input", { type: "hidden", name: "guests", defaultValue: "2" }), _jsx("input", { type: "hidden", name: "package", value: "cove" }), _jsx("div", { "data-calendar-shell": true, "aria-hidden": "true", className: "mirbir-home-calendar-shell", children: _jsx("div", { className: "min-h-0 overflow-hidden", children: _jsxs("div", { className: "mt-3 rounded-lg border border-ivory/10 bg-bg-2 p-3", children: [_jsx("p", { "data-calendar-caption": true, className: "mb-2 text-[12px] text-muted", children: "Choose arrival" }), _jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("button", { type: "button", "data-prev-month": true, className: "grid h-11 w-11 place-items-center text-[24px] leading-none", "aria-label": "Previous month", children: "\u2039" }), _jsx("p", { "data-month-label": true, className: "m-0 font-display text-lg", children: "Sep 2026" }), _jsx("button", { type: "button", "data-next-month": true, className: "grid h-11 w-11 place-items-center text-[24px] leading-none", "aria-label": "Next month", children: "\u203A" })] }), _jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-[11px] text-muted", children: WEEK.map((day) => _jsx("span", { children: day }, day)) }), _jsx("div", { "data-calendar-days": true, className: "mt-1 grid grid-cols-7 gap-1" })] }) }) }), _jsx("p", { "data-finder-error": true, hidden: true, className: "mt-2 m-0 text-[13px] text-[#e0b4a8]", children: "Choose a check-out after check-in." })] }), _jsx("script", { dangerouslySetInnerHTML: { __html: script } })] }));
}
function GuestCount({ label, hint, target, value, min, }) {
    return (_jsxs("div", { className: "min-w-[148px] rounded-md border border-ivory/10 px-2 py-1", children: [_jsxs("p", { className: "m-0 text-[11px] leading-tight text-muted", children: [label, " ", _jsxs("span", { className: "text-ivory/50", children: ["(", hint, ")"] })] }), _jsxs("div", { className: "mt-1 flex items-center gap-1", children: [_jsx("button", { type: "button", "data-guest-target": target, "data-guest-action": "-1", className: "grid h-9 w-9 place-items-center rounded-md border border-ivory/20 text-lg", "aria-label": `Fewer ${label}`, children: "\u2212" }), _jsx("span", { "data-adults-value": target === "adults" ? "" : undefined, "data-children-value": target === "children" ? "" : undefined, className: "w-6 text-center font-display text-xl leading-none", children: Math.max(min, value) }), _jsx("button", { type: "button", "data-guest-target": target, "data-guest-action": "1", className: "grid h-9 w-9 place-items-center rounded-md border border-ivory/20 text-lg", "aria-label": `More ${label}`, children: "+" })] })] }));
}
