import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/hooks";
import { getPostsFn } from "@/lib/server-functions";

function formatDate(d: string | undefined) {
	if (!d) return "";
	const date = new Date(d);
	if (Number.isNaN(date.getTime())) return d;
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

// ---- Normalize a post object from the API (supports both our fields and the server's) ----
interface PostInput {
	id: string;
	slug?: string;
	title?: string;
	name?: string;
	date?: string;
	description?: string;
	seoTitle?: string;
	tags?: unknown;
	cover?: string | null;
	published?: boolean;
	blocks?: unknown;
}

function normalizePost(p: PostInput) {
	return {
		id: p.id,
		slug: p.slug || p.id,
		title: p.title || p.name || "Untitled",
		date: p.date || "",
		description: p.description || "",
		seoTitle: p.seoTitle || "",
		tags: Array.isArray(p.tags) ? p.tags : [],
		cover: p.cover || null,
		published: p.published !== false,
		blocks: Array.isArray(p.blocks) ? p.blocks : undefined,
	};
}

// ---- Render rich text (bold / italic / code / links / etc.) ----
function RichText({
	value,
}: {
	value: Array<{
		plain_text: string;
		annotations?: Record<string, unknown>;
		href?: string;
	}>;
}) {
	return (
		<>
			{(value || []).map((t) => {
				const { annotations = {}, href } = t;
				let node: React.ReactNode = <>{t.plain_text}</>;
				if (href) {
					node = (
						<a href={href} target="_blank" rel="noopener noreferrer">
							{t.plain_text}
						</a>
					);
				}
				if (annotations.bold) node = <strong>{node}</strong>;
				if (annotations.italic) node = <em>{node}</em>;
				if (annotations.underline) node = <u>{node}</u>;
				if (annotations.strikethrough) node = <del>{node}</del>;
				if (annotations.code) node = <code>{node}</code>;
				return <span key={t.plain_text + (t.href || "")}>{node}</span>;
			})}
		</>
	);
}

// ---- Convert Notion blocks + children into React elements ----
function _Blocks({
	blocks,
	depth = 0,
}: {
	blocks: Array<Record<string, unknown>>;
	depth?: number;
}) {
	if (!blocks || blocks.length === 0 || depth > 4) return null;

	return (
		<div className={depth === 0 ? "mt-2" : ""}>
			{blocks.map((block) => {
				const children = block.has_children ? (
					<_Blocks
						blocks={(block.children || []) as Array<Record<string, unknown>>}
						depth={depth + 1}
						key={block.id}
					/>
				) : null;
				const rt = (b: Record<string, unknown>) =>
					(b?.rich_text as Array<{
						plain_text: string;
						annotations?: Record<string, unknown>;
						href?: string;
					}>) || [];
				switch (block.type) {
					case "paragraph":
						return (
							<p key={block.id}>
								{rt(block.paragraph as Record<string, unknown>) ? (
									<RichText
										value={rt(block.paragraph as Record<string, unknown>)}
									/>
								) : (
									"\u00A0"
								)}
							</p>
						);
					case "heading_1":
						return (
							<h2 key={block.id}>
								<RichText
									value={rt(block.heading_1 as Record<string, unknown>)}
								/>
							</h2>
						);
					case "heading_2":
						return (
							<h3 key={block.id}>
								<RichText
									value={rt(block.heading_2 as Record<string, unknown>)}
								/>
							</h3>
						);
					case "heading_3":
						return (
							<h4 key={block.id}>
								<RichText
									value={rt(block.heading_3 as Record<string, unknown>)}
								/>
							</h4>
						);
					case "bulleted_list_item":
						return (
							<li key={block.id}>
								<RichText
									value={rt(
										block.bulleted_list_item as Record<string, unknown>,
									)}
								/>
								{children}
							</li>
						);
					case "numbered_list_item":
						return (
							<li key={block.id}>
								<RichText
									value={rt(
										block.numbered_list_item as Record<string, unknown>,
									)}
								/>
								{children}
							</li>
						);
					case "to_do":
						return (
							<p key={block.id} className="notion-todo">
								{block.to_do?.checked ? "☑" : "☐"}&nbsp;
								<RichText value={rt(block.to_do as Record<string, unknown>)} />
							</p>
						);
					case "toggle":
						return (
							<details key={block.id}>
								<summary>
									<RichText
										value={rt(block.toggle as Record<string, unknown>)}
									/>
								</summary>
								{children}
							</details>
						);
					case "quote":
						return (
							<blockquote key={block.id}>
								<RichText value={rt(block.quote as Record<string, unknown>)} />
							</blockquote>
						);
					case "code":
						return (
							<pre key={block.id}>
								<code>
									{rt(block.code as Record<string, unknown>)
										.map((t) => t.plain_text)
										.join("")}
								</code>
							</pre>
						);
					case "divider":
						return <hr key={block.id} />;
					case "callout":
						return (
							<div key={block.id} className="notion-callout">
								<RichText
									value={rt(block.callout as Record<string, unknown>)}
								/>
							</div>
						);
					case "image": {
						const img = block.image as Record<string, unknown> | undefined;
						const src =
							img?.type === "external"
								? (img.external as Record<string, unknown>)?.url
								: (img?.file as Record<string, unknown>)?.url;
						if (!src) return null;
						return (
							<figure key={block.id}>
								<img
									src={src as string}
									alt={
										(img?.caption as Array<{ plain_text: string }>)
											?.map((c) => c.plain_text)
											.join("") || ""
									}
									loading="lazy"
								/>
								{img?.caption?.length > 0 && (
									<figcaption>
										{(img.caption as Array<{ plain_text: string }>)
											.map((c) => c.plain_text)
											.join("")}
									</figcaption>
								)}
							</figure>
						);
					}
					case "child_page":
						return null;
					default:
						return null;
				}
			})}
		</div>
	);
}

function PostCard({ p }: { p: ReturnType<typeof normalizePost> }) {
	return (
		<Reveal delay={80}>
			<Link
				to="/blog/$slug"
				params={{ slug: p.slug }}
				className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface text-left shadow-xs transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
			>
				{p.cover && (
					<div className="relative h-44 overflow-hidden">
						<img
							src={p.cover}
							alt={p.title}
							loading="lazy"
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>
				)}
				<div className="flex flex-1 flex-col p-6">
					<div className="flex items-center gap-2 text-xs text-ink-muted">
						{p.date && (
							<span className="flex items-center gap-1.5">
								<CalendarDays className="h-3.5 w-3.5" />
								{formatDate(p.date)}
							</span>
						)}
					</div>
					<h3 className="mt-2.5 font-display text-xl font-medium leading-snug text-ink">
						{p.title}
					</h3>
					{p.description && (
						<p className="mt-2 text-sm leading-relaxed text-ink-soft">
							{p.description}
						</p>
					)}
					{p.tags.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-1.5">
							{p.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-brand/10 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide text-brand-dark"
								>
									{tag}
								</span>
							))}
						</div>
					)}
					<span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-dark transition-colors group-hover:text-brand">
						Read article{" "}
						<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</span>
				</div>
			</Link>
		</Reveal>
	);
}

