"use client";

import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
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
      <DrawerHeader className="sr-only">
        <DrawerTitle>Produktsida</DrawerTitle>
        <DrawerDescription>
          Här kan du se mer information om produkten.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerContent className="h-[95%]">
        <DrawerClose asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-0 absolute size-7 z-10 top-2 right-4"
          >
            <X className="size-6" />
          </Button>
        </DrawerClose>
        <ScrollArea className="h-auto overflow-y-auto">{children}</ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
