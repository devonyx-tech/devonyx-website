import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cookies")({
	head: () => ({
		title: "Cookie Policy — Devonyx",
		meta: [
			{
				name: "description",
				content:
					"Devonyx Cookie Policy. Learn about the cookies and tracking technologies we use on our website and how to manage your preferences.",
			},
			{ property: "og:title", content: "Cookie Policy — Devonyx" },
			{
				property: "og:description",
				content:
					"Learn about the cookies and tracking technologies Devonyx uses on our website.",
			},
			{ property: "og:url", content: "https://devonyx.in/cookies" },
			{ name: "robots", content: "noindex" },
		],
		links: [
			{
				rel: "canonical",
				href: "https://devonyx.in/cookies",
			},
		],
	}),
	component: CookiePolicy,
});

const h2 = "font-display text-2xl font-medium text-ink mt-10 mb-4";
const h3 = "font-display text-lg font-semibold text-ink mt-6 mb-3";
const p = "text-ink-soft leading-relaxed mb-4";
const ul = "list-disc pl-6 text-ink-soft leading-relaxed mb-4 space-y-2";

function CookiePolicy() {
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
					Cookie Policy
				</h1>
				<p className="mt-3 text-sm text-ink-muted">
					Last updated: September 9, 2026
				</p>

				<div className="mt-10 prose-ink">
					<p className={p}>
						This Cookie Policy explains how Devonyx ("we," "our," or "us")
						uses cookies and similar tracking technologies when you visit our
						website at{" "}
						<a href="https://devonyx.in" className="text-brand underline">
							devonyx.in
						</a>
						. It explains what these technologies are, why we use them, and
						your rights to control their use.
					</p>

					<h2 className={h2}>1. What Are Cookies?</h2>
					<p className={p}>
						Cookies are small text files that are placed on your computer or
						mobile device when you visit a website. They are widely used to make
						websites work more efficiently, provide a better user experience,
						and supply information to the site owners.
					</p>

					<h2 className={h2}>2. Why We Use Cookies</h2>
					<p className={p}>We use cookies for the following purposes:</p>
					<ul className={ul}>
						<li>
							<strong>Essential cookies:</strong> Required for the website to
							properly function (e.g., session management, security).
						</li>
						<li>
							<strong>Analytics cookies:</strong> Help us understand how visitors
							interact with our website by collecting anonymous usage data.
						</li>
						<li>
							<strong>Functional cookies:</strong> Enable enhanced functionality
							and personalization, such as remembering your preferences.
						</li>
					</ul>

					<h2 className={h2}>3. Cookies We Use</h2>

					<h3 className={h3}>Essential Cookies</h3>
					<div className="overflow-x-auto mb-6">
						<table className="w-full text-sm text-left border border-hairline rounded-xl overflow-hidden">
							<thead className="bg-surface">
								<tr>
									<th className="px-4 py-3 font-medium text-ink">
										Cookie
									</th>
									<th className="px-4 py-3 font-medium text-ink">
										Provider
									</th>
									<th className="px-4 py-3 font-medium text-ink">
										Purpose
									</th>
									<th className="px-4 py-3 font-medium text-ink">
										Duration
									</th>
								</tr>
							</thead>
							<tbody className="text-ink-soft">
								<tr className="border-t border-hairline">
									<td className="px-4 py-3 font-mono text-xs">
										__session
									</td>
									<td className="px-4 py-3">Devonyx</td>
									<td className="px-4 py-3">Session management</td>
									<td className="px-4 py-3">Session</td>
								</tr>
								<tr className="border-t border-hairline">
									<td className="px-4 py-3 font-mono text-xs">
										__csrf
									</td>
									<td className="px-4 py-3">Devonyx</td>
									<td className="px-4 py-3">CSRF protection</td>
									<td className="px-4 py-3">Session</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h3 className={h3}>Analytics Cookies</h3>
					<div className="overflow-x-auto mb-6">
						<table className="w-full text-sm text-left border border-hairline rounded-xl overflow-hidden">
							<thead className="bg-surface">
								<tr>
									<th className="px-4 py-3 font-medium text-ink">
										Cookie
									</th>
									<th className="px-4 py-3 font-medium text-ink">
										Provider
									</th>
									<th className="px-4 py-3 font-medium text-ink">
										Purpose
									</th>
									<th className="px-4 py-3 font-medium text-ink">
										Duration
									</th>
								</tr>
							</thead>
							<tbody className="text-ink-soft">
								<tr className="border-t border-hairline">
									<td className="px-4 py-3 font-mono text-xs">
										ph_*_posthog
									</td>
									<td className="px-4 py-3">PostHog</td>
									<td className="px-4 py-3">
										Analytics, session recording, feature flags
									</td>
									<td className="px-4 py-3">Up to 1 year</td>
								</tr>
								<tr className="border-t border-hairline">
									<td className="px-4 py-3 font-mono text-xs">
										__ph_*
									</td>
									<td className="px-4 py-3">PostHog</td>
									<td className="px-4 py-3">
										User identification and event tracking
									</td>
									<td className="px-4 py-3">Up to 1 year</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h2 className={h2}>4. Third-Party Cookies</h2>
					<p className={p}>
						Some cookies are placed by third-party services that appear on our
						pages. We use the following third-party services that may set
						cookies:
					</p>
					<ul className={ul}>
						<li>
							<strong>PostHog:</strong> Product analytics and session recording.
							See{" "}
							<a
								href="https://posthog.com/privacy"
								target="_blank"
								rel="noopener noreferrer"
								className="text-brand underline"
							>
								PostHog Privacy Policy
							</a>
							.
						</li>
						<li>
							<strong>Google Fonts:</strong> Font delivery service. Google may
							set cookies when loading fonts.
						</li>
						<li>
							<strong>Formspree:</strong> Form submission service used on our
							contact form.
						</li>
					</ul>

					<h2 className={h2}>5. Managing Cookies</h2>
					<p className={p}>
						You can control and manage cookies in several ways:
					</p>
					<h3 className={h3}>Browser Settings</h3>
					<p className={p}>
						Most browsers allow you to refuse or accept cookies, delete existing
						cookies, and set preferences for certain websites. Check your
						browser's help section for instructions:
					</p>
					<ul className={ul}>
						<li>
							<strong>Chrome:</strong> Settings &gt; Privacy and security &gt;
							Cookies
						</li>
						<li>
							<strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt;
							Cookies
						</li>
						<li>
							<strong>Safari:</strong> Preferences &gt; Privacy
						</li>
						<li>
							<strong>Edge:</strong> Settings &gt; Privacy, search, and services
						</li>
					</ul>
					<h3 className={h3}>Opt-Out Tools</h3>
					<ul className={ul}>
						<li>
							PostHog: You can opt out of PostHog tracking by disabling JavaScript
							or using a browser extension.
						</li>
						<li>
							Google Analytics: Install the{" "}
							<a
								href="https://tools.google.com/dlpage/gaoptout"
								target="_blank"
								rel="noopener noreferrer"
								className="text-brand underline"
							>
								Google Analytics Opt-out Browser Add-on
							</a>
							.
						</li>
					</ul>

					<h2 className={h2}>6. Impact of Disabling Cookies</h2>
					<p className={p}>
						If you disable or refuse cookies, some parts of our website may
						become inaccessible or not function properly. For example:
					</p>
					<ul className={ul}>
						<li>Forms may not submit correctly</li>
						<li>Session state may be lost</li>
						<li>
							We will be unable to analyze website usage to improve our services
						</li>
					</ul>

					<h2 className={h2}>7. Updates to This Policy</h2>
					<p className={p}>
						We may update this Cookie Policy from time to time to reflect
						changes in the cookies we use or for other operational, legal, or
						regulatory reasons. Please revisit this page regularly to stay
						informed about our use of cookies and related technologies.
					</p>

					<h2 className={h2}>8. Contact Us</h2>
					<p className={p}>
						If you have any questions about our use of cookies, please contact
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
