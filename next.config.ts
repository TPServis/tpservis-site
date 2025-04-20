import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import redirects from "./redirects.js";

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
				const url = new URL(item);
				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(":", "") as "http" | "https",
				};
			}),
			{
				hostname: "utfs.io",
				protocol: "https",
			},
			{
				hostname: "o0z4coknhf.ufs.sh",
				protocol: "https",
			},
			{
				hostname: "localhost",
				protocol: "http",
			},
			{
				hostname: "www.ittour.com.ua",
				protocol: "https",
			},
		],
	},

	reactStrictMode: true,
	redirects: redirects as any,
	compiler: {
		styledComponents: true,
		removeConsole: process.env.NODE_ENV === "production",
	},
	experimental: {
		reactCompiler: true,
	},
	headers: async () => {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value:
							NEXT_PUBLIC_SERVER_URL === "http://localhost:3000"
								? "no-store, no-cache, must-revalidate, proxy-revalidate"
								: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

export default withPayload(nextConfig);
