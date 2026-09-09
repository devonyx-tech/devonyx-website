import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;
const careersDataSourceId = process.env.NOTION_CAREERS_DATA_SOURCE_ID;
const projectsDataSourceId = process.env.NOTION_PROJECTS_DATA_SOURCE_ID;

export function isNotionConfigured() {
	const token = process.env.NOTION_TOKEN;
	return !!token && !/PLEASE_PASTE|xxxx+/.test(token);
}

export function plainText(arr = []) {
	return arr.map((t) => t.plain_text).join("");
}

interface CoverProp {
	files?: Array<{
		type: string;
		external?: { url: string };
		file?: { url: string };
	}>;
}

export function coverUrl(coverProp: CoverProp | null | undefined) {
	const f = coverProp?.files?.[0];
	if (!f) return null;
	if (f.type === "external") return f.external.url;
	if (f.type === "file") return f.file.url;
	return null;
}

interface NotionPage {
	id: string;
	properties: Record<string, unknown>;
	last_edited_time: string;
	created_time?: string;
}

export function mapPost(page: NotionPage) {
	const p = page.properties;

	return {
		id: page.id,
		name: plainText(p.Name?.title),
		slug: plainText(p.Slug?.rich_text),
		published: p.Published?.checkbox ?? false,
		featured: p.Featured?.checkbox ?? false,
		date: p.Date?.date?.start ?? null,
		description: plainText(p.Description?.rich_text),
		seoTitle: plainText(p["SEO Title"]?.rich_text),
		tags: (p.Tags?.multi_select ?? []).map((t: { name: string }) => t.name),
		cover: coverUrl(p.Cover),
		lastEditedTime: page.last_edited_time,
	};
}

export async function getPosts(featured = false) {
	if (!isNotionConfigured()) {
		throw new Error("NOTION_TOKEN not configured");
	}

	const filterConditions = [
		{ property: "Published", checkbox: { equals: true } },
	];

	if (featured) {
		filterConditions.push({ property: "Featured", checkbox: { equals: true } });
	}

	const result = await notion.dataSources.query({
		data_source_id: dataSourceId,
		filter:
			filterConditions.length > 1
				? { and: filterConditions }
				: filterConditions[0],
		sorts: [{ property: "Date", direction: "descending" }],
	});

	return result.results.map(mapPost);
}

export async function getPost(slug: string) {
	if (!isNotionConfigured()) {
		throw new Error("NOTION_TOKEN not configured");
	}

	const result = await notion.dataSources.query({
		data_source_id: dataSourceId,
		filter: {
			and: [
				{ property: "Published", checkbox: { equals: true } },
				{ property: "Slug", rich_text: { equals: slug } },
			],
		},
		page_size: 1,
	});

	const page = result.results[0];
	if (!page) return null;

	// Fetch all page content blocks (handle pagination)
	let allBlocks: Array<Record<string, unknown>> = [];
	let startCursor: string | undefined;
	do {
		const r = await notion.blocks.children.list({
			block_id: page.id,
			start_cursor: startCursor,
			page_size: 100,
		});
		allBlocks = allBlocks.concat(r.results);
		startCursor = r.has_more ? r.next_cursor : undefined;
	} while (startCursor);

	return {
		...mapPost(page),
		blocks: allBlocks,
	};
}

// ============ CAREERS ============

export interface CareerJob {
	id: string;
	title: string;
	reqId: string;
	status: string;
	department: string;
	employmentType: string;
	level: string;
	location: string;
	postedDate: string | null;
	closingDate: string | null;
	applyUrl: string;
	lastEdited: string;
	created: string;
	description: string;
}

function mapCareerJob(page: NotionPage): CareerJob {
	const p = page.properties;
	const reqId = p["Req ID"]?.unique_id as
		| { prefix?: string | null; number?: number | null }
		| undefined;
	return {
		id: page.id,
		title: plainText(p.Title?.title ?? p.Name?.title),
		reqId: reqId?.number?.toString() ?? "",
		status: p.Status?.status?.name ?? p.Status?.select?.name ?? "",
		department: p.Department?.select?.name ?? "",
		employmentType: p["Employment Type"]?.select?.name ?? "",
		level: p.Level?.select?.name ?? "",
		location: plainText(p.Location?.rich_text ?? []),
		postedDate: p["Posted Date"]?.date?.start ?? null,
		closingDate: p["Closing Date"]?.date?.start ?? null,
		applyUrl: p["Apply URL"]?.url ?? "",
		lastEdited: page.last_edited_time,
		created: page.created_time ?? "",
		description: plainText(p.Description?.rich_text ?? []),
	};
}

