import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/mobile/")({
  component: () => {
    return <Navigate to="/mobile/dashboard" replace />;
  },
});
