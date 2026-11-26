import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieBanner } from "../components/CookieBanner";
import { initMetaPixel } from "../lib/meta-pixel";

const CONSENT_DEFAULTS = "window.consentAskEverywhere = false;\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag() {\n  dataLayer.push(arguments);\n}\nvar outsideConsentRegions = window.consentAskEverywhere === true ? \"denied\" : \"granted\";\ngtag(\"consent\", \"default\", {\n  analytics_storage: outsideConsentRegions,\n  ad_storage: outsideConsentRegions,\n  ad_user_data: outsideConsentRegions,\n  ad_personalization: outsideConsentRegions,\n});\ngtag(\"consent\", \"default\", {\n  analytics_storage: \"denied\",\n  ad_storage: \"denied\",\n  ad_user_data: \"denied\",\n  ad_personalization: \"denied\",\n  wait_for_update: 500,\n  region:\n    \"AT,BE,BG,HR,CY,CZ,DK,EE,FI,FR,DE,GR,HU,IE,IT,LV,LT,LU,MT,NL,PL,PT,RO,SK,SI,ES,SE,IS,LI,NO,GB,CH,RE,GP,MQ,GF,YT,MF,AX,CA-QC\".split(\n      \",\",\n    ),\n});\n(function () {\n  var signals = {\n    analytics: [\"analytics_storage\"],\n    advertising: [\"ad_storage\", \"ad_user_data\", \"ad_personalization\"],\n  };\n  for (var purpose in signals) {\n    var choice = null;\n    try {\n      var saved = JSON.parse(localStorage.getItem(\"cookie_consent_\" + purpose) || \"null\");\n      if (\n        saved &&\n        (saved.choice === \"denied\" || (saved.choice === \"granted\" && Date.now() - saved.at < 365 * 86400000))\n      ) {\n        choice = saved.choice;\n      }\n    } catch (e) {}\n    if (navigator.globalPrivacyControl === true) choice = \"denied\";\n    if (!choice) continue;\n    var update = {};\n    signals[purpose].forEach(function (signal) {\n      update[signal] = choice;\n    });\n    gtag(\"consent\", \"update\", update);\n  }\n})();\n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wedding on a Budget" },
      { name: "description", content: "Plan your wedding for under $10,000." },
    ],
    scripts: [{ children: CONSENT_DEFAULTS }],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    initMetaPixel();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieBanner />
    </QueryClientProvider>
  );
}
