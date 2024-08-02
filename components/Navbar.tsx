import Link from "next/link";
import { icons, Package2, PanelLeft, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", link: "/", icon: "House" },
  { label: "Income Database", link: "/income-database", icon: "Database" },
  { label: "Expenses Database", link: "/expenses-database", icon: "Database" },
];

function DesktopNavbar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Finance Tracker</span>
        </Link>
        {items.map((item) => (
          <NavbarItem
            key={item.label}
            label={item.label}
            link={item.link}
            icon={item.icon as keyof typeof icons}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Finance Tracker</span>
          </Link>
          {items.map((item) => (
            <NavbarItem
              key={item.label}
              label={item.label}
              link={item.link}
              icon={item.icon as keyof typeof icons}
              mobile
            />
          ))}
          <Link
            href="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function NavbarItem({
  link,
  label,
  icon,
  mobile,
}: {
  link: string;
  label: string;
  icon: keyof typeof icons;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return mobile ? (
    <Link
      href={link}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
      <Icon name={icon} />
      <span>{label}</span>
    </Link>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={link}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
              isActive ? "text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <Icon name={icon} />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { DesktopNavbar, MobileNavbar };
