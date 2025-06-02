"use client";
import type { JSX } from "react";
import { useState } from "react";
import Script from "next/script";
import { LoadingView } from "./LoadingUI";
import { ErrorView } from "./ErrorUI";
import { toast } from "sonner";

// biome-ignore lint/style/useNamingConvention: it ok man, really
export const TourSearchModuleITTourComponent = (): JSX.Element => {
  const [scriptStatus, setScriptStatus] = useState<"loading" | "loaded" | "error">("loading");

  const handleScriptLoad = (): void => {
    setScriptStatus("loaded");
  };

  const handleScriptError = (error: Error): void => {
    setScriptStatus("error");
    toast.error("Failed to load ITTour widget script", {
      description: error.message,
    });
  };

  const handleRetry = (): void => {
    setScriptStatus("loading");
    window.location.reload();
  };

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper min-h-[300px] relative">
        {scriptStatus === "loading" && <LoadingView />}
        {scriptStatus === "error" && <ErrorView onRetry={handleRetry} />}

        <div
          id="itTourWidgetWrapper"
          data-agency-id="16227"
          style={{ display: scriptStatus === "loaded" ? "block" : "none" }}
        />

        <Script
          id="itTourWidgetScriptJsx"
          src="https://www.ittour.com.ua/tour_search.jsx?id=6D50577G9738029N10922600&ver=3"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        />
      </div>
    </div>
  );
};
