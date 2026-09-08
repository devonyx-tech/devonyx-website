import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;

export function isNotionConfigured() {
  const token = process.env.NOTION_TOKEN;
  return !!token && !/PLEASE_PASTE|xxxx+/.test(token);
}

export function plainText(arr = []) {
  return arr.map((t) => t.plain_text).join("");
}

interface CoverProp {
  files?: Array<{ type: string; external?: { url: string }; file?: { url: string } }>;
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
    filter: filterConditions.length > 1 ? { and: filterConditions } : filterConditions[0],
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