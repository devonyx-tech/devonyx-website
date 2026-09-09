import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	Calendar,
	Circle,
	Code,
	ExternalLink,
	Github,
	Image,
	Palette,
	Rocket,
	Tag,
	TrendingUp,
} from "lucide-react";
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { Suspense, useRef } from "react";
import type { ProjectItem } from "@/lib/notion";
import { getProjectsFn } from "@/lib/server-functions";
import { Reveal } from "../hooks";

export const Route = createFileRoute("/projects")({
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

function ProjectCardSkeleton() {
	return (
		<div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface">
			<div className="relative h-72 overflow-hidden">
				<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5" />
			</div>
			<div className="flex flex-1 flex-col p-6 space-y-4">
				<div className="h-6 w-3/4 rounded bg-ink/5 animate-pulse" />
				<div className="h-4 w-full rounded bg-ink/5 animate-pulse" />
				<div className="h-4 w-2/3 rounded bg-ink/5 animate-pulse" />
				<div className="h-4 w-1/2 rounded bg-ink/5 animate-pulse mt-auto" />
			</div>
		</div>
	);
}

const categoryConfig: Record<
	string,
	{
		icon: React.ComponentType<{ className?: string }>;
		gradient: string;
		label: string;
	}
> = {
	Build: { icon: Rocket, gradient: "from-brand to-brand-dark", label: "Build" },
	Grow: {
		icon: TrendingUp,
		gradient: "from-[#7C6BFF] to-brand",
		label: "Grow",
	},
	Brand: { icon: Palette, gradient: "from-accent to-brand", label: "Brand" },
	Research: {
		icon: Code,
		gradient: "from-violet-500 to-purple-600",
		label: "Research",
	},
	Design: {
		icon: Palette,
		gradient: "from-pink-500 to-rose-500",
		label: "Design",
	},
	Engineering: {
		icon: Rocket,
		gradient: "from-emerald-500 to-teal-600",
		label: "Engineering",
	},
};

const priorityColors: Record<string, string> = {
	High: "bg-red-500/20 text-red-400 border-red-500/30",
	Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
	Critical: "bg-red-600/20 text-red-300 border-red-600/30",
};

function ProjectCard({
	project,
	index,
}: {
	project: ProjectItem;
	index: number;
}) {
	const config = categoryConfig[project.category] || categoryConfig.Build;
	const Icon = config.icon;

	const coverRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const zeroPct = useMotionValue("0%");
	const { scrollYProgress } = useScroll({
		target: coverRef,
		offset: ["start end", "end start"],
	});
	const imgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
	const parallaxY = reduce ? zeroPct : imgY;

	return (
		<motion.article
			key={project.id}
			initial={{ opacity: 0, y: 40, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.6,
				delay: index * 0.08,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			whileHover={{ y: -8 }}
			className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/10"
		>
			{project.coverImage && (
				<div ref={coverRef} className="relative h-72 overflow-hidden">
					<motion.div
						className="absolute inset-x-0 -top-[14%] h-[128%]"
						style={{ y: parallaxY }}
					>
						<img
							src={project.coverImage}
							alt={project.name}
							className="h-full w-full object-cover"
							loading="lazy"
						/>
					</motion.div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_black/40_100%)]" />
					<div className="absolute inset-0 translate-y-2 bg-linear-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
					<div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
						<div
							className={`flex items-center gap-2 rounded-full bg-linear-to-r ${config.gradient} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
						>
							<Icon className="h-4 w-4" />
							{config.label}
						</div>
						{project.priority && (
							<span
								className={`rounded-full border px-2.5 py-1 text-xs font-mono font-medium ${
									priorityColors[project.priority] ||
									"bg-ink/10 text-ink/50 border-hairline"
								}`}
							>
								{project.priority}
							</span>
						)}
					</div>
					{project.images.length > 1 && (
						<div className="absolute top-4 right-4">
							<button
								type="button"
								className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all hover:scale-110 hover:bg-black/70"
								aria-label="View gallery"
							>
								<Image className="h-4.5 w-4.5" />
							</button>
						</div>
					)}
				</div>
			)}

			<div className="flex flex-1 flex-col p-6 pt-4 space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="pr-4 font-display text-xl font-medium text-ink transition-colors group-hover:text-brand">
						{project.name}
					</h3>
					<div className="flex items-center gap-1.5">
						{project.repoLink && (
							<a
								href={project.repoLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/50 text-ink-soft transition-all hover:scale-110 hover:border-brand hover:bg-white hover:text-brand"
								aria-label={`View ${project.name} on GitHub`}
							>
								<Github className="h-4.5 w-4.5" />
							</a>
						)}
						{project.liveLink && (
							<a
								href={project.liveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/50 text-ink-soft transition-all hover:scale-110 hover:border-brand hover:bg-white hover:text-brand"
								aria-label={`View ${project.name} live`}
							>
								<ExternalLink className="h-4.5 w-4.5" />
							</a>
						)}
					</div>
				</div>

				<p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
					{project.notes || "No description available."}
				</p>

				{(project.category || project.status || project.dueDate) && (
					<div className="flex flex-wrap items-center gap-2.5">
						{project.category && (
							<span className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
								<Tag className="h-3 w-3" />
								{project.category}
							</span>
						)}
						{project.status && (
							<span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-100/20 px-3 py-1 text-xs font-medium text-emerald-400">
								<Circle className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
								{project.status}
							</span>
						)}
						{project.dueDate && (
							<span className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-100/20 px-3 py-1 text-xs font-medium text-amber-400">
								<Calendar className="h-3 w-3" />
								Due:{" "}
								{new Date(project.dueDate).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								})}
							</span>
						)}
					</div>
				)}

				{project.images.length > 0 && (
					<div className="relative h-24 overflow-hidden rounded-xl border border-hairline">
						<div className="flex h-full gap-1 overflow-x-auto pb-2 scrollbar-hide">
							{project.images.slice(0, 5).map((img) => (
								<motion.img
									key={`${project.id}-img-${img}`}
									src={img}
									alt={`${project.name} gallery`}
									className="h-full w-32 flex-shrink-0 cursor-pointer rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
									loading="lazy"
									whileHover={{ scale: 1.1, zIndex: 10 }}
								/>
							))}
							{project.images.length > 5 && (
								<div className="flex h-full w-32 flex-shrink-0 items-center justify-center rounded-lg bg-black/50 font-medium text-white">
									+{project.images.length - 5}
								</div>
							)}
						</div>
					</div>
				)}

				<div className="mt-auto flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
					<a
						href={project.repoLink || project.liveLink || "#contact"}
						className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-ink-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition-all hover:shadow-xl hover:shadow-ink/30 hover:brightness-125"
					>
						{project.repoLink
							? "View Code"
							: project.liveLink
								? "View Live"
								: "Inquire"}
						<ArrowUpRight className="h-4 w-4" />
					</a>
					{project.images.length > 0 && (
						<button
							type="button"
							className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-hairline bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-brand hover:bg-white/50 hover:text-brand"
						>
							<Image className="h-4 w-4" />
							Gallery
						</button>
					)}
				</div>
			</div>
		</motion.article>
	);
}

function ProjectGrid({ projects }: { projects: ProjectItem[] }) {
	return (
		<div className="relative">
			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{projects.map((project, i) => (
					<div
						key={project.id}
						className={[
							i % 4 === 1 ? "md:mt-12 xl:mt-0" : "",
							i % 4 === 2 ? "xl:mt-24" : "",
							i % 4 === 3 ? "md:mt-12 xl:mt-12" : "",
						].join(" ")}
					>
						<ProjectCard project={project} index={i} />
					</div>
				))}
			</div>
		</div>
	);
}

function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	const projectsArray = Array.isArray(projects) ? projects : [];

	return (
		<section id="projects" className="section relative overflow-hidden">
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-to)_0%,_transparent_50%)] from-brand/5 to-accent/5"
				aria-hidden="true"
			/>
			<ParallaxOrbs />
			<motion.div
				className="container-x relative"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div className="max-w-2xl">
						<Reveal>
							<span className="eyebrow">Projects</span>
						</Reveal>
						<Reveal delay={100}>
							<h2 className="mt-5 text-balance font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
								Open source & client work that{" "}
								<span className="serif-accent text-brand-dark">matters</span>.
							</h2>
						</Reveal>
						<Reveal delay={200}>
							<p className="mt-5 text-lg text-ink-soft">
								A curated collection of production systems, research prototypes,
								and client deliveries across AI, data, and design. All code is
								open source — fork, learn, contribute.
							</p>
						</Reveal>
					</div>
					<Reveal delay={250}>
						<div className="flex flex-wrap gap-2">
							{[
								"All",
								"Build",
								"Grow",
								"Brand",
								"Research",
								"Design",
								"Engineering",
							].map((filter) => (
								<button
									key={filter}
									type="button"
									className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
										filter === "All"
											? "bg-ink-gradient text-white shadow-sm"
											: "border border-hairline bg-surface text-ink-soft hover:border-brand hover:text-ink"
									}`}
								>
									{filter}
								</button>
							))}
						</div>
					</Reveal>
				</div>

				<motion.div
					className="mt-14"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					{projectsArray.length > 0 ? (
						<Suspense fallback={<ProjectCardSkeleton />}>
							<ProjectGrid projects={projectsArray} />
						</Suspense>
					) : (
						<div className="rounded-3xl border border-hairline bg-surface p-12 text-center">
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", damping: 15 }}
							>
								<Code className="mx-auto h-12 w-12 text-ink-muted/50" />
								<h3 className="mt-4 font-display text-xl font-medium text-ink">
									No projects yet
								</h3>
								<p className="mt-2 text-ink-soft">
									Projects will appear here once added to Notion.
								</p>
							</motion.div>
						</div>
					)}
				</motion.div>

				{projectsArray.length > 0 && (
					<motion.div
						className="mt-16 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
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
								<ArrowUpRight className="h-5 w-5" />
							</Link>
						</Reveal>
					</motion.div>
				)}
			</motion.div>
		</section>
	);
}

export { ProjectsPage };
