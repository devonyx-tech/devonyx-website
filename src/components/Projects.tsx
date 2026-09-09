import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	ExternalLink,
	Github,
	Image,
	Layers,
	Rocket,
} from "lucide-react";
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { Suspense, useMemo, useRef, useState } from "react";
import type { ProjectItem } from "@/lib/notion";
import { getProjectsFn } from "@/lib/server-functions";
import { Reveal } from "../hooks";

export const Route = createFileRoute("/projects")({
	head: () => ({
		title: "Projects — Devonyx | Open Source & Client Work",
		meta: [
			{
				name: "description",
				content:
					"A curated collection of production systems, research prototypes, and client deliveries across AI, data, and design. See what Devonyx builds.",
			},
			{
				name: "keywords",
				content:
					"Devonyx projects, SaaS case studies, web app portfolio, AI projects, client work, open source projects, digital agency portfolio",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "Projects — Devonyx | Open Source & Client Work",
			},
			{
				property: "og:description",
				content:
					"A curated collection of production systems, research prototypes, and client deliveries across AI, data, and design.",
			},
			{ property: "og:url", content: "https://devonyx.in/projects" },
			{ property: "og:image", content: "https://devonyx.in/og-image.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "Projects — Devonyx | Open Source & Client Work",
			},
			{
				name: "twitter:description",
				content:
					"A curated collection of production systems, research prototypes, and client deliveries.",
			},
			{ name: "twitter:image", content: "https://devonyx.in/og-image.png" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in/projects",
			},
		],
	}),
	loader: async () => {
		try {
			const projects = await getProjectsFn();
			return { projects: projects || [] };
		} catch (error) {
			console.error("Failed to fetch projects:", error);
			return { projects: [] };
		}
	},
	component: ProjectsPage,
});

function useScrollParallax(distance: number) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const zero = useMotionValue(0);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const translate = useTransform(
		scrollYProgress,
		[0, 1],
		[distance, -distance],
	);
	const y = reduce ? zero : translate;
	return { ref, y };
}

function ParallaxOrbs() {
	const { ref, y } = useScrollParallax(60);
	const orb2 = useTransform(y, [60, -60], [-40, 40]);

	return (
		<div
			ref={ref}
			className="pointer-events-none absolute inset-0 overflow-hidden"
			aria-hidden="true"
		>
			<motion.div
				className="absolute -top-24 left-[-8%] h-96 w-96 rounded-full bg-brand/10 blur-3xl"
				style={{ y }}
			/>
			<motion.div
				className="absolute bottom-[-10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
				style={{ y: orb2 }}
			/>
		</div>
	);
}

const categoryConfig: Record<
	string,
	{
		icon: React.ComponentType<{ className?: string }>;
		gradient: string;
		soft: string;
	}
> = {
	Build: {
		icon: Rocket,
		gradient: "from-brand to-brand-dark",
		soft: "from-brand/20 to-brand/5",
	},
	Grow: {
		icon: Rocket,
		gradient: "from-[#7C6BFF] to-brand",
		soft: "from-[#7C6BFF]/20 to-brand/5",
	},
	Brand: {
		icon: Layers,
		gradient: "from-accent to-brand",
		soft: "from-accent/20 to-brand/5",
	},
	Research: {
		icon: Layers,
		gradient: "from-violet-500 to-purple-600",
		soft: "from-violet-500/20 to-purple-600/5",
	},
	Design: {
		icon: Layers,
		gradient: "from-pink-500 to-rose-500",
		soft: "from-pink-500/20 to-rose-500/5",
	},
	Engineering: {
		icon: Rocket,
		gradient: "from-emerald-500 to-teal-600",
		soft: "from-emerald-500/20 to-teal-600/5",
	},
};

const FILTERS = [
	"All",
	"Build",
	"Grow",
	"Brand",
	"Research",
	"Design",
	"Engineering",
];

function configFor(category: string) {
	return categoryConfig[category] || categoryConfig.Build;
}

function categoryLabel(category: string) {
	return category || "Project";
}

