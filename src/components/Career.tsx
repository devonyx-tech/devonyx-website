import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	ArrowUpRight,
	Briefcase,
	Calendar,
	CheckCircle2,
	Clock,
	ExternalLink,
	FileText,
	Link2,
	Loader2,
	Mail,
	MapPin,
	Send,
	Users,
} from "lucide-react";
import { Suspense, useState } from "react";
import type { CareerJob } from "@/lib/notion";
import { getCareerJobsFn } from "@/lib/server-functions";
import { Reveal } from "../hooks";

export const Route = createFileRoute("/careers")({
	loader: async () => {
		const jobs = await getCareerJobsFn();
		return { jobs: jobs || [] };
	},
	component: CareersPage,
});

function JobCardSkeleton() {
	return (
		<motion.button
			type="button"
			className="group text-left rounded-2xl border p-6 transition-all border-hairline bg-surface"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<div className="flex items-center gap-2">
						<div className="h-5 w-5 rounded-full bg-brand/10 animate-pulse" />
					</div>
					<div className="h-6 w-3/4 bg-ink/5 rounded mt-3 animate-pulse" />
					<div className="h-4 w-1/2 bg-ink/5 rounded mt-2 animate-pulse" />
					<div className="h-4 w-2/3 bg-ink/5 rounded mt-2 animate-pulse" />
				</div>
			</div>
			<div className="h-4 w-full bg-ink/5 rounded mt-3 animate-pulse" />
		</motion.button>
	);
}

