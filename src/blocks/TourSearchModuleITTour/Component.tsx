"use client";
import type { JSX } from "react";
import { useState, useEffect, useRef } from "react";
import { LoadingView } from "./LoadingUI";
import { ErrorView } from "./ErrorUI";
import { toast } from "sonner";

// biome-ignore lint/style/useNamingConvention: it ok man, really
export const TourSearchModuleITTourComponent = (): JSX.Element => {
  const [scriptStatus, setScriptStatus] = useState<"loading" | "loaded" | "error">("loading");
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const handleRetry = (): void => {
    setScriptStatus("loading");
    // Force reload by reloading the entire page as fallback
    window.location.reload();
  };

  // Clean up script when component unmounts
  useEffect(() => {
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
      // Also clean up any remaining script by ID
      const remainingScript = document.getElementById("itTourWidgetScriptJsx");
      if (remainingScript) {
        remainingScript.remove();
      }
    };
  }, []);

  // Load script when component mounts
  useEffect(() => {
    if (!widgetRef.current) return;

    // Remove any existing script first
    if (scriptRef.current) {
      scriptRef.current.remove();
    }
    const existingScript = document.getElementById("itTourWidgetScriptJsx");
    if (existingScript) {
      existingScript.remove();
    }

    // Clear the widget container
    const widgetContainer = document.getElementById("itTourWidgetWrapper");
    if (widgetContainer) {
      widgetContainer.innerHTML = "";
    }

    // Ensure DOM is ready before loading script
    const loadScript = () => {
      // Double-check that the widget container exists
      const container = document.getElementById("itTourWidgetWrapper");
      if (!container) {
        console.error("ITTour widget container not found");
        setScriptStatus("error");
        return;
      }

      // Create only one script element with the expected ID and source
      const script = document.createElement("script");
      script.id = "itTourWidgetScriptJsx";
      script.src = `https://www.ittour.com.ua/tour_search.jsx?id=6D50577G9738029N10922600&ver=3&t=${Date.now()}`;
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        setScriptStatus("loaded");
      };

      script.onerror = (error) => {
        setScriptStatus("error");
        toast.error("Failed to load ITTour widget script", {
          description: "Network error or script unavailable",
        });
      };

      // Append script to document head
      document.head.appendChild(script);
      scriptRef.current = script;
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(loadScript, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper min-h-[300px] relative" ref={widgetRef}>
        {scriptStatus === "loading" && <LoadingView />}
        {scriptStatus === "error" && <ErrorView onRetry={handleRetry} />}

        <div id="itTourWidgetWrapper" data-agency-id="16227" />
      </div>
    </div>
  );
};
