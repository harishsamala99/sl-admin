import * as React from "react";
import { BottomNav } from "./BottomNav";
import { MobileHeader } from "./MobileHeader";
import bgVideo from "@/assets/bg.mp4?url";
import SpaceBackground from "../shared/SpaceBackground";

export function MobileLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-hidden bg-background">
      {/* Space Background Layer */}
      <SpaceBackground />

      {/* Ambient glowing backdrops on mobile */}
      <div className="glow-orb top-[-150px] left-[-150px] opacity-60 animate-pulse duration-[8000ms] pointer-events-none" />
      <div className="glow-orb bottom-[-250px] right-[-150px] opacity-40 animate-pulse duration-[12000ms] pointer-events-none" />

      <video
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-10 pointer-events-none select-none filter brightness-[0.7]"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/95 via-background/90 to-background/98 pointer-events-none" />

      <MobileHeader title={title} />

      {/* 
        Main content area needs padding for header (pt-14) and bottom nav (pb-16).
        Additional pb-safe is needed for iOS safe areas.
      */}
      <main className="flex-1 overflow-y-auto w-full pb-20 pt-4 px-4 scroll-smooth z-10">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
