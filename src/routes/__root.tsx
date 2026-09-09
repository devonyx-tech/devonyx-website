import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import PostHogProvider from "@/integrations/posthog/provider";

import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";

import { getLocale } from "#/paraglide/runtime";

import appCss from "@/styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Booker from "#/components/Book";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		if (typeof document !== "undefined") {
			document.documentElement.setAttribute("lang", getLocale());
		}
	},

	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Devonyx — Build, Brand & Grow | Digital Agency for Startups",
			},
			{
				name: "description",
				content:
					"Devonyx is a full-service digital agency helping founders build scalable software, craft unforgettable brands, and grow revenue — trusted across the USA, UAE, Netherlands, New Zealand & India.",
			},
			{
				name: "keywords",
				content:
					"digital agency, startup development, SaaS product development, brand design, performance marketing, SEO, web app development, mobile app development, MVP development, lead generation, logo design, Devonyx",
			},
			{ name: "author", content: "Devonyx" },
			{ name: "robots", content: "index, follow" },
			{ name: "theme-color", content: "#2B4BFF" },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Devonyx" },
			{ property: "og:title", content: "Devonyx — Build, Brand & Grow" },
			{
				property: "og:description",
				content:
					"A full-service digital agency helping founders build scalable software, craft unforgettable brands, and grow revenue. Trusted across 5 regions.",
			},
			{ property: "og:url", content: "https://devonyx.in" },
			{ property: "og:image", content: "https://devonyx.in/og-image.png" },
			{ property: "og:locale", content: "en_US" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Devonyx — Build, Brand & Grow" },
			{
				name: "twitter:description",
				content:
					"A full-service digital agency helping founders build scalable software, craft unforgettable brands, and grow revenue.",
			},
			{ name: "twitter:image", content: "https://devonyx.in/og-image.png" },
			{ name: "twitter:site", content: "@devonyx" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
});

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Devonyx",
	url: "https://devonyx.in",
	logo: "https://devonyx.in/logo.png",
	description:
		"Full-service digital agency helping founders build scalable software, craft unforgettable brands, and grow revenue.",
	address: {
		"@type": "PostalAddress",
		addressCountry: "IN",
	},
	contactPoint: {
		"@type": "ContactPoint",
		email: "query@devonix.in",
		availableLanguage: "English",
	},
	sameAs: [],
	areaServed: [
		{ "@type": "Country", name: "United States" },
		{ "@type": "Country", name: "United Arab Emirates" },
		{ "@type": "Country", name: "Netherlands" },
		{ "@type": "Country", name: "New Zealand" },
		{ "@type": "Country", name: "India" },
	],
};

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang={getLocale()}>
			<head>
				<HeadContent />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="min-h-screen bg-paper text-ink">
				<PostHogProvider>
					<Header />
					<main>{children}</main>
					<Booker />
					<Footer />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</PostHogProvider>
				<Scripts />
			</body>
		</html>
	);
}