/* Continuous name ticker — adds constant, effortless motion to the page. */
function ProjectMarquee({ projects }: { projects: ProjectItem[] }) {
	if (projects.length === 0) return null;
	const items = [0, 1, 2].flatMap((copy) =>
		projects.map((p) => ({ copy, project: p })),
	);

	return (
		<div
			className="relative -mx-6 overflow-hidden py-10 lg:-mx-10"
			style={{
				maskImage:
					"linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
			}}
			aria-hidden="true"
		>
			<div className="flex w-max animate-marquee items-center gap-10">
				{items.map(({ copy, project }) => {
					const config = configFor(project.category);
					return (
						<span
							key={`${project.id}-${copy}`}
							className="flex items-center gap-3 whitespace-nowrap"
						>
							<span
								className={`inline-block h-2.5 w-2.5 rounded-full bg-linear-to-br ${config.gradient}`}
							/>
							<span className="font-display text-3xl font-medium text-ink/15 transition-colors hover:text-ink/30 md:text-5xl">
								{project.name}
							</span>
						</span>
					);
				})}
			</div>
		</div>
	);
}

/* Full-bleed image panel — the cover image IS the panel. */
function ProjectRow({
	project,
	index,
}: {
	project: ProjectItem;
	index: number;
}) {
	const imgRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const zeroPct = useMotionValue("0%");
	const { scrollYProgress } = useScroll({
		target: imgRef,
		offset: ["start end", "end start"],
	});
	const imgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
	const parallaxY = reduce ? zeroPct : imgY;
	const config = configFor(project.category);

	return (
		<motion.div
			initial={{ opacity: 0, y: 48 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
			className="group relative"
		>
			<div
				ref={imgRef}
				className="relative h-[22rem] overflow-hidden rounded-[2rem] border border-hairline sm:h-[26rem] md:h-[30rem]"
			>
				{/* Full-bleed image */}
				{project.coverImage ? (
					<motion.div
						className="absolute inset-x-0 -top-[15%] h-[130%]"
						style={{ y: parallaxY }}
					>
						<img
							src={project.coverImage}
							alt={project.name}
							loading="lazy"
							className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
						/>
					</motion.div>
				) : (
					<div
						className={`absolute inset-0 bg-linear-to-br ${config.gradient}`}
					>
						<div
							className={`absolute inset-0 bg-linear-to-br ${config.soft}`}
						/>
					</div>
				)}

				{/* Resting overlay — lifts on hover so the full image shows */}
				<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-40" />

				{/* Big index number */}
				<span className="absolute right-6 top-4 font-display text-6xl font-medium text-white/25 transition-all duration-500 group-hover:text-white/60 md:text-7xl">
					{String(index + 1).padStart(2, "0")}
				</span>

				{/* Category chip */}
				<div className="absolute left-5 top-5">
					<span
						className={`inline-flex items-center gap-1.5 rounded-full bg-linear-to-r ${config.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}
					>
						<config.icon className="h-3.5 w-3.5" />
						{categoryLabel(project.category)}
					</span>
				</div>

				{/* Always-visible title + arrow */}
				<div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
					<h3 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight text-white transition-colors duration-300 group-hover:text-white/0 md:text-5xl">
						{project.name}
					</h3>
					<span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-white md:h-14 md:w-14">
						<ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
					</span>
				</div>

				{/* Description slides up over the title on hover */}
				<div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
					<motion.div
						initial={false}
						animate={{ opacity: 1, y: 0 }}
						className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100"
					>
						<div className="overflow-hidden">
							<p className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight text-white md:hidden">
								{project.name}
							</p>
							<p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 md:mt-0 md:text-lg">
								{project.notes || "No description available."}
							</p>
							{(project.repoLink || project.liveLink) && (
								<div className="mt-5 flex flex-wrap items-center gap-3">
									{project.liveLink && (
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand hover:text-white"
										>
											<ExternalLink className="h-4 w-4" />
											View Live
											<ArrowUpRight className="h-3.5 w-3.5" />
										</a>
									)}
									{project.repoLink && (
										<a
											href={project.repoLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white hover:bg-white/10"
										>
											<Github className="h-4 w-4" />
											View Code
										</a>
									)}
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}

function ProjectSkeleton() {
	return (
		<div className="h-[22rem] animate-pulse overflow-hidden rounded-[2rem] border border-hairline bg-linear-to-r from-ink/5 via-ink/10 to-ink/5 sm:h-[26rem]" />
	);
}

function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	const projectsArray = Array.isArray(projects) ? projects : [];
	const [filter, setFilter] = useState("All");

	const filtered = useMemo(() => {
		if (filter === "All") return projectsArray;
		return projectsArray.filter(
			(p) => p.category === filter || p.category.split(", ").includes(filter),
		);
	}, [filter, projectsArray]);

	return (
		<section id="projects" className="section relative overflow-hidden">
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-to)_0%,_transparent_50%)] from-brand/5 to-accent/5"
				aria-hidden="true"
			/>
			<ParallaxOrbs />
			<div className="container-x relative">
				{/* Header */}
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div className="max-w-2xl">
						<Reveal>
							<span className="eyebrow">Projects</span>
						</Reveal>
						<Reveal delay={100}>
							<h1 className="mt-5 text-balance font-display text-4xl font-medium tracking-tight text-ink md:text-6xl">
								Open source & client work that{" "}
								<span className="relative whitespace-nowrap">
									<span className="serif-accent text-brand-dark">matters</span>
									<span
										className="absolute -bottom-1 left-0 h-[6px] w-full bg-accent/80"
										aria-hidden="true"
									/>
								</span>
								.
							</h1>
						</Reveal>
						<Reveal delay={200}>
							<p className="mt-6 max-w-xl text-lg text-ink-soft">
								A curated collection of production systems, research prototypes,
								and client deliveries across AI, data, and design.
							</p>
						</Reveal>
					</div>
					<Reveal delay={250}>
						<div className="flex flex-wrap gap-2">
							{FILTERS.map((f) => (
								<button
									key={f}
									type="button"
									onClick={() => setFilter(f)}
									className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
										filter === f
											? "bg-ink-gradient text-white shadow-sm"
											: "border border-hairline bg-surface text-ink-soft hover:border-brand hover:text-ink"
									}`}
								>
									{f}
								</button>
							))}
						</div>
					</Reveal>
				</div>

				{/* Continuous project-name ticker */}
				<Reveal delay={100}>
					<ProjectMarquee projects={projectsArray} />
				</Reveal>

				{/* Content */}
				<div className="mt-4">
					{filtered.length > 0 ? (
						<Suspense
							fallback={
								<div className="space-y-6">
									<ProjectSkeleton />
									<ProjectSkeleton />
								</div>
							}
						>
							<motion.div layout className="space-y-6">
								{filtered.map((project, i) => (
									<ProjectRow key={project.id} project={project} index={i} />
								))}
							</motion.div>
						</Suspense>
					) : (
						<div className="rounded-3xl border border-hairline bg-surface p-12 text-center">
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", damping: 15 }}
							>
								<Image className="mx-auto h-12 w-12 text-ink-muted/50" />
								<h3 className="mt-4 font-display text-xl font-medium text-ink">
									No projects yet
								</h3>
								<p className="mt-2 text-ink-soft">
									Projects will appear here once added to Notion.
								</p>
							</motion.div>
						</div>
					)}
				</div>

				{projectsArray.length > 0 && (
					<motion.div
						className="mt-20 text-center"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<Reveal>
							<p className="text-lg text-ink-soft">
								Want to build something similar? Let's talk about your project.
							</p>
						</Reveal>
						<Reveal delay={100}>
							<Link
								to="/"
								hash="contact"
								className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/35 hover:brightness-110"
							>
								Start a Project
								<ArrowRight className="h-5 w-5" />
							</Link>
						</Reveal>
					</motion.div>
				)}
			</div>
		</section>
	);
}

export { ProjectsPage };
