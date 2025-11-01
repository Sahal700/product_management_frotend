import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

function ResponsiveDrawerDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "sm",
  contentClassName = "",
}) {
  const [isMobile, setIsMobile] = React.useState(false);

  // Check if mobile on mount and window resize
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[95vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto max-h-[75vh]">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  const sizeToMaxWidth = {
    sm: "sm:max-w-[425px]",
    md: "sm:max-w-[640px]",
    lg: "sm:max-w-[820px]",
    xl: "sm:max-w-[980px]",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${
          sizeToMaxWidth[size] || sizeToMaxWidth.sm
        } max-h-[85vh] overflow-y-auto ${contentClassName}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export { ResponsiveDrawerDialog };
