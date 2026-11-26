// app/dashboard/layout.jsx
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

// Key: allow this route to block navigation, rendering dynamically on each request
export const instant = false;

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const ownerId = process.env.OWNER_CLERK_USER_ID;

  if (!ownerId || userId !== ownerId) {
    notFound();
  }

  return <>{children}</>;
}