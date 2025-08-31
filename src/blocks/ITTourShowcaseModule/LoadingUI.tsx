import type { JSX } from "react";

export const LoadingView = (): JSX.Element => {
    return (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Tour Showcase</h3>
                <p className="text-gray-500">Please wait while we load the tour showcase widget...</p>
            </div>
        </div>
    );
}; 