interface Post {
	id: string;
	slug: string;
	title: string;
	date: string;
	description: string;
	seoTitle: string;
	tags: string[];
	cover: string | null;
	published: boolean;
	blocks?: Array<Record<string, unknown>>;
}

function BlogList({ posts }: { posts: Post[] }) {
	return (
		<div className="mt-12">
			{!posts || posts.length === 0 ? (
				<div className="rounded-2xl border border-hairline bg-surface p-8 text-center text-sm text-ink-muted">
					No published posts yet. Publish a post in your Notion database and it
					will appear here.
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((p) => (
						<PostCard key={p.id} p={normalizePost(p)} />
					))}
				</div>
			)}
		</div>
	);
}

export const Route = createFileRoute("/blog/")({
	loader: async () => {
		const posts = await getPostsFn();
		return { posts };
	},
	component: BlogPage,
});

function BlogPage() {
	const { posts } = Route.useLoaderData();

	return (
		<section id="blog" className="section bg-white">
			<div className="container-x">
				<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<Reveal>
							<span className="eyebrow">Blog</span>
						</Reveal>
						<Reveal delay={100}>
							<h2 className="mt-5 text-balance font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
								Notes from the{" "}
								<span className="serif-accent text-brand-dark">studio</span>.
							</h2>
						</Reveal>
						<Reveal delay={200}>
							<p className="mt-5 text-lg text-ink-soft">
								Design, engineering, and growth deep-dives — published from
								Notion, live here instantly.
							</p>
						</Reveal>
					</div>
				</div>

				<BlogList posts={posts} />

				<div className="mt-12 text-center">
					<Link
						to="/"
						className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
					>
						<ArrowLeft className="h-4 w-4" /> Back to home
					</Link>
				</div>
			</div>
		</section>
	);
}
