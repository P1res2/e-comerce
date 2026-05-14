import { ShoppingBag } from "lucide-react";

export function Logo({ size = "default" }: { size?: "icon" | "default" }) {
  if (size === "icon") {
    return <ShoppingBag />;
  }
  return (
    <div className="flex flex-row">
      <ShoppingBag />
      <span>EComerce</span>
    </div>
  );
}
