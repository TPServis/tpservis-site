"use client";
import type { JSX } from "react";
import { useState, useEffect, useRef } from "react";
import { LoadingView } from "@/blocks/ITTourShowcaseModule/LoadingUI";
import { ErrorView } from "@/blocks/ITTourShowcaseModule/ErrorUI";
import { toast } from "sonner";

// biome-ignore lint/style/useNamingConvention: it ok man, really
export const ITTourShowcaseModuleComponent = (): JSX.Element => {
    const [scriptStatus, setScriptStatus] = useState<"loading" | "loaded" | "error">("loading");
    const [retryCount, setRetryCount] = useState(0);
    const widgetRef = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    const handleRetry = (): void => {
        setScriptStatus("loading");
        setRetryCount(prev => prev + 1);
    };

    // Clean up script when component unmounts
    useEffect(() => {
        return () => {
            if (scriptRef.current) {
                scriptRef.current.remove();
                scriptRef.current = null;
            }
            // Also clean up any remaining script by ID
            const remainingScript = document.getElementById("itTourShowcaseScriptJsx");
            if (remainingScript) {
                remainingScript.remove();
            }
        };
    }, []);

    // Load script when component mounts or retry count changes
    useEffect(() => {
        if (!widgetRef.current) return;

        // Remove any existing script first
        if (scriptRef.current) {
            scriptRef.current.remove();
        }
        const existingScript = document.getElementById("itTourShowcaseScriptJsx");
        if (existingScript) {
            existingScript.remove();
        }

        // Clear the widget container
        const widgetContainer = document.getElementById("showcase_hotprice_v3_showcase_module");
        if (widgetContainer) {
            widgetContainer.innerHTML = "";
        }

        // Ensure DOM is ready before loading script
        const loadScript = () => {
            // Double-check that the widget container exists
            const container = document.getElementById("showcase_hotprice_v3_showcase_module");
            if (!container) {
                console.error("ITTour hot price widget container not found");
                setScriptStatus("error");
                return;
            }

            // Try different script configurations based on retry count
            let scriptUrl: string;

            if (retryCount === 0) {
                // First try: Original showcase approach with type=110
                scriptUrl = `https://www.ittour.com.ua/tour_search.jsx?id=7054106D9421GN2011729085&type=110&num=1&t=${Date.now()}`;
            } else if (retryCount === 1) {
                // Second try: Use type=103 (original showcase type)
                scriptUrl = `https://www.ittour.com.ua/tour_search.jsx?id=7054106D9421GN2011729085&type=103&num=1&t=${Date.now()}`;
            } else {
                // Third try: Use the working ID from the search module
                scriptUrl = `https://www.ittour.com.ua/tour_search.jsx?id=6D50577G9738029N10922600&type=110&num=1&t=${Date.now()}`;
            }

            console.log(`ITTour: Attempting to load script (attempt ${retryCount + 1}):`, scriptUrl);

            // Create script element
            const script = document.createElement("script");
            script.id = "itTourShowcaseScriptJsx";
            script.src = scriptUrl;
            script.type = "text/javascript";
            script.async = true;
            script.crossOrigin = "anonymous"; // Add CORS attribute

            // Set up timeout for script loading
            const timeoutId = setTimeout(() => {
                console.warn("ITTour script loading timeout");
                setScriptStatus("error");
                toast.error("ITTour widget loading timeout", {
                    description: "The widget took too long to load",
                });
            }, 10000); // 10 second timeout

            script.onload = () => {
                clearTimeout(timeoutId);
                console.log("ITTour script loaded successfully");
                setScriptStatus("loaded");

                // Check if widget content was actually loaded after a short delay
                setTimeout(() => {
                    const container = document.getElementById("showcase_hotprice_v3_showcase_module");
                    if (container && container.innerHTML.trim() === "") {
                        console.warn("ITTour widget container is empty after script load");
                        // Don't set error status here, let the widget load naturally
                    }
                }, 2000);
            };

            script.onerror = (error) => {
                clearTimeout(timeoutId);
                console.error("ITTour script loading error:", error);
                setScriptStatus("error");

                if (retryCount < 2) {
                    toast.error(`ITTour widget failed to load (attempt ${retryCount + 1})`, {
                        description: "Trying alternative configuration...",
                    });
                } else {
                    toast.error("ITTour widget failed to load", {
                        description: "All attempts failed. The service may be temporarily unavailable.",
                    });
                }
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
    }, [retryCount]); // Depend on retryCount to reload when retrying

    return (
        <div className="w-full container-spacing">
            <div className="container-wrapper min-h-[300px] relative" ref={widgetRef}>
                {scriptStatus === "loading" && <LoadingView />}
                {scriptStatus === "error" && (
                    <ErrorView
                        onRetry={handleRetry}
                        message={retryCount >= 2 ? "All attempts failed. The ITTour service may be temporarily unavailable." : undefined}
                    />
                )}

                <div id="showcase_hotprice_v3_showcase_module" />

                {/* Debug info in development */}
                {process.env.NODE_ENV === "development" && (
                    <div className="text-xs text-gray-500 mt-2">
                        Debug: Attempt {retryCount + 1}, Status: {scriptStatus}
                    </div>
                )}
            </div>
        </div>
    );
}; 