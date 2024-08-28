"use client";

import clsx from "clsx";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onNavigate = (href: string, pro: boolean) => {
    if (pro) {
      return;
    } else {
      router.push(href);
    }
  };

  const routes = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      pro: false,
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
      pro: true,
    },
    {
      href: "/company/new",
      icon: Plus,
      label: "Create",
      pro: true,
    },
  ];

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.href}
              className={clsx(
                "flex flex-col gap-1 items-center p-1 rounded-lg hover:bg-primary/10 hover:opacity-100 transition-colors  cursor-pointer flex-1",
                {
                  "bg-primary/10": route.href == pathname,
                  "opacity-75": route.href != pathname,
                }
              )}
              onClick={() => {
                onNavigate(route.href, route.pro);
              }}
            >
              <div
                key={route.href}
                className="flex flex-col items-center flex-1"
              >
                {<route.icon />}

                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SideBar };
