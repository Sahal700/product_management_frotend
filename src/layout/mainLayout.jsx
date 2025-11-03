import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "./sideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <SidebarProvider>
      <SideBar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default MainLayout;
