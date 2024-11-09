import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Ambulance, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import DatePicker from "@/components/ui/date-picker";
import { GlobalDateFilters } from "@/modules/layout/layout";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

// Menu items.
const items = [
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Rides",
    url: "/dashboard/rides",
    icon: Ambulance,
  },
];

const userDetails = {
  name: "Jenny Kurtz",
  email: "jennyktz@gmail.com",
  // avatar_url: "https://github.com/shadcn.png",
  avatar_url:
    "https://cdn.prod.website-files.com/636496d3f0ebfdaba9784655/65b1fa51a745f5bfcb5a9d7b_jenny-chu.webp",
};

export function AppSidebar() {
  const router = useRouter();
  const query = router.pathname;

  const [dateFilters, setDateFilters] = useAtom(GlobalDateFilters);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* logo */}
          <SidebarGroupLabel>
            <Link
              href="/"
              className="text-2xl font-bold flex flex-row justify-start items-center gap-1"
            >
              {/* <SquareActivity strokeWidth={2.25} className="text-[#137cf1]" /> */}
              <span>
                <span className="text-black">{"🚑 "}</span>
                <span className="text-black">{"Med"}</span>
                <span className="text-[#137cf1]">{"Go"}</span>
              </span>
            </Link>
          </SidebarGroupLabel>

          {/* content */}
          <SidebarGroupContent>
            <div className="px-1 py-4">
              <DatePicker
                date={
                  !!dateFilters.date_min
                    ? new Date(dateFilters.date_min)
                    : new Date()
                }
                setDate={(date: Date | null) => {
                  setDateFilters((prev) => ({
                    ...prev,
                    date_min: date?.toISOString() ?? null,
                    date_max: date?.toISOString() ?? null,
                  }));
                }}
              />
            </div>

            {/* menu */}
            <SidebarMenu>
              {items.map((item) => {
                const isCurrentItemActive = query.endsWith(
                  item.title.toLowerCase()
                );

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isCurrentItemActive}>
                      <Link
                        href={item.url}
                        className={
                          isCurrentItemActive
                            ? "underline underline-offset-2"
                            : ""
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        <div className="flex items-center space-x-4 p-2">
          <Avatar>
            <AvatarImage src={userDetails.avatar_url} alt={userDetails.name} />
            <AvatarFallback>.</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-bold leading-none">{userDetails.name}</p>
            <p className="text-sm text-muted-foreground">{userDetails.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
