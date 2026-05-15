import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const token = await prisma.verificationToken.findUnique({
    where: { token: searchParams.token }
  })

  if (!token || token.expires < new Date()) {
    redirect("/login?error=invalid-token")
  }

  await prisma.user.update({
    where: { email: token.identifier },
    data: { emailVerified: new Date() }
  })

  await prisma.verificationToken.delete({
    where: { token: searchParams.token }
  })

  redirect("/login?verified=true")
}
