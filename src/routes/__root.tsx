import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/lib/auth";
import SuperiorLimousineLoader from "@/components/loadingpage";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl gradient-gold-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const path = window.location.pathname;

    // Bulletproof redirect logic to prevent infinite redirect loops on mobile refresh
    if (path === "/" || path === "/mobile" || path === "/mobile/") {
      if (isMobile && !path.startsWith("/mobile")) {
        router.navigate({ to: "/mobile", replace: true });
      } else if (!isMobile && path.startsWith("/mobile")) {
        router.navigate({ to: "/", replace: true });
      }
    }
  }, [isMobile, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster theme="dark" position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { loading } = useAuth();
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    // Keep loader on screen for at least 1.5s for beautiful brand experience
    const timer = setTimeout(() => {
      if (!loading) {
        setShowLoader(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading || showLoader) {
    return <SuperiorLimousineLoader />;
  }

  return <Outlet />;
}
