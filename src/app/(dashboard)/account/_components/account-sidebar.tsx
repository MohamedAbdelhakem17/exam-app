// account-sidebar.tsx
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import React from "react";

export default function AccountSidebar() {
  return (
    <aside className="w-72 h-full bg-red-600 fixed flex flex-col justify-between p-6">
      {/* Menu */}
      <h2 className="text-lg font-semibold mb-4">Text</h2>

      {/* Logout button */}
      <Button
        variant={"red"}
        className="flex items-center justify-start gap-x-2.5"
      >
        <LogOutIcon className="rotate-180" />
        <span>Logout</span>
      </Button>
    </aside>
  );
}
