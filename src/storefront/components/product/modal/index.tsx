"use client";

import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/storefront/components/ui/drawer";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export function ProductModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Drawer
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DrawerContent className="h-[95%]">
        <DrawerClose>
          <Button
            size="icon"
            variant="outline"
            className="border-0 absolute size-7 z-10 top-2 right-4"
          >
            <X className="size-6" />
          </Button>
        </DrawerClose>
        <ScrollArea className="h-auto overflow-y-auto">
          <div className="container">{children}</div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
