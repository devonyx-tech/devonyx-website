import {
	CheckCircle2,
	FileText,
	Link2,
	Loader2,
	Mail,
	Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ApplicationForm({
	initialRole = "",
}: {
	initialRole?: string;
}) {
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
						disabled={!!initialRole}
						placeholder="Select a role"
						className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint shadow-xs outline-hidden transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"							
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
