import { CalendarRange, ChevronDown, Clock, Plus } from "lucide-react";
import { motion } from "motion/react";

const serviceGroups = [
	{
		id: "development",
		label: "Development",
		tagline:
			"Modern web apps, MVPs, and product platforms on a React + TypeScript stack.",
		rows: [
			{
				service: "Landing page / marketing site",
				detail:
					"Fast, responsive, on-brand. Includes basic SEO, analytics, and contact integrations.",
				timeline: "3–5 days",
				from: "US$ 399",
			},
			{
				service: "MVP & web application",
				detail:
					"React + TypeScript build with custom features, database, backend, and deployment.",
				timeline: "2–4 weeks",
				from: "US$ 899",
			},
			{
				service: "SaaS / platform build",
				detail:
					"Multi-page apps, auth, payments, dashboards, third-party integrations, clean architecture.",
				timeline: "4–12 weeks",
				from: "Custom",
			},
			{
				service: "AI & automation",
				detail:
					"LLM-powered features, autonomous agents, data pipelines, and workflow automation.",
				timeline: "Ongoing",
				from: "Custom",
			},
			{
				service: "Maintenance & care plans",
				detail:
					"Deploys, monitoring, updates, bug fixes, and iterative product improvements.",
				timeline: "Monthly",
				from: "Custom",
			},
		],
	},
	{
		id: "marketing",
		label: "Marketing",
		tagline:
			"Performance marketing, funnels, and SEO engineered for measurable growth.",
		rows: [
			{
				service: "Ad campaigns (Google & Meta)",
				detail:
					"Campaign setup, audience targeting, ad creative, bidding, and conversion tracking.",
				timeline: "1–2 weeks",
				from: "US$ 199",
			},
			{
				service: "Funnels & landing pages",
				detail:
					"High-converting landing pages and full sales funnels with attribution wiring.",
				timeline: "1–2 weeks",
				from: "US$ 299",
			},
			{
				service: "SEO & content foundation",
				detail:
					"Keyword research, on-page SEO, technical fixes, and a publishing cadence.",
				timeline: "Ongoing",
				from: "US$ 299",
			},
			{
				service: "CRO & A/B testing",
				detail:
					"Experimentation roadmap, hypothesis-driven tests, and conversion-rate optimization.",
				timeline: "Ongoing",
				from: "Custom",
			},
			{
				service: "Automation & lead routing",
				detail:
					"Email sequences, CRM sync, lead scoring, and multi-channel nurture flows.",
				timeline: "1–3 weeks",
				from: "Custom",
			},
		],
	},
	{
		id: "design",
		label: "Design",
		tagline:
			"Brand identity, visual design, motion, and video that make you look pro.",
		rows: [
			{
				service: "Logo & brand identity",
				detail:
					"Logo suite, color system, typography, and a usage guideline pack.",
				timeline: "1–2 weeks",
				from: "US$ 99",
			},
			{
				service: "Brand identity & guidelines",
				detail:
					"Full visual identity, brand kit, and social/banner asset system.",
				timeline: "2–3 weeks",
				from: "US$ 189",
			},
			{
				service: "UI/UX for web & product",
				detail:
					"Interface design, design systems, prototypes, and handoff to build.",
				timeline: "2–4 weeks",
				from: "Custom",
			},
			{
				service: "Video editing & motion",
				detail:
					"Reels, explainers, motion graphics, and short-form content in your brand language.",
				timeline: "Ongoing",
				from: "Custom",
			},
			{
				service: "Design retainers",
				detail:
					"A dedicated designer with priority turnaround for ongoing requests.",
				timeline: "Monthly",
				from: "Custom",
			},
		],
	},
];

export default function PricingTable() {
	return (
		<motion.section
			id="pricing-services"
			className="mt-24"
			initial={{ opacity: 0, y: 32 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
		>
			<div className="mx-auto max-w-2xl text-center">
				<span className="eyebrow justify-center">Every service, explained</span>
				<h3 className="mt-4 text-balance font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
					What's actually{" "}
					<span className="serif-accent text-brand-dark">included</span>
				</h3>
				<p className="mt-4 text-lg text-ink-soft">
					A full breakdown of what each deliverable covers, how long it takes,
					and where it starts. Every project is scoped to you.
				</p>
			</div>

			<div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-hairline bg-surface shadow-xl shadow-black/4">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[680px] border-collapse text-left">
						<thead>
							<tr className="bg-ink-gradient text-white">
								<th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider">
									Service
								</th>
								<th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-white/80">
									What's included
								</th>
								<th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-white/80">
									Timeline
								</th>
								<th className="px-6 py-4 text-right font-mono text-[11px] font-semibold uppercase tracking-wider text-white/80">
									Starting at
								</th>
							</tr>
						</thead>
						{serviceGroups.map((group) => (
							<tbody key={group.id}>
								<tr className="border-t border-hairline bg-white/50">
									<td className="px-6 pb-1 pt-5" colSpan={4}>
										<div className="flex items-center gap-2">
											<Plus className="h-4 w-4 text-brand" />
											<span className="font-display text-lg font-medium text-ink">
												{group.label}
											</span>
											<span className="ml-2 hidden text-sm text-ink-muted sm:inline">
												— {group.tagline}
											</span>
										</div>
									</td>
								</tr>
								{group.rows.map((row, i) => (
									<motion.tr
										key={row.service}
										className="border-t border-hairline transition-colors hover:bg-brand/5"
										initial={{ opacity: 0, x: -16 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, margin: "-40px" }}
										transition={{ duration: 0.45, delay: i * 0.06 }}
									>
										<td className="px-6 py-4 align-top font-medium text-ink">
											{row.service}
										</td>
										<td className="px-6 py-4 align-top text-sm leading-relaxed text-ink-soft">
											{row.detail}
										</td>
										<td className="px-6 py-4 align-top">
											<span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/5 px-3 py-1 font-mono text-xs text-ink-muted">
												<Clock className="h-3.5 w-3.5" />
												{row.timeline}
											</span>
										</td>
										<td className="px-6 py-4 align-top text-right">
											<span className="whitespace-nowrap font-mono text-sm font-medium text-brand-dark">
												{row.from}
											</span>
										</td>
									</motion.tr>
								))}
							</tbody>
						))}
					</table>
				</div>
			</div>

			<div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-muted">
				<span className="flex items-center gap-2">
					<CalendarRange className="h-4 w-4 text-brand" />
					Timelines measured from kickoff call to handoff.
				</span>
				<span className="flex items-center gap-2">
					<ChevronDown className="h-4 w-4 text-brand" />
					Most plans can be combined — mixing Dev + Design + Marketing is
					common.
				</span>
			</div>
		</motion.section>
	);
}
