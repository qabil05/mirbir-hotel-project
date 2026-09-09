import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Plan your stay",
};

export default function EstimateRedirect() {
  redirect("/plan");
}
