"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/common/ui/sheet";

import React from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer";
import { useMediaQuery } from "usehooks-ts";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { VisuallyHidden } from "@reach/visually-hidden";

interface FormDrawerProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  header: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FromDrawer: React.FC<FormDrawerProps> = ({ trigger, children, header, isOpen, onOpenChange }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="flex flex-col p-0 gap-0 md:max-w-[538px] overflow-y-auto">
          <SheetHeader className="space-y-0 px-6 py-4">
            <SheetTitle>{header}</SheetTitle>
            <VisuallyHidden>
              <DrawerDescription>description</DrawerDescription>
            </VisuallyHidden>
          </SheetHeader>
          <div className="border-y flex-grow px-6 py-4">{children}</div>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{header}</DrawerTitle>
            <VisuallyHidden>
              <DrawerDescription>description</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="h-[92vh] px-6 py-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default FromDrawer;

export const SubmitFormButton = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode } & ButtonProps
>(({ children, disabled, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn("w-full mt-auto", className)}
      size={"xl"}
      disabled={disabled}
      type="submit"
      {...props}
    >
      {disabled && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
});

SubmitFormButton.displayName = "SubmitFormButton"; 