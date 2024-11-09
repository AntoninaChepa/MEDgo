import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Calendar,
  CalendarDays,
  Car,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
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

import DatePicker from "@/modules/layout/datePicker";
import Link from "next/link";
import { useRouter } from "next/router";

// Menu items.
const items = [
  // {
  //   title: "Home",
  //   url: "/",
  //   icon: Home,
  // },
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Rides",
    url: "/dashboard/rides",
    icon: Car,
  },
  // {
  //   title: "Inbox",
  //   url: "#",
  //   icon: Inbox,
  // },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const router = useRouter();
  const query = router.pathname;
  console.log(query);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/" className="text-lg font-extrabold text-black">
              MEDgo
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="mt-1 mb-2 px-2">
              <DatePicker></DatePicker>
            </div>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={
                        query.endsWith(item.title.toLowerCase())
                          ? "underline"
                          : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center space-x-4 p-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>.</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-bold leading-none">Shadcn</p>
            <p className="text-sm text-muted-foreground">m@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
