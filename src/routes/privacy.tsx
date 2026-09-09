import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
	head: () => ({
		title: "Privacy Policy — Devonyx",
		meta: [
			{
				name: "description",
				content:
					"Devonyx Privacy Policy. Learn how we collect, use, and protect your personal information when you use our website and services.",
			},
			{ property: "og:title", content: "Privacy Policy — Devonyx" },
			{
				property: "og:description",
				content:
					"Learn how Devonyx collects, uses, and protects your personal information.",
			},
			{ property: "og:url", content: "https://devonyx.in/privacy" },
			{ name: "robots", content: "noindex" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in/privacy",
			},
		],
	}),
	component: PrivacyPolicy,
});

const h2 = "font-display text-2xl font-medium text-ink mt-10 mb-4";
const h3 = "font-display text-lg font-semibold text-ink mt-6 mb-3";
const p = "text-ink-soft leading-relaxed mb-4";
const ul = "list-disc pl-6 text-ink-soft leading-relaxed mb-4 space-y-2";

function PrivacyPolicy() {
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
					Privacy Policy
				</h1>
				<p className="mt-3 text-sm text-ink-muted">
					Last updated: September 9, 2026
				</p>

				<div className="mt-10 prose-ink">
					<p className={p}>
						Devonyx ("we," "our," or "us") operates the website{" "}
						<a href="https://devonyx.in" className="text-brand underline">
							devonyx.in
						</a>
						. This Privacy Policy explains how we collect, use, disclose, and
						safeguard your information when you visit our website and use our
						services.
					</p>

					<h2 className={h2}>1. Information We Collect</h2>

					<h3 className={h3}>Personal Information</h3>
					<p className={p}>
						We may collect personal information that you voluntarily provide to
						us when you:
					</p>
					<ul className={ul}>
						<li>Fill out a contact or quote request form</li>
						<li>Book a consultation call</li>
						<li>Apply for a job through our careers page</li>
						<li>Subscribe to our newsletter</li>
						<li>Interact with us on social media</li>
					</ul>
					<p className={p}>
						This information may include your name, email address, company name,
						country, phone number, project details, budget range, and any other
						information you choose to provide.
					</p>

					<h3 className={h3}>Automatically Collected Information</h3>
					<p className={p}>
						When you visit our website, we may automatically collect certain
						information about your device and usage, including:
					</p>
					<ul className={ul}>
						<li>IP address and approximate geographic location</li>
						<li>Browser type and version</li>
						<li>Operating system</li>
						<li>Referring website or source</li>
						<li>Pages visited and time spent on each page</li>
						<li>Date and time of your visit</li>
						<li>Device identifiers</li>
					</ul>

					<h2 className={h2}>2. How We Use Your Information</h2>
					<p className={p}>We use the information we collect to:</p>
					<ul className={ul}>
						<li>Respond to your inquiries and provide requested services</li>
						<li>Process quote requests and project consultations</li>
						<li>Evaluate job applications and manage our hiring process</li>
						<li>Send administrative information (e.g., project updates)</li>
						<li>Improve our website, services, and user experience</li>
						<li>Analyze website traffic and usage patterns</li>
						<li>Comply with legal obligations</li>
					</ul>

					<h2 className={h2}>3. Cookies and Tracking Technologies</h2>
					<p className={p}>
						We use cookies and similar tracking technologies to enhance your
						experience on our website. For detailed information, please see our{" "}
						<Link to="/cookies" className="text-brand underline">
							Cookie Policy
						</Link>
						.
					</p>

					<h2 className={h2}>4. How We Share Your Information</h2>
					<p className={p}>
						We do not sell, trade, or rent your personal information to third
						parts. We may share your information with:
					</p>
					<ul className={ul}>
						<li>
							<strong>Service providers:</strong> Third-party vendors who assist
							us in operating our website and providing our services (e.g.,
							Formspree for form submissions, analytics providers).
						</li>
						<li>
							<strong>Legal requirements:</strong> When required by law, court
							order, or governmental regulation.
						</li>
						<li>
							<strong>Business transfers:</strong> In connection with a merger,
							acquisition, or sale of assets.
						</li>
					</ul>

					<h2 className={h2}>5. Data Retention</h2>
					<p className={p}>
						We retain your personal information only for as long as necessary to
						fulfill the purposes for which it was collected, including to satisfy
						any legal, accounting, or reporting requirements. When we no longer
						need your information, we will securely delete or anonymize it.
					</p>

					<h2 className={h2}>6. Data Security</h2>
					<p className={p}>
						We implement appropriate technical and organizational security
						measures to protect your personal information against unauthorized
						access, alteration, disclosure, or destruction. However, no method of
						transmission over the Internet or electronic storage is 100% secure,
						and we cannot guarantee absolute security.
					</p>

					<h2 className={h2}>7. International Data Transfers</h2>
					<p className={p}>
						Devonyx operates globally, with clients and team members across the
						USA, UAE, Netherlands, New Zealand, and India. Your information may
						be transferred to and processed in countries other than your country
						of residence. We ensure appropriate safeguards are in place for such
						transfers.
					</p>

					<h2 className={h2}>8. Your Rights</h2>
					<p className={p}>
						Depending on your location, you may have the following rights
						regarding your personal information:
					</p>
					<ul className={ul}>
						<li>Access and receive a copy of your personal data</li>
						<li>Correct inaccurate or incomplete data</li>
						<li>Request deletion of your personal data</li>
						<li>Object to or restrict processing of your data</li>
						<li>Data portability</li>
						<li>Withdraw consent at any time</li>
					</ul>
					<p className={p}>
						To exercise any of these rights, please contact us at{" "}
						<a
							href="mailto:query@devonix.in"
							className="text-brand underline"
						>
							query@devonix.in
						</a>
						.
					</p>

					<h2 className={h2}>9. Children's Privacy</h2>
					<p className={p}>
						Our services are not directed to individuals under the age of 16. We
						do not knowingly collect personal information from children. If you
						become aware that a child has provided us with personal information,
						please contact us so we can take steps to delete such information.
					</p>

					<h2 className={h2}>10. Third-Party Links</h2>
					<p className={p}>
						Our website may contain links to third-party websites or services
						that are not operated by us. We are not responsible for the privacy
						practices of these third parties. We encourage you to review the
						privacy policy of every site you visit.
					</p>

					<h2 className={h2}>11. Changes to This Policy</h2>
					<p className={p}>
						We may update this Privacy Policy from time to time. We will notify
						you of any changes by posting the new policy on this page and
						updating the "Last updated" date. Your continued use of our website
						after any changes constitutes acceptance of the updated policy.
					</p>

					<h2 className={h2}>12. Contact Us</h2>
					<p className={p}>
						If you have any questions about this Privacy Policy, please contact
						us:
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
