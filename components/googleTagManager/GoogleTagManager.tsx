"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";

function GoogleTagManager({ gtmId }: { gtmId: string | undefined }) {
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window.gtag === "function") {
        window.gtag("config", gtmId, {
          page_path: url,
        });
        console.log(`Page view tracked: ${url}`); // Optional: for debugging
      }
    };

    // Track the initial page load
    if (pathname) {
      handleRouteChange(pathname);
    }

    // Listen to pathname changes and track page views
    const handlePathnameChange = (newPathname: string) => {
      handleRouteChange(newPathname);
    };

    // We use a custom event listener to track pathname changes.
    window.addEventListener("popstate", () => handlePathnameChange(pathname));

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("popstate", () =>
        handlePathnameChange(pathname)
      );
    };
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtmId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default GoogleTagManager;
