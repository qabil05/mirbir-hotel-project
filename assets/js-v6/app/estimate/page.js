import { redirect } from "/assets/js-v6/shims/next-navigation.js";
export const metadata = {
    title: "Plan your stay",
};
export default function EstimateRedirect() {
    redirect("/plan");
}
