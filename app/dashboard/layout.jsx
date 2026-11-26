import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

// ✅ Επιτρέπει στο route να μπλοκάρει αντί να αποτυγχάνει το prerender
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