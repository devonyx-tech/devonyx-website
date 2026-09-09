import { Suspense } from "react";
import { motion } from "framer-motion";
import {
	ArrowUpRight,
	Github,
	ExternalLink,
	Code,
	Palette,
	Rocket,
	TrendingUp,
	Calendar,
	Circle,
	Tag,
	Image,
} from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../hooks";
import { getProjectsFn } from "@/lib/server-functions";
import type { ProjectItem } from "@/lib/notion";

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

function ProjectCardSkeleton() {
	return (
		<motion.div
			className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-all duration-300"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="relative h-48 overflow-hidden">
				<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5" />
			</div>
			<div className="flex flex-1 flex-col p-6 space-y-4">
				<div className="h-6 w-3/4 bg-ink/5 rounded animate-pulse" />
				<div className="h-4 w-full bg-ink/5 rounded animate-pulse" />
				<div className="h-4 w-2/3 bg-ink/5 rounded animate-pulse" />
				<div className="h-4 w-1/2 bg-ink/5 rounded animate-pulse mt-auto" />
			</div>
		</motion.div>
	);
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
	const categoryConfig = {
		Build: { icon: Rocket, gradient: "from-brand to-brand-dark", label: "Build" },
		Grow: { icon: TrendingUp, gradient: "from-[#7C6BFF] to-brand", label: "Grow" },
		Brand: { icon: Palette, gradient: "from-accent to-brand", label: "Brand" },
		Research: { icon: Code, gradient: "from-violet-500 to-purple-600", label: "Research" },
		Design: { icon: Palette, gradient: "from-pink-500 to-rose-500", label: "Design" },
		Engineering: { icon: Rocket, gradient: "from-emerald-500 to-teal-600", label: "Engineering" },
	};

	const config = categoryConfig[project.category as keyof typeof categoryConfig] || categoryConfig.Build;
	const Icon = config.icon;

	const priorityColors = {
		High: "bg-red-500/20 text-red-400 border-red-500/30",
		Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
		Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
		Critical: "bg-red-600/20 text-red-300 border-red-600/30",
	};

	const statusColors = {
		Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
		"In Progress": "bg-brand/20 text-brand border-brand/30",
		Planning: "bg-violet-500/20 text-violet-400 border-violet-500/30",
		Completed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
		Archived: "bg-ink/20 text-ink/50 border-ink/30",
		"On Hold": "bg-amber-500/20 text-amber-400 border-amber-500/30",
	};

	return (
		<motion.article
			key={project.id}
			initial={{ opacity: 0, y: 40, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
			whileHover={{ y: -8, scale: 1.01 }}
			className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-all duration-500"
			style={{
				willChange: "transform, box-shadow",
				transformStyle: "preserve-3d",
				perspective: 1000,
			}}
		>
			{project.coverImage && (
				<motion.div
					className="relative h-56 overflow-hidden"
					initial={{ scale: 1.1 }}
					animate={{ scale: 1 }}
					transition={{ duration: 1, ease: "easeOut" }}
					style={{ transformStyle: "preserve-3d" }}
				>
					<motion.img
						src={project.coverImage}
						alt={project.name}
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						loading="lazy"
						style={{ transformStyle: "preserve-3d" }}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_black/40_100%)]" />
					<div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
						<motion.div
							className={`flex items-center gap-2 rounded-full bg-linear-to-r ${config.gradient} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
						>
							<Icon className="h-4 w-4" />
							{config.label}
						</motion.div>
						{project.priority && (
							<motion.span
								className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${priorityColors[project.priority as keyof typeof priorityColors] || "bg-ink/10 text-ink/50 border-hairline"}`}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.4 }}
							>
								{project.priority}
							</motion.span>
						)}
						{project.status && (
							<motion.span
								className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${statusColors[project.status as keyof typeof statusColors] || "bg-ink/10 text-ink/50 border-hairline"}`}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.45 }}
							>
								{project.status}
							</motion.span>
						)}
					</div>
					{project.images.length > 1 && (
						<motion.div
							className="absolute top-4 right-4"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<button
								type="button"
								className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur text-white transition-all hover:bg-black/70 hover:scale-110"
								aria-label="View gallery"
							>
								<Image className="h-4.5 w-4.5" />
							</button>
						</motion.div>
					)}
				</motion.div>
			)}

			<div className="flex flex-1 flex-col p-6 pt-4 space-y-4">
				<motion.div
					className="flex items-center justify-between"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className="font-display text-xl font-medium text-ink group-hover:text-brand transition-colors pr-4">
						{project.name}
					</h3>
					<div className="flex items-center gap-1.5">
						{project.repoLink && (
							<a
								href={project.repoLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/50 text-ink-soft transition-all hover:border-brand hover:bg-white hover:text-brand hover:scale-110"
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
								className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/50 text-ink-soft transition-all hover:border-brand hover:bg-white hover:text-brand hover:scale-110"
								aria-label={`View ${project.name} live`}
							>
								<ExternalLink className="h-4.5 w-4.5" />
							</a>
						)}
					</div>
				</motion.div>

				<motion.p
					className="text-sm leading-relaxed text-ink-soft line-clamp-3 flex-1"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.25 }}
				>
					{project.notes || "No description available."}
				</motion.p>

				{(project.category || project.status || project.dueDate) && (
					<motion.div
						className="flex flex-wrap items-center gap-2.5"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						{project.category && (
							<span className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
								<Tag className="h-3 w-3" />
								{project.category}
							</span>
						)}
						{project.status && (
							<span className="flex items-center gap-1.5 rounded-full bg-emerald-100/20 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
								<Circle className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
								{project.status}
							</span>
						)}
						{project.dueDate && (
							<span className="flex items-center gap-1.5 rounded-full bg-amber-100/20 px-3 py-1 text-xs font-medium text-amber-400 border border-amber-500/20">
								<Calendar className="h-3 w-3" />
								Due: {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
							</span>
						)}
					</motion.div>
				)}

				{project.images.length > 0 && (
					<motion.div
						className="relative h-24 overflow-hidden rounded-xl border border-hairline"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.35 }}
					>
						<div className="flex h-full gap-1 overflow-x-auto pb-2 scrollbar-hide">
							{project.images.slice(0, 5).map((img, i) => (
								<motion.img
									key={`${project.id}-img-${i}`}
									src={img}
									alt={`${project.name} gallery ${i + 1}`}
									className="h-full w-32 flex-shrink-0 object-cover rounded-lg transition-all duration-300 group-hover:scale-105 cursor-pointer"
									loading="lazy"
									whileHover={{ scale: 1.1, zIndex: 10 }}
								/>
							))}
							{project.images.length > 5 && (
								<motion.div
									className="h-full w-32 flex-shrink-0 flex items-center justify-center rounded-lg bg-black/50 text-white font-medium"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4 }}
								>
									+{project.images.length - 5}
								</motion.div>
							)}
						</div>
					</motion.div>
				)}

				<motion.div
					className="mt-auto pt-4 border-t border-hairline flex flex-wrap items-center gap-2"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<a
						href={project.repoLink || project.liveLink || "#contact"}
						className="inline-flex items-center justify-center gap-2 flex-1 min-w-0 rounded-full bg-ink-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition-all hover:shadow-xl hover:shadow-ink/30 hover:brightness-125"
					>
						{project.repoLink ? "View Code" : project.liveLink ? "View Live" : "Inquire"}
						<ArrowUpRight className="h-4 w-4" />
					</a>
					{project.images.length > 0 && (
						<button
							type="button"
							className="inline-flex items-center justify-center gap-2 flex-1 min-w-0 rounded-full border border-hairline bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-brand hover:text-brand hover:bg-white/50"
						>
							<Image className="h-4 w-4" />
							Gallery
						</button>
					)}
				</motion.div>
			</div>
		</motion.article>
	);
}

function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	const projectsArray = Array.isArray(projects) ? projects : [];

	return (
		<section id="projects" className="section relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-to)_0%,_transparent_50%)] from-brand/5 to-accent/5" aria-hidden="true" />
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
								A curated collection of production systems, research prototypes, and
								client deliveries across AI, data, and design. All code is open
								source — fork, learn, contribute.
							</p>
						</Reveal>
					</div>
					<Reveal delay={250}>
						<div className="flex flex-wrap gap-2">
							{["All", "Build", "Grow", "Brand", "Research", "Design", "Engineering"].map((filter) => (
								<button
									key={filter}
									type="button"
									className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
										filter === "All"
											? "bg-ink-gradient text-white shadow-sm"
											: "border border-hairline bg-surface text-ink-soft hover:text-ink hover:border-brand"
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
							<div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
								{projectsArray.map((project, i) => (
									<ProjectCard key={project.id} project={project} index={i} />
								))}
							</div>
						</Suspense>
					) : (
						<div className="rounded-3xl border border-hairline bg-surface p-12 text-center">
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", damping: 15 }}
							>
								<Code className="mx-auto h-12 w-12 text-ink-muted/50" />
								<h3 className="mt-4 font-display text-xl font-medium text-ink">No projects yet</h3>
								<p className="mt-2 text-ink-soft">Projects will appear here once added to Notion.</p>
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
