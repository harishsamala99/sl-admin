import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, e as useRouter, L as Link, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { E as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://uuwmvjezfxcmxpgndcan.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1d212amV6ZnhjbXhwZ25kY2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Njk3NjEsImV4cCI6MjA5NDE0NTc2MX0.nyu_uB9rTWcpqzPtN3BVeSr0B3D0Hn-aMjVUuM7u_E8";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const Ctx = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };
  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    });
    return { error: error?.message ?? null };
  };
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { session, user: session?.user ?? null, loading, signIn, signUp, signOut }, children });
}
function useAuth() {
  const v = reactExports.useContext(Ctx);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
}
function SuperiorLimousineLoader() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let stars = [];
    let meteors = [];
    let t = 0;
    let animId;
    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.8,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        blink: Math.random() * Math.PI * 2
      });
    }
    const meteorInterval = setInterval(() => {
      meteors.push({
        x: 0.1 + Math.random() * 0.5,
        y: 0.01 + Math.random() * 0.4,
        len: 0.06 + Math.random() * 0.08,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }, 3500);
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.02;
      stars.forEach((s) => {
        const alpha = 0.4 + 0.6 * ((Math.sin(s.blink + t * 0.8) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,200,${alpha * s.a + 0.2})`;
        ctx.fill();
      });
      meteors = meteors.filter((m) => m.life < m.maxLife);
      meteors.forEach((m) => {
        const progress = m.life / m.maxLife;
        const alpha = Math.sin(progress * Math.PI);
        const sx = (m.x - progress * 0.15) * W;
        const sy = (m.y + progress * 0.06) * H;
        const ex = sx + m.len * W * 0.5;
        const ey = sy + m.len * H * 0.3;
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, `rgba(200,168,0,0)`);
        grad.addColorStop(0.4, `rgba(255,240,160,${alpha * 0.8})`);
        grad.addColorStop(1, `rgba(200,168,0,0)`);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        m.life++;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(meteorInterval);
      cancelAnimationFrame(animId);
    };
  }, []);
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 6}s`
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, #1a1200 0%, #0a0800 60%, #000 100%)",
        fontFamily: "Georgia, serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              position: "absolute",
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "#c8a800",
              left: p.left,
              bottom: -4,
              opacity: 0,
              animationName: "floatUp",
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite"
            }
          },
          p.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", zIndex: 10, textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 110, height: 110, margin: "0 auto 28px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(200,168,0,0.3)",
              animationName: "ringPulse",
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              inset: 8,
              borderRadius: "50%",
              border: "1.5px solid transparent",
              borderTopColor: "#c8a800",
              animationName: "spinCW",
              animationDuration: "4s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              inset: 18,
              borderRadius: "50%",
              border: "1px solid transparent",
              borderRightColor: "#c8a800",
              animationName: "spinCCW",
              animationDuration: "6s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite"
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            fontFamily: "Georgia, serif",
            fontSize: "clamp(32px, 6vw, 54px)",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#fff",
            textTransform: "uppercase",
            animationName: "fadeSlideUp",
            animationDuration: "1.2s",
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
            opacity: 0
          }, children: "Superior" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            fontFamily: "Georgia, serif",
            fontSize: "clamp(18px, 4vw, 32px)",
            fontWeight: 300,
            letterSpacing: "0.45em",
            color: "#c8a800",
            textTransform: "uppercase",
            marginTop: 6,
            animationName: "fadeSlideUp",
            animationDuration: "1.6s",
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
            opacity: 0
          }, children: "Limousine LLC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            margin: "18px 0 12px",
            animationName: "fadeIn",
            animationDuration: "2.2s",
            animationTimingFunction: "ease",
            animationFillMode: "forwards",
            opacity: 0
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 70, height: 1, background: "linear-gradient(to right, transparent, #c8a800)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#a89060", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "sans-serif" }, children: "Executive Transportation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 70, height: 1, background: "linear-gradient(to left, transparent, #c8a800)" } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            color: "#6a5a38",
            fontSize: 12,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            animationName: "fadeIn",
            animationDuration: "2.8s",
            animationTimingFunction: "ease",
            animationFillMode: "forwards",
            opacity: 0,
            marginBottom: 26
          }, children: "Elegance • Comfort • Prestige" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: 320,
            height: 2,
            margin: "0 auto",
            background: "rgba(200,168,0,0.1)",
            borderRadius: 99,
            overflow: "hidden",
            animationName: "fadeIn",
            animationDuration: "2s",
            animationTimingFunction: "ease",
            animationFillMode: "forwards",
            opacity: 0
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            height: "100%",
            width: "30%",
            background: "linear-gradient(to right, #6a4e00, #c8a800, #ffe066)",
            borderRadius: 99,
            animationName: "barSlide",
            animationDuration: "2.2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            marginTop: 12,
            fontSize: 10,
            letterSpacing: "0.55em",
            color: "#4a3e22",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            animationName: "blink",
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite"
          }, children: "Arriving in style…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-70vh) scale(0.3); }
        }
        @keyframes spinCW  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes ringPulse {
          0%,100% { transform: scale(1); opacity: 0.3; }
          50%      { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes letterGlow {
          0%,100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes barSlide {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(400%); }
        }
        @keyframes blink {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      ` })
      ]
    }
  );
}
const appCss = "/assets/styles-1q3oDYcc.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl gradient-gold-text", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-md gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 inline-flex items-center justify-center rounded-md gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Superior Limousine LLC — Executive Transportation CRM" },
      { name: "description", content: "Superior Limousine LLC Executive Transportation — admin CRM for managing clients, reservations, chauffeurs, and billing." },
      { property: "og:title", content: "Superior Limousine LLC — Executive Transportation CRM" },
      { name: "twitter:title", content: "Superior Limousine LLC — Executive Transportation CRM" },
      { property: "og:description", content: "Superior Limousine LLC Executive Transportation — admin CRM for managing clients, reservations, chauffeurs, and billing." },
      { name: "twitter:description", content: "Superior Limousine LLC Executive Transportation — admin CRM for managing clients, reservations, chauffeurs, and billing." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/30ed0db1-d60a-4f07-b521-e25121078ecf/id-preview-349cb232--7b650318-0b15-45fd-8cf7-83951b7b40af.lovable.app-1778593842846.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/30ed0db1-d60a-4f07-b521-e25121078ecf/id-preview-349cb232--7b650318-0b15-45fd-8cf7-83951b7b40af.lovable.app-1778593842846.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$f.useRouteContext();
  const router2 = useRouter();
  const isMobile = useIsMobile();
  reactExports.useEffect(() => {
    const path = window.location.pathname;
    if (isMobile && !path.startsWith("/mobile")) {
      const target = path === "/" ? "/mobile" : `/mobile${path}`;
      if (target !== path) {
        router2.navigate({ to: target, replace: true });
      }
    } else if (!isMobile && path.startsWith("/mobile")) {
      let target = path.replace("/mobile", "");
      if (target === "") target = "/";
      if (target !== path) {
        router2.navigate({ to: target, replace: true });
      }
    }
  }, [isMobile, router2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppContent, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right", richColors: true })
  ] }) });
}
function AppContent() {
  const { loading } = useAuth();
  const [showLoader, setShowLoader] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        setShowLoader(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [loading]);
  if (loading || showLoader) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SuperiorLimousineLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter$d = () => import("./route-BFKKdXun.mjs");
const Route$e = createFileRoute("/mobile")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const Route$d = createFileRoute("/mobile/")({
  beforeLoad: () => {
    throw redirect({
      to: "/mobile/dashboard"
    });
  }
});
const $$splitComponentImporter$c = () => import("./index-BEfGXuhe.mjs");
const Route$c = createFileRoute("/_web/")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("../_authenticated-a6MIpKw0.mjs");
const Route$b = createFileRoute("/mobile/_authenticated")({
  beforeLoad: () => {
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("../_authenticated-DPkCGOiE.mjs");
const Route$a = createFileRoute("/_web/_authenticated")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./dashboard-BYWjoRf0.mjs");
const Route$9 = createFileRoute("/mobile/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./calendar-0LR5B4R8.mjs");
const Route$8 = createFileRoute("/mobile/_authenticated/calendar")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./bookings-BID02DxE.mjs");
const Route$7 = createFileRoute("/mobile/_authenticated/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard-BQsB_TND.mjs");
const Route$6 = createFileRoute("/_web/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./calendar-w4oBc9lp.mjs");
const Route$5 = createFileRoute("/_web/_authenticated/calendar")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./bookings-BztvkXzu.mjs");
const Route$4 = createFileRoute("/_web/_authenticated/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-BEtCEO9B.mjs");
const Route$3 = createFileRoute("/mobile/_authenticated/customers/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./customers.index-6dVdk6Jf.mjs");
const Route$2 = createFileRoute("/_web/_authenticated/customers/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_id-CrYSAn9X.mjs");
const Route$1 = createFileRoute("/mobile/_authenticated/customers/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./customers._id-BgXjpwNq.mjs");
const Route = createFileRoute("/_web/_authenticated/customers/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MobileRouteRoute = Route$e.update({
  id: "/mobile",
  path: "/mobile",
  getParentRoute: () => Route$f
});
const MobileIndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => MobileRouteRoute
});
const WebIndexRoute = Route$c.update({
  id: "/_web/",
  path: "/",
  getParentRoute: () => Route$f
});
const MobileAuthenticatedRoute = Route$b.update({
  id: "/_authenticated",
  getParentRoute: () => MobileRouteRoute
});
const WebAuthenticatedRoute = Route$a.update({
  id: "/_web/_authenticated",
  getParentRoute: () => Route$f
});
const MobileAuthenticatedDashboardRoute = Route$9.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => MobileAuthenticatedRoute
});
const MobileAuthenticatedCalendarRoute = Route$8.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => MobileAuthenticatedRoute
});
const MobileAuthenticatedBookingsRoute = Route$7.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => MobileAuthenticatedRoute
});
const WebAuthenticatedDashboardRoute = Route$6.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => WebAuthenticatedRoute
});
const WebAuthenticatedCalendarRoute = Route$5.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => WebAuthenticatedRoute
});
const WebAuthenticatedBookingsRoute = Route$4.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => WebAuthenticatedRoute
});
const MobileAuthenticatedCustomersIndexRoute = Route$3.update({
  id: "/customers/",
  path: "/customers/",
  getParentRoute: () => MobileAuthenticatedRoute
});
const WebAuthenticatedCustomersIndexRoute = Route$2.update({
  id: "/customers/",
  path: "/customers/",
  getParentRoute: () => WebAuthenticatedRoute
});
const MobileAuthenticatedCustomersIdRoute = Route$1.update({
  id: "/customers/$id",
  path: "/customers/$id",
  getParentRoute: () => MobileAuthenticatedRoute
});
const WebAuthenticatedCustomersIdRoute = Route.update({
  id: "/customers/$id",
  path: "/customers/$id",
  getParentRoute: () => WebAuthenticatedRoute
});
const MobileAuthenticatedRouteChildren = {
  MobileAuthenticatedBookingsRoute,
  MobileAuthenticatedCalendarRoute,
  MobileAuthenticatedDashboardRoute,
  MobileAuthenticatedCustomersIdRoute,
  MobileAuthenticatedCustomersIndexRoute
};
const MobileAuthenticatedRouteWithChildren = MobileAuthenticatedRoute._addFileChildren(MobileAuthenticatedRouteChildren);
const MobileRouteRouteChildren = {
  MobileAuthenticatedRoute: MobileAuthenticatedRouteWithChildren,
  MobileIndexRoute
};
const MobileRouteRouteWithChildren = MobileRouteRoute._addFileChildren(
  MobileRouteRouteChildren
);
const WebAuthenticatedRouteChildren = {
  WebAuthenticatedBookingsRoute,
  WebAuthenticatedCalendarRoute,
  WebAuthenticatedDashboardRoute,
  WebAuthenticatedCustomersIdRoute,
  WebAuthenticatedCustomersIndexRoute
};
const WebAuthenticatedRouteWithChildren = WebAuthenticatedRoute._addFileChildren(WebAuthenticatedRouteChildren);
const rootRouteChildren = {
  MobileRouteRoute: MobileRouteRouteWithChildren,
  WebAuthenticatedRoute: WebAuthenticatedRouteWithChildren,
  WebIndexRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  router as r,
  supabase as s,
  useAuth as u
};
