import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	Briefcase,
	Calendar,
	Clock,
	MapPin,
	Users,
} from "lucide-react";
import { motion } from "motion/react";
import type { CareerJob } from "@/lib/notion";
import { getCareerJobsFn } from "@/lib/server-functions";
import { Reveal } from "../hooks";

export const Route = createFileRoute("/careers/")({
	head: () => ({
		title: "Careers — Devonyx | Join Our Remote-First Team",
		meta: [
			{
				name: "description",
				content:
					"Join Devonyx — a small, remote-first team working across 5 regions. We're hiring developers, marketers, and designers who love shipping real products with founders.",
			},
			{
				name: "keywords",
				content:
					"Devonyx careers, remote jobs, startup jobs, developer jobs, marketing jobs, design jobs, work from home, digital agency careers",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "Careers — Devonyx | Join Our Remote-First Team",
			},
			{
				property: "og:description",
				content:
					"Join Devonyx — a small, remote-first team working across 5 regions. We're hiring developers, marketers, and designers.",
			},
			{ property: "og:url", content: "https://devonyx.in/careers" },
			{ property: "og:image", content: "https://devonyx.in/og-image.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "Careers — Devonyx | Join Our Remote-First Team",
			},
			{
				name: "twitter:description",
				content:
					"Join Devonyx — a small, remote-first team working across 5 regions. We're hiring.",
			},
			{ name: "twitter:image", content: "https://devonyx.in/og-image.png" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in/careers",
			},
		],
	}),
	loader: async () => {
		const jobs = await getCareerJobsFn();
		return { jobs: jobs || [] };
	},
	component: CareersPage,
});

function JobCardSkeleton() {
	return (
		<div className="group relative h-full overflow-hidden rounded-3xl border border-hairline bg-surface p-6">
			<div className="flex items-center gap-2">
				<div className="h-5 w-5 rounded-full bg-brand/10 animate-pulse" />
				<div className="h-4 w-24 rounded bg-ink/5 animate-pulse" />
			</div>
			<div className="mt-3 h-7 w-3/4 rounded bg-ink/5 animate-pulse" />
			<div className="mt-3 h-4 w-1/2 rounded bg-ink/5 animate-pulse" />
			<div className="mt-3 h-4 w-full rounded bg-ink/5 animate-pulse" />
		</div>
	);
}

const departmentColors: Record<string, string> = {
	Development: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	Marketing: "bg-pink-500/10 text-pink-400 border-pink-500/20",
	Design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
	Engineering: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
	Sales: "bg-orange-500/10 text-orange-400 border-orange-500/20",
	Operations: "bg-slate-500/10 text-slate-400 border-slate-500/20",
	"Human Resources": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
	Finance: "bg-green-500/10 text-green-400 border-green-500/20",
};

