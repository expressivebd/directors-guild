// app/members/[id]/page.tsx
import { fetchMemberById } from "@/lib/members-data"
import MemberDetailClient from "@/components/members/member-detail-client"
import { notFound } from "next/navigation"

interface PageProps {
  params: { id: string }
}

// ✅ Server Component – no React hooks here
export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params
  const member = await fetchMemberById(id)

  if (!member) notFound()

  return <MemberDetailClient member={member} />
}
