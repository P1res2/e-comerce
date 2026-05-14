import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <div>
      <form action={handleSignOut}>
        <Button className="w-full" variant="outline" type="submit">
          Sair
        </Button>
      </form>
      Bem vindo {session.user.name} ao Dashboard...
      <Image
        src={session.user.image as string}
        alt="User icon"
        width={100}
        height={100}
      />
    </div>
  );
}
