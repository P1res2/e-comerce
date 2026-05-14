"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "T-shirt",
    href: "/products?category=t-shirt",
    description:
      "Camiseta de manga curta com estampa exclusiva, perfeita para compor looks casuais e confortáveis no dia a dia.",
  },
  {
    title: "Hoodie",
    href: "/products?category=hoodie",
    description: "Moletom com capuz e bolso canguru, ideal para dias frios.",
  },
  {
    title: "Denim Jeans",
    href: "/products?category=denim-jeans",
    description: "Calça jeans clássica com corte reto e lavagem moderna.",
  },
  {
    title: "Sneakers",
    href: "/products?category=sneakers",
    description: "Tênis casual confortável para o uso diário e urbano.",
  },
  {
    title: "Jackets",
    href: "/products?category=jackets",
    description:
      "Jaqueta corta-vento resistente à água e com design esportivo.",
  },
  {
    title: "Accessories",
    href: "/products?category=accessories",
    description: "Bonés, cintos e mochilas para completar o seu visual.",
  },
];

export function AppNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#">Novidades</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#">Catalógo</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