export async function getCareerJobs() {
	if (!isNotionConfigured()) {
		throw new Error("NOTION_TOKEN not configured");
	}

	if (!careersDataSourceId) {
		throw new Error("NOTION_CAREERS_DATA_SOURCE_ID not configured");
	}

	// Status is a "status" type with options: Draft, Review, Published, Closed
	// "Published" is the active/open state
	let result: Awaited<ReturnType<typeof notion.dataSources.query>>;
	try {
		result = await notion.dataSources.query({
			data_source_id: careersDataSourceId,
			filter: {
				property: "Status",
				status: { equals: "Published" },
			},
			sorts: [{ property: "Posted Date", direction: "descending" }],
		});
	} catch (filterError: unknown) {
		console.warn("Status filter failed, trying fallback:", filterError);
		result = await notion.dataSources.query({
			data_source_id: careersDataSourceId,
			sorts: [{ property: "Posted Date", direction: "descending" }],
		});
		// Filter in memory for Published status
		result.results = result.results.filter((page: NotionPage) => {
			const status =
				page.properties?.Status?.status?.name ??
				(page.properties?.Status as { select?: { name?: string } } | undefined)?.select?.name ??
				"";
			return status === "Published";
		});
	}

	return result.results.map(mapCareerJob);
}

export async function getCareerJobById(id: string) {
	if (!isNotionConfigured()) {
		throw new Error("NOTION_TOKEN not configured");
	}

	if (!careersDataSourceId) {
		throw new Error("NOTION_CAREERS_DATA_SOURCE_ID not configured");
	}

	const result = await notion.dataSources.query({
		data_source_id: careersDataSourceId,
		filter: {
			property: "ID",
			title: { equals: id },
		},
		page_size: 1,
	});

	const page = result.results[0];
	if (!page) return null;
	return mapCareerJob(page);
}

// ============ PROJECTS ============

export interface ProjectItem {
	id: string;
	name: string;
	category: string;
	status: string;
	priority: string;
	liveLink: string;
	dueDate: string | null;
	repoLink: string;
	notes: string;
	images: string[];
	coverImage: string | null;
	lastEdited: string;
	created: string;
}

function mapProjectItem(page: NotionPage): ProjectItem {
	const p = page.properties;

	// Handle images - Files property
	let images: string[] = [];
	const imagesProp = p.Images ?? p.images;
	if (imagesProp?.files) {
		images = imagesProp.files
			.map(
				(f: {
					type: string;
					external?: { url: string };
					file?: { url: string };
				}) => {
					if (f.type === "external") return f.external.url;
					if (f.type === "file") return f.file.url;
					return null;
				},
			)
			.filter(Boolean);
	}

	// Handle multi-select category
	let category = "";
	const categoryProp = p.Category ?? p.category;
	if (categoryProp?.multi_select) {
		category = categoryProp.multi_select
			.map((opt: { name: string }) => opt.name)
			.join(", ");
	} else if (categoryProp?.select?.name) {
		category = categoryProp.select.name;
	}

	return {
		id: page.id,
		name: plainText(
			p.Project?.title ?? p.Name?.title ?? p["Project Name"]?.title,
		),
		category,
		status: p.Status?.status?.name ?? p.Status?.select?.name ?? "",
		priority: p.Priority?.select?.name ?? p.priority?.select?.name ?? "",
		liveLink:
			p["Live link"]?.url ?? p["live_link"]?.url ?? p["LiveLink"]?.url ?? "",
		dueDate: p.Due?.date?.start ?? p.due?.date?.start ?? null,
		repoLink:
			p["Repo link"]?.url ?? p["repo_link"]?.url ?? p["RepoLink"]?.url ?? "",
		notes: plainText(
			p.Notes?.rich_text ?? p.notes?.rich_text ?? p.Description?.rich_text,
		),
		images,
		coverImage:
			images[0] || coverUrl(p.Cover ?? p["Cover Image"] ?? p.cover_image),
		lastEdited: page.last_edited_time,
		created:
			p.Created?.date?.start ?? p.created?.date?.start ?? page.created_time,
	};
}

export async function getProjects() {
	if (!isNotionConfigured()) {
		throw new Error("NOTION_TOKEN not configured");
	}

	if (!projectsDataSourceId) {
		throw new Error("NOTION_PROJECTS_DATA_SOURCE_ID not configured");
	}

	// Status is a "status" type with options: Backlog, Planned, In progress, Blocked, Done
	// This is a public portfolio page — show completed and in-progress work, hide backlog/planned.
	const result = await notion.dataSources.query({
		data_source_id: projectsDataSourceId,
		filter: {
			or: [
				{ property: "Status", status: { equals: "In progress" } },
				{ property: "Status", status: { equals: "Blocked" } },
				{ property: "Status", status: { equals: "Done" } },
			],
		},
		sorts: [
			{ property: "Priority", direction: "ascending" },
			{ property: "Due", direction: "ascending" },
		],
	});

	return result.results.map(mapProjectItem);
}

export async function getProjectById(id: string) {
	if (!isNotionConfigured()) {
		throw new Error("NOTION_TOKEN not configured");
	}

	if (!projectsDataSourceId) {
		throw new Error("NOTION_PROJECTS_DATA_SOURCE_ID not configured");
	}

	const result = await notion.dataSources.query({
		data_source_id: projectsDataSourceId,
		filter: {
			property: "ID",
			title: { equals: id },
		},
		page_size: 1,
	});

	const page = result.results[0];
	if (!page) return null;
	return mapProjectItem(page);
}
