import { createFileRoute } from "@tanstack/react-router";
import Pricing from "../components/Pricing";

export const Route = createFileRoute("/pricing")({
	head: () => ({
		title: "Pricing — Devonyx | Transparent Packages for Development, Marketing & Design",
		meta: [
			{
				name: "description",
				content:
					"Simple, transparent pricing for SaaS development, performance marketing, and brand design. Starter packages from $99. Negotiable pricing for startups and scaling teams.",
			},
			{
				name: "keywords",
				content:
					"digital agency pricing, SaaS development cost, web app development pricing, marketing agency pricing, brand design cost, MVP development price, Devonyx pricing",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "Pricing — Devonyx | Transparent Packages",
			},
			{
				property: "og:description",
				content:
					"Simple, transparent pricing for development, marketing, and design. Starter packages from $99.",
			},
			{ property: "og:url", content: "https://devonyx.in/pricing" },
			{ property: "og:image", content: "https://devonyx.in/og-image.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "Pricing — Devonyx | Transparent Packages",
			},
			{
				name: "twitter:description",
				content:
					"Simple, transparent pricing for development, marketing, and design. Starter packages from $99.",
			},
			{ name: "twitter:image", content: "https://devonyx.in/og-image.png" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in/pricing",
			},
		],
	}),
	component: PricingPage,
});

function PricingPage() {
	return <Pricing />;
}