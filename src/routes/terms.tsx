import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
	head: () => ({
		title: "Terms of Service — Devonyx",
		meta: [
			{
				name: "description",
				content:
					"Devonyx Terms of Service. Read the terms and conditions governing your use of our website and digital agency services.",
			},
			{ property: "og:title", content: "Terms of Service — Devonyx" },
			{
				property: "og:description",
				content:
					"Read the terms and conditions governing your use of Devonyx website and services.",
			},
			{ property: "og:url", content: "https://devonyx.in/terms" },
			{ name: "robots", content: "noindex" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in/terms",
			},
		],
	}),
	component: TermsOfService,
});

const h2 = "font-display text-2xl font-medium text-ink mt-10 mb-4";
const h3 = "font-display text-lg font-semibold text-ink mt-6 mb-3";
const p = "text-ink-soft leading-relaxed mb-4";
const ul = "list-disc pl-6 text-ink-soft leading-relaxed mb-4 space-y-2";

function TermsOfService() {
	return (
		<section className="section bg-white">
			<div className="container-x max-w-3xl">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-brand mb-8 block w-fit"
				>
					<ArrowLeft className="h-4 w-4" /> Back to home
				</Link>

				<h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
					Terms of Service
				</h1>
				<p className="mt-3 text-sm text-ink-muted">
					Last updated: September 9, 2026
				</p>

				<div className="mt-10 prose-ink">
					<p className={p}>
						Welcome to Devonyx. These Terms of Service ("Terms") govern your
						use of our website at{" "}
						<a href="https://devonyx.in" className="text-brand underline">
							devonyx.in
						</a>{" "}
						and any services provided by Devonyx ("we," "our," or "us"). By
					 accessing our website or using our services, you agree to be bound
						by these Terms.
					</p>

					<h2 className={h2}>1. Acceptance of Terms</h2>
					<p className={p}>
						By accessing or using our website and services, you acknowledge that
						you have read, understood, and agree to be bound by these Terms. If
						you do not agree to these Terms, please do not use our website or
						services.
					</p>

					<h2 className={h2}>2. Services</h2>
					<p className={p}>
						Devonyx provides digital agency services including but not limited
						to:
					</p>
					<ul className={ul}>
						<li>
							<strong>Build:</strong> SaaS product development, custom software
							development, web and mobile app development, MVP development
						</li>
						<li>
							<strong>Grow:</strong> Lead generation, conversion optimization,
							performance marketing, SEO, marketing funnels and automation
						</li>
						<li>
							<strong>Brand:</strong> Logo design, brand identity and guidelines,
							banners and social creatives, video production and motion design
						</li>
					</ul>
					<p className={p}>
						Service details, deliverables, timelines, and pricing are defined in
						individual project agreements, proposals, or statements of work
						agreed upon between Devonyx and the client.
					</p>

					<h2 className={h2}>3. Quotes and Proposals</h2>
					<p className={p}>
						All quotes and proposals provided through our website or during
						consultation calls are indicative and non-binding until a formal
						project agreement is signed. Pricing is negotiable and scoped to
						each project. We reserve the right to modify pricing based on
						project scope changes.
					</p>

					<h2 className={h2}>4. Client Responsibilities</h2>
					<p className={p}>Clients are responsible for:</p>
					<ul className={ul}>
						<li>Providing accurate and complete project requirements</li>
						<li>Timely delivery of necessary materials, content, and approvals</li>
						<li>Designating a primary point of contact for project communication</li>
						<li>Ensuring they have the rights to any materials provided to us</li>
						<li>Timely payment per the agreed payment schedule</li>
					</ul>

					<h2 className={h2}>5. Intellectual Property</h2>
					<h3 className={h3}>Client Work</h3>
					<p className={p}>
						Upon full payment, the client receives ownership of all deliverables
						specifically created for the project as defined in the project
						agreement. Devonyx retains the right to display completed work in
						our portfolio unless otherwise agreed.
					</p>
					<h3 className={h3}>Devonyx IP</h3>
					<p className={p}>
						Devonyx retains ownership of all pre-existing tools, frameworks,
						methodologies, and general knowledge used in the delivery of
						services. Any proprietary tools or code libraries developed by
						Devonyx remain our intellectual property.
					</p>

					<h2 className={h2}>6. Payment Terms</h2>
					<ul className={ul}>
						<li>Payment terms are defined in each project agreement</li>
						<li>Invoices are payable within the agreed timeframe (default: 14 days)</li>
						<li>Late payments may incur a fee of 1.5% per month</li>
						<li>All prices are in USD unless otherwise specified</li>
						<li>Work may be paused for overdue invoices</li>
					</ul>

					<h2 className={h2}>7. Revisions and Change Requests</h2>
					<p className={p}>
						The number of revision rounds is specified in the project agreement.
						Additional revisions or scope changes beyond the original agreement
						will be quoted separately and may affect timelines and pricing.
					</p>

					<h2 className={h2}>8. Confidentiality</h2>
					<p className={p}>
						Both parties agree to keep confidential any proprietary or sensitive
						information shared during the course of engagement. This obligation
						survives the termination of the business relationship.
					</p>

					<h2 className={h2}>9. Limitation of Liability</h2>
					<p className={p}>
						To the maximum extent permitted by law, Devonyx shall not be liable
						for any indirect, incidental, special, consequential, or punitive
						damages arising from your use of our website or services. Our total
						liability shall not exceed the amount paid by you for the specific
						service giving rise to the claim.
					</p>

					<h2 className={h2}>10. No Warranty</h2>
					<p className={p}>
						Our website and services are provided "as is" and "as available"
						without warranties of any kind, whether express or implied. We do
						not warrant that our services will be uninterrupted, error-free, or
						completely secure.
					</p>

					<h2 className={h2}>11. Termination</h2>
					<p className={p}>
						Either party may terminate a project engagement with written notice
						as specified in the project agreement. Upon termination, the client
						will pay for all work completed up to the termination date. Any
						non-refundable third-party costs already incurred will also be
						chargeable.
					</p>

					<h2 className={h2}>12. Governing Law</h2>
					<p className={p}>
						These Terms are governed by and construed in accordance with the laws
						of India. Any disputes arising under these Terms shall be subject to
						the exclusive jurisdiction of the courts in India.
					</p>

					<h2 className={h2}>13. Changes to These Terms</h2>
					<p className={p}>
						We reserve the right to update these Terms at any time. Changes will
						be posted on this page with an updated "Last updated" date. Your
						continued use of our website after any changes constitutes acceptance
						of the updated Terms.
					</p>

					<h2 className={h2}>14. Contact Us</h2>
					<p className={p}>
						If you have any questions about these Terms, please contact us:
					</p>
					<ul className={ul}>
						<li>
							Email:{" "}
							<a
								href="mailto:query@devonix.in"
								className="text-brand underline"
							>
								query@devonix.in
							</a>
						</li>
						<li>Website: https://devonyx.in</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
