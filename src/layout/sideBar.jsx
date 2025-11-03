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
  LineChart,
  Package,
  CreditCard,
  Truck,
  Factory,
  ClipboardList,
  Warehouse,
  Wallet,
  Plane,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Sales", url: "/sales", icon: LineChart },
  { title: "Purchase", url: "/purchase", icon: Package },
  { title: "Suppliers", url: "/suppliers", icon: Truck },
  // { title: "Finance", url: "/staff/finance", icon: Banknote },
  // { title: "Reports", url: "/staff/reports", icon: FileText },
  // { title: "Administration", url: "/staff/admin", icon: Shield },
  // { title: "Communication", url: "/staff/communication", icon: Megaphone },
];

const navItemsWithSubItems = [
  {
    title: "Payments",
    icon: CreditCard,
    items: [
      {
        title: "Customer Payments",
        url: "/payments",
        icon: Wallet,
      },
      {
        title: "Supplier Payments",
        url: "/supplier_payments",
        icon: Banknote,
      },
    ],
  },
  {
    title: "Production",
    icon: Factory,
    items: [
      {
        title: "Production List",
        url: "/productions",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Store",
    icon: Warehouse,
    items: [
      {
        title: "Material List",
        url: "/materials",
        icon: ClipboardList,
      },
    ],
  },
];

function SideBar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-3 px-4 py-4">
          <div className="flex flex-col">
            <span
              className="font-bold text-2xl tracking-wide"
              style={{ color: "#C9A961" }}
            >
              AIRLINES
            </span>
            <span
              className="text-xs text-center tracking-widest"
              style={{ color: "#C9A961" }}
            >
              CATERERS
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
