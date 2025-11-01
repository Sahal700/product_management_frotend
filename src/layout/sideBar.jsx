import {
  LayoutDashboard,
  Users,
  Users2,
  GraduationCap,
  Banknote,
  FileText,
  Shield,
  Megaphone,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingCart,
  Store,
  List,
  Currency,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Primary menu items
const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Customers", url: "/customers", icon: UsersIcon },
  { title: "Sales", url: "/sales", icon: Currency },
  { title: "Purchase", url: "/purchase", icon: Store },
  { title: "Payments", url: "/payments", icon: Banknote },
  // { title: "Finance", url: "/staff/finance", icon: Banknote },
  // { title: "Reports", url: "/staff/reports", icon: FileText },
  // { title: "Administration", url: "/staff/admin", icon: Shield },
  // { title: "Communication", url: "/staff/communication", icon: Megaphone },
];

const navItemsWithSubItems = [
  {
    title: "Production",
    icon: Store,
    items: [
      {
        title: "Production List",
        url: "/productions",
        icon: List,
      },
    ],
  },
  {
    title: "Store",
    icon: Store,
    items: [
      {
        title: "Meterial List",
        url: "/meterails",
        icon: List,
      },
    ],
  },
];

function SideBar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/"
                        ? location.pathname === "/"
                        : location.pathname === item.url ||
                          location.pathname.startsWith(item.url)
                    }
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {navItemsWithSubItems.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={location.pathname.startsWith("/staff/settings")}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={location.pathname.startsWith(
                          "/staff/settings"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname.startsWith(
                                subItem.url
                              )}
                            >
                              <Link to={subItem.url}>
                                <subItem.icon />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideBar;
