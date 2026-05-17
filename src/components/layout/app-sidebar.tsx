"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ExternalLink,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();

  const items = [
    {
      href: "/dashboard/overview",
      icon: LayoutDashboard,
      label: "Visão Geral",
    },
    { href: "/dashboard/products", icon: Package, label: "Produtos" },
    { href: "/dashboard/orders", icon: ShoppingBag, label: "Pedidos" },
    { href: "/dashboard/users", icon: Users, label: "Usuários" },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger size="sm" />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon /> {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/">
              <ExternalLink /> Ir para o inicio
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
