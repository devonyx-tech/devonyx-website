import { createFileRoute, Link } from "@tanstack/react-router";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import {
	ArrowLeft,
	ArrowUpRight,
	Briefcase,
	Calendar,
	Clock,
	ExternalLink,
	MapPin,
	Sparkles,
	Users,
} from "lucide-react";
import { motion } from "motion/react";
import ApplicationForm from "@/components/ApplicationForm";
import { getCareerJobBySlugFn } from "@/lib/server-functions";

export const Route = createFileRoute("/careers/$slug")({
	head: () => ({
		title: "Job Opening — Devonyx Careers",
		meta: [
			{
				name: "description",
				content:
					"Join Devonyx — a remote-first digital agency. Apply for open positions in development, marketing, and design across 5 regions.",
			},
			{
				name: "keywords",
				content: "Devonyx careers, remote job, startup job, developer job, marketing job, design job",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: "Job Opening — Devonyx Careers" },
			{
				property: "og:description",
				content:
					"Join Devonyx — a remote-first digital agency. Apply for open positions across 5 regions.",
			},
			{ property: "og:image", content: "https://devonyx.in/og-image.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Job Opening — Devonyx Careers" },
			{
				name: "twitter:description",
				content:
					"Join Devonyx — a remote-first digital agency. Apply for open positions across 5 regions.",
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
	loader: async ({ params }) => {
		const job = await getCareerJobBySlugFn({ data: { slug: params.slug } });
		return { job };
	},
	component: JobPostingPage,
});

function MetaRow({
	icon: Icon,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) {
	return (
		<span className="flex items-center gap-1.5 text-sm text-ink-muted">
			<Icon className="h-4 w-4" />
			{children}
		</span>
	);
}

function JobPostingPage() {
	const { job } = Route.useLoaderData();

	return (
		<section id="career-detail" className="section relative overflow-hidden">
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-to)_0%,_transparent_50%)] from-brand/5 to-accent/5"
				aria-hidden="true"
			/>
			<div className="container-x relative">
				<Link
					to="/careers"
					className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-brand mb-6 block w-fit"
				>
					<ArrowLeft className="h-4 w-4" /> All roles
				</Link>

				<div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
					>
						<div className="flex flex-wrap items-center gap-2">
							{(job.department || "General") && (
								<span className="rounded-full bg-brand/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide border border-brand/20 text-brand">
									{job.department || "General"}
								</span>
							)}
							{job.employmentType && (
								<span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide border border-emerald-500/20 text-emerald-400">
									{job.employmentType}
								</span>
							)}
							{job.level && (
								<span className="rounded-full bg-purple-500/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide border border-purple-500/20 text-purple-400">
									{job.level}
								</span>
							)}
						</div>

						<h1 className="mt-5 text-balance font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
							{job.title}
						</h1>

						<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
							<MetaRow icon={Briefcase}>
								{job.employmentType || "Full-time"}
							</MetaRow>
							<MetaRow icon={MapPin}>{job.location || "Remote"}</MetaRow>
							{job.level && <MetaRow icon={Users}>{job.level}</MetaRow>}
							{job.reqId && (
								<span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-xs text-ink-muted">
									Req: {job.reqId}
								</span>
							)}
						</div>

						<div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
							{job.postedDate && (
								<MetaRow icon={Calendar}>
									Posted:{" "}
									{new Date(job.postedDate).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</MetaRow>
							)}
							{job.closingDate && (
								<MetaRow icon={Clock}>
									Closes:{" "}
									{new Date(job.closingDate).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</MetaRow>
							)}
						</div>

						<div className="mt-8 rounded-3xl border border-hairline bg-surface p-7 md:p-8">
							<div className="prose prose-sm max-w-none">
							<Markdown remarkPlugins={[remarkGfm]}>
								{job.description || "No description available."}
							</Markdown>
							</div>
							
						</div>

						<div className="mt-6 flex flex-wrap items-center gap-4">
							{job.applyUrl && (
								<a
									href={job.applyUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/35 hover:brightness-110"
								>
									<ExternalLink className="h-5 w-5" />
									Apply on External Portal
								</a>
							)}
							<a
								href="#apply"
								className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-surface px-7 py-3.5 text-base font-semibold text-ink transition-all hover:border-brand hover:text-brand"
							>
								Apply on this page
								<ArrowUpRight className="h-5 w-5" />
							</a>
						</div>
					</motion.div>

					<motion.div
						id="apply"
						className="lg:sticky lg:top-24 h-fit"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.15,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
					>
						<ApplicationForm initialRole={job.title} />
						<p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
							<Sparkles className="h-3.5 w-3.5 text-brand" />
							Applying takes ~2 minutes. We reply to every applicant.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
