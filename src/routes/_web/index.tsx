import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_web/")({
  component: () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    
    if (isMobile) {
      return <Navigate to="/mobile/dashboard" replace />;
    }
    
    return <Navigate to="/dashboard" replace />;
  },
});
