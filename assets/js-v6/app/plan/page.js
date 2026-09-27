import { jsx as _jsx, jsxs as _jsxs } from "/assets/vendor-v6/react-jsx-runtime.js";
import { EstimateBoard } from "/assets/js-v6/components/EstimateBoard.js";
import { PageHero } from "/assets/js-v6/components/PageHero.js";
import { addDays, todayLocal } from "/assets/js-v6/lib/dates.js";
export const metadata = {
    title: "Plan your stay",
    description: "Plan a MIRBIR stay by room, nights, and how you would like to be hosted.",
};
function first(value) {
    return Array.isArray(value) ? value[0] : value;
}
export default function PlanPage({ searchParams } = {}) {
    const params = searchParams || Object.fromEntries(new URLSearchParams(window.location.search));
    const checkin = first(params.checkin) || todayLocal();
    const checkout = first(params.checkout) || addDays(checkin, 3);
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: "/images/horizon-night.jpg", alt: "Night interior looking toward the water", title: "Plan your stay", text: "Room, nights, and how you would like to be hosted. A total, quietly.", compact: true }), _jsx("section", { className: "py-24", children: _jsx("div", { className: "mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]", children: _jsx(EstimateBoard, { initial: {
                            room: first(params.room),
                            package: first(params.package),
                            checkin,
                            checkout,
                            adults: first(params.adults),
                            guests: first(params.guests),
                            children: first(params.children),
                        } }) }) })] }));
}
