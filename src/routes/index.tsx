import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import LogoMarquee from "../components/LogoMarquee";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Work from "../components/Work";
import About from "../components/About";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";

export const Route = createFileRoute("/")({
	head: () => ({
		title: "Devonyx — Build, Brand & Grow | Digital Agency for Startups",
		meta: [
			{
				name: "description",
				content:
					"Devonyx helps founders build scalable SaaS products, craft unforgettable brands, and grow revenue with performance marketing. Full-service digital agency trusted across the USA, UAE, Netherlands, New Zealand & India.",
			},
			{
				name: "keywords",
				content:
					"digital agency, startup development, SaaS development, brand design, performance marketing, MVP development, web app development, mobile app development, SEO, lead generation, Devonyx",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: "Devonyx — Build, Brand & Grow" },
			{
				property: "og:description",
				content:
					"Full-service digital agency helping founders build, brand & grow. SaaS development, brand design, and performance marketing across 5 regions.",
			},
			{ property: "og:url", content: "https://devonyx.in" },
			{ property: "og:image", content: "https://devonyx.in/og-image.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Devonyx — Build, Brand & Grow" },
			{
				name: "twitter:description",
				content:
					"Full-service digital agency helping founders build, brand & grow. SaaS development, brand design, and performance marketing.",
			},
			{ name: "twitter:image", content: "https://devonyx.in/og-image.png" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in",
			},
		],
	}),
	component: Home,
});

function Home() {
	return (
		<>
			<Hero />

			<LogoMarquee />
			<Stats />
			<Services />
			<Work />
			<Process />
			<About />
			<Testimonials />
			<Pricing />
			<Contact />
		</>
	);
}