const typeColors: Record<string, string> = {
	"Full-time": "bg-brand/10 text-brand border-brand/20",
	"Part-time": "bg-amber-500/10 text-amber-400 border-amber-500/20",
	Contract: "bg-violet-500/10 text-violet-400 border-violet-500/20",
	Internship: "bg-sky-500/10 text-sky-400 border-sky-500/20",
	Remote: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

function JobCard({ job, index }: { job: CareerJob; index: number }) {
	const cardContent = (
		<motion.div
			className="group relative flex h-full flex-col rounded-3xl border border-hairline bg-surface p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.06 }}
			whileHover={{ y: -4 }}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<span
						className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide ${
							departmentColors[job.department] ||
							"bg-brand/10 text-brand border-brand/20"
						}`}
					>
						{job.department || "General"}
					</span>
					<h3 className="mt-3 font-display text-xl font-medium text-ink group-hover:text-brand transition-colors">
						{job.title}
					</h3>
					<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
						<span className="flex items-center gap-1.5">
							<Briefcase className="h-4 w-4" />
							{job.employmentType || "Full-time"}
						</span>
						<span className="flex items-center gap-1.5">
							<MapPin className="h-4 w-4" />
							{job.location || "Remote"}
						</span>
						{job.level && (
							<span className="flex items-center gap-1.5">
								<Users className="h-4 w-4" />
								{job.level}
							</span>
						)}
					</div>
				</div>
				<motion.div
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all group-hover:scale-110 group-hover:bg-brand/20"
					whileHover={{ rotate: 45 }}
				>
					<ArrowUpRight className="h-5 w-5" />
				</motion.div>
			</div>
			<p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-2">
				{job.description?.slice(0, 140) ||
					"Exciting opportunity to join our team."}
			</p>
			<div className="mt-4 flex flex-wrap gap-2">
				{job.employmentType && (
					<span
						className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide ${
							typeColors[job.employmentType] ||
							"bg-ink/10 text-ink/50 border-hairline"
						}`}
					>
						{job.employmentType}
					</span>
				)}
				{job.postedDate && (
					<span className="flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-0.5 font-mono text-[11px] text-ink-muted">
						<Calendar className="h-3 w-3" />
						Posted:{" "}
						{new Date(job.postedDate).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						})}
					</span>
				)}
				{job.closingDate && (
					<span className="flex items-center gap-1.5 rounded-full bg-amber-50/50 px-2.5 py-0.5 font-mono text-[11px] text-amber-600 border border-amber-500/20">
						<Clock className="h-3 w-3" />
						Closes:{" "}
						{new Date(job.closingDate).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						})}
					</span>
				)}
			</div>
		</motion.div>
	);

	if (!job.slug) {
		return cardContent;
	}

	return (
		<Link
			to="/careers/$slug"
			params={{ slug: job.slug }}
			className="block h-full"
		>
			{cardContent}
		</Link>
	);
}

function CareersPage() {
	const { jobs } = Route.useLoaderData();
	const jobsArray = Array.isArray(jobs) ? jobs : [];

	return (
		<section id="career" className="section relative overflow-hidden">
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-to)_0%,_transparent_50%)] from-brand/5 to-accent/5"
				aria-hidden="true"
			/>
			<motion.div
				className="container-x relative"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<div className="mx-auto max-w-2xl text-center">
					<Reveal>
						<span className="eyebrow justify-center">Careers</span>
					</Reveal>
					<Reveal delay={100}>
						<h2 className="mt-5 text-balance font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
							Come build, brand &{" "}
							<span className="serif-accent text-brand-dark">grow</span> with
							us.
						</h2>
					</Reveal>
					<Reveal delay={200}>
						<p className="mt-5 text-lg text-ink-soft">
							We're a small, remote-first team working across 5 regions. If you
							love shipping real products with founders, we'd love to hear from
							you.
						</p>
					</Reveal>
				</div>

				{jobsArray.length > 0 ? (
					<div className="mt-14">
						<SuspenseJobList jobs={jobsArray} />
					</div>
				) : (
					<motion.div
						className="mt-14 rounded-3xl border border-hairline bg-surface p-12 text-center"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: "spring", damping: 15 }}
					>
						<Briefcase className="mx-auto h-12 w-12 text-ink-muted/50" />
						<h3 className="mt-4 font-display text-xl font-medium text-ink">
							No open positions
						</h3>
						<p className="mt-2 text-ink-soft">
							Check back soon — we're always looking for great people.
						</p>
					</motion.div>
				)}
			</motion.div>
		</section>
	);
}

function SuspenseJobList({ jobs }: { jobs: CareerJob[] }) {
	return (
		<div className="grid gap-5 md:grid-cols-2">
			{jobs.map((job, i) => (
				<JobCard key={job.id} job={job} index={i} />
			))}
		</div>
	);
}

export { CareersPage };

export function JobListSkeleton() {
	return (
		<div className="grid gap-5 md:grid-cols-2">
			<JobCardSkeleton />
			<JobCardSkeleton />
			<JobCardSkeleton />
			<JobCardSkeleton />
		</div>
	);
}
