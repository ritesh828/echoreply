import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return <DashboardClient user={session.user} />
}