function JobCard({
	job,
	index,
	isSelected,
	onSelect,
}: {
	job: CareerJob;
	index: number;
	isSelected: boolean;
	onSelect: () => void;
}) {
	const departmentColors = {
		Development: "bg-blue-500/10 text-blue-400 border-blue-500/20",
		Marketing: "bg-pink-500/10 text-pink-400 border-pink-500/20",
		Design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
		Engineering: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
		Sales: "bg-orange-500/10 text-orange-400 border-orange-500/20",
		Operations: "bg-slate-500/10 text-slate-400 border-slate-500/20",
		"Human Resources": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
		Finance: "bg-green-500/10 text-green-400 border-green-500/20",
	};

	const typeColors = {
		"Full-time": "bg-brand/10 text-brand border-brand/20",
		"Part-time": "bg-amber-500/10 text-amber-400 border-amber-500/20",
		Contract: "bg-violet-500/10 text-violet-400 border-violet-500/20",
		Internship: "bg-sky-500/10 text-sky-400 border-sky-500/20",
		Remote: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
	};

	return (
		<motion.button
			type="button"
			key={job.id}
			onClick={onSelect}
			className={`group text-left rounded-2xl border p-6 transition-all duration-300 ${
				isSelected
					? "border-brand bg-surface shadow-lg shadow-brand/10"
					: "border-hairline bg-surface hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
			}`}
			whileHover={{ x: 4 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.06 }}
		>
			<motion.div
				className="flex items-start justify-between gap-4"
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1 }}
			>
				<div>
					<motion.div
						className="flex items-center gap-2"
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15 }}
					>
						<span
							className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide border ${
								departmentColors[
									job.department as keyof typeof departmentColors
								] || "bg-brand/10 text-brand border-brand/20"
							}`}
						>
							{job.department || "General"}
						</span>
					</motion.div>
					<motion.h3
						className="mt-3 font-display text-xl font-medium text-ink"
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						{job.title}
					</motion.h3>
					<motion.div
						className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted"
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.25 }}
					>
						<span className="flex items-center gap-1.5">
							<Briefcase className="h-4 w-4" />
							{job.employmentType || "Full-time"}
						</span>
						<span className="flex items-center gap-1.5">
							<MapPin className="h-4 w-4" />
							{job.location}
						</span>
						{job.level && (
							<span className="flex items-center gap-1.5">
								<Users className="h-4 w-4" />
								{job.level}
							</span>
						)}
					</motion.div>
				</div>
				<motion.div
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all group-hover:scale-110 group-hover:bg-brand/20"
					initial={{ opacity: 0, rotate: -45 }}
					animate={{ opacity: 1, rotate: 0 }}
					transition={{ delay: 0.3 }}
				>
					<ArrowUpRight className="h-5 w-5" />
				</motion.div>
			</motion.div>
			<motion.p
				className="mt-3 text-sm leading-relaxed text-ink-soft"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.35 }}
			>
				{job.description?.slice(0, 150) ||
					"Exciting opportunity to join our team."}
			</motion.p>
			<motion.div
				className="mt-4 flex flex-wrap gap-2"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				{job.employmentType && (
					<span
						className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide border ${
							typeColors[job.employmentType as keyof typeof typeColors] ||
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
							year: "numeric",
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
			</motion.div>
		</motion.button>
	);
}

function JobDetail({ job }: { job: CareerJob }) {
	return (
		<motion.div
			className="rounded-3xl border border-hairline bg-surface p-7 shadow-xl shadow-black/4 md:p-8"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
		>
			<div className="flex items-start justify-between gap-4 mb-6">
				<div>
					<h3 className="font-display text-xl font-medium text-ink">
						{job.title}
					</h3>
					<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
						<span className="flex items-center gap-1.5">
							<Briefcase className="h-4 w-4" />
							{job.employmentType || "Full-time"}
						</span>
						<span className="flex items-center gap-1.5">
							<MapPin className="h-4 w-4" />
							{job.location}
						</span>
						{job.level && (
							<span className="flex items-center gap-1.5">
								<Users className="h-4 w-4" />
								{job.level}
							</span>
						)}
						{job.postedDate && (
							<span className="flex items-center gap-1.5">
								<Calendar className="h-4 w-4" />
								Posted:{" "}
								{new Date(job.postedDate).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</span>
						)}
						{job.closingDate && (
							<span className="flex items-center gap-1.5 text-amber-600">
								<Clock className="h-4 w-4" />
								Closes:{" "}
								{new Date(job.closingDate).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</span>
						)}
					</div>
				</div>
				{job.reqId && (
					<span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 font-mono text-xs text-ink-muted">
						Req: {job.reqId}
					</span>
				)}
			</div>

			<div className="prose prose-ink max-w-none mb-6">
				<p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
					{job.description || "No description available."}
				</p>
			</div>

			{job.applyUrl && (
				<a
					href={job.applyUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/35 hover:brightness-110"
				>
					<ExternalLink className="h-5 w-5" />
					Apply on External Portal
				</a>
			)}
		</motion.div>
	);
}

function ApplicationForm({ initialRole = "" }: { initialRole?: string }) {
	const [status, setStatus] = useState("idle");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries());
		setStatus("sending");

		try {
			const res = await fetch("https://formspree.io/f/maeyndpy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					...data,
					_subject: `Job application: ${data.role} — ${data.name}`,
				}),
			});
			if (!res.ok) throw new Error("Submission failed");
			setStatus("success");
			setSubmitted(true);
			form.reset();
		} catch (_err) {
			setStatus("error");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-3xl border border-hairline bg-surface p-7 shadow-xl shadow-black/4 md:p-8"
		>
			<motion.h3
				className="font-display text-xl font-medium text-ink"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
			>
				Apply for a role
			</motion.h3>
			<motion.p
				className="mt-1 text-sm text-ink-muted"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				Your application is sent securely & we'll get back to you shortly.
			</motion.p>

			<motion.div
				className="mt-6 grid gap-5"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<div>
					<label
						htmlFor="career-role"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						Position *
					</label>
					<input
						id="career-role"
						name="role"
						required
						type="text"
						defaultValue={initialRole}
						placeholder="Select a role"
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
				<div>
					<label
						htmlFor="career-name"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						Full Name *
					</label>
					<input
						id="career-name"
						name="name"
						required
						type="text"
						placeholder="Jane Cooper"
						autoComplete="name"
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
				<div>
					<label
						htmlFor="career-email"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						Email *
					</label>
					<input
						id="career-email"
						name="email"
						required
						type="email"
						placeholder="jane@company.com"
						autoComplete="email"
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
				<div>
					<label
						htmlFor="career-linkedin"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						LinkedIn Profile
					</label>
					<input
						id="career-linkedin"
						name="linkedin"
						type="text"
						placeholder="linkedin.com/in/jane"
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
				<div>
					<label
						htmlFor="career-portfolio"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						Portfolio / Website
					</label>
					<input
						id="career-portfolio"
						name="portfolio"
						type="text"
						placeholder="janecooper.dev or github.com/jane"
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
				<div>
					<label
						htmlFor="career-resume"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						Resume Link (Google Drive, Notion, etc.)
					</label>
					<input
						id="career-resume"
						name="resume"
						type="text"
						placeholder="drive.google.com/file/d/... or notion.site/..."
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
				<div>
					<label
						htmlFor="career-message"
						className="mb-1.5 block text-sm font-medium text-ink-soft"
					>
						Message *
					</label>
					<textarea
						id="career-message"
						name="message"
						required
						rows={4}
						placeholder="Why are you a great fit? Tell us about your experience, notable projects, and what excites you about Devonyx."
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
					/>
				</div>
			</motion.div>

			<motion.button
				type="submit"
				disabled={status === "sending"}
				className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/35 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
			>
				<Send className="h-5 w-5" />
				{status === "sending" ? (
					<>
						<Loader2 className="h-5 w-5 animate-spin" />
						Submitting…
					</>
				) : (
					"Submit Application"
				)}
			</motion.button>
			{status === "error" && (
				<motion.p
					className="mt-3 text-center text-sm text-red-600"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
				>
					Something went wrong. Please try again or email query@devonix.in.
				</motion.p>
			)}
			{submitted && (
				<motion.div
					className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", damping: 15 }}
				>
					<CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
					<h4 className="mt-4 font-display text-lg font-medium text-emerald-800">
						Application sent!
					</h4>
					<p className="mt-1 text-sm text-emerald-700">
						Thanks for applying. Our team will review your application and get
						back to you soon.
					</p>
					<button
						type="button"
						onClick={() => setSubmitted(false)}
						className="mt-3 text-sm font-semibold text-brand-dark hover:text-brand"
					>
						Submit another application
					</button>
				</motion.div>
			)}
			<motion.div
				className="mt-3 space-y-1.5 text-center text-xs text-ink-muted"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				<p className="flex items-center justify-center gap-1.5">
					<Mail className="h-3.5 w-3.5" />
					Applications are sent securely via Formspree
				</p>
				<p className="flex items-center justify-center gap-1.5">
					<FileText className="h-3.5 w-3.5" />
					Resume link helps us review faster — share a view-only link
				</p>
				<p className="flex items-center justify-center gap-1.5">
					<Link2 className="h-3.5 w-3.5" />
					Portfolio shows your work better than any CV
				</p>
			</motion.div>
		</form>
	);
}

function CareersPage() {
	const { jobs } = Route.useLoaderData();
	const jobsArray = Array.isArray(jobs) ? jobs : [];
	const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

	const selectedJob =
		jobsArray.find((j) => j.id === selectedJobId) || jobsArray[0];

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
				<div className="max-w-2xl">
					<Reveal>
						<span className="eyebrow">Careers</span>
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
					<motion.div
						className="mt-14"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
							<motion.div
								className="flex flex-col gap-4"
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3, duration: 0.6 }}
							>
								<Suspense fallback={<JobCardSkeleton />}>
									{jobsArray.map((job, i) => (
										<JobCard
											key={job.id}
											job={job}
											index={i}
											isSelected={selectedJobId === job.id}
											onSelect={() => setSelectedJobId(job.id)}
										/>
									))}
								</Suspense>
							</motion.div>

							<motion.div
								className="sticky top-24"
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4, duration: 0.6 }}
							>
								{selectedJob ? (
									<JobDetail job={selectedJob} />
								) : (
									<ApplicationForm initialRole={jobsArray[0]?.title || ""} />
								)}
							</motion.div>
						</div>
					</motion.div>
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

export { CareersPage };
