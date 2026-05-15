import { AppNavigationMenu } from "@/components/navegation-menu";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { auth, signOut } from "@/lib/auth";
import { CircleUser, SearchIcon, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";

export async function AppHeader() {
  const session = await auth();

  return (
    <header className="sticky z-50 top-0 h-24 w-full px-32 flex justify-between items-center bg-zinc-200 dark:bg-black">
      <div className="flex">
        <Logo />
      </div>

      <div className="flex">
        <AppNavigationMenu />

        <div className="flex gap-1 pl-16 pr-16">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-1 pr-16">
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              "use server";
              if (!session?.user) redirect("/login");
              await signOut();
            }}
          >
            <CircleUser />
          </Button>
          <Button variant="outline" size="icon">
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </header>
  );
}
