import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar, MobileTopBar } from "@/components/web/AppSidebar";
import SpaceBackground from "@/components/shared/SpaceBackground";

export const Route = createFileRoute("/_web/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="relative min-h-screen flex w-full overflow-hidden">
      {/* Space Background Layer */}
      <SpaceBackground />

      {/* Ambient premium glowing backdrops */}
      <div className="glow-orb top-[-100px] left-[-100px] opacity-70 animate-pulse duration-[8000ms] pointer-events-none" />
      <div className="glow-orb bottom-[-200px] right-[-100px] opacity-40 animate-pulse duration-[12000ms] pointer-events-none" />

      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/80 to-background/95 pointer-events-none select-none" />
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <MobileTopBar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
