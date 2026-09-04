import { ArrowLeft, CalendarDays, FileText } from 'lucide-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '../../hooks'
import { getPostFn } from '../../lib/server-functions'

function formatDate(d: string | undefined) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ---- Render rich text (bold / italic / code / links / etc.) ----
function RichText({ value }: { value: Array<{ plain_text: string; annotations?: Record<string, unknown>; href?: string }> }) {
  return (
    <>
      {(value || []).map((t, i) => {
        const { annotations = {}, href } = t
        let node: React.ReactNode = <>{t.plain_text}</>
        if (href) {
          node = (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {t.plain_text}
            </a>
          )
        }
        if (annotations.bold) node = <strong>{node}</strong>
        if (annotations.italic) node = <em>{node}</em>
        if (annotations.underline) node = <u>{node}</u>
        if (annotations.strikethrough) node = <del>{node}</del>
        if (annotations.code) node = <code>{node}</code>
        return <span key={i}>{node}</span>
      })}
    </>
  )
}

// ---- Convert Notion blocks + children into React elements ----
function Blocks({ blocks, depth = 0 }: { blocks: Array<Record<string, unknown>>; depth?: number }) {
  if (!blocks || blocks.length === 0 || depth > 4) return null

  return (
    <div className={depth === 0 ? 'mt-2' : ''}>
      {blocks.map((block) => {
        const children = block.has_children ? <Blocks blocks={(block.children || []) as Array<Record<string, unknown>>} depth={depth + 1} /> : null
        const rt = (b: Record<string, unknown>) => (b?.rich_text as Array<{ plain_text: string; annotations?: Record<string, unknown>; href?: string }>) || []
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id}>{rt(block.paragraph as Record<string, unknown>) ? <RichText value={rt(block.paragraph as Record<string, unknown>)} /> : '\u00A0'}</p>
            )
          case 'heading_1':
            return <h2 key={block.id} className="font-display text-2xl font-medium mt-6 mb-2 text-ink"><RichText value={rt(block.heading_1 as Record<string, unknown>)} /></h2>
          case 'heading_2':
            return <h3 key={block.id} className="font-display text-xl font-medium mt-5 mb-2 text-ink"><RichText value={rt(block.heading_2 as Record<string, unknown>)} /></h3>
          case 'heading_3':
            return <h4 key={block.id} className="font-display text-lg font-medium mt-4 mb-2 text-ink"><RichText value={rt(block.heading_3 as Record<string, unknown>)} /></h4>
          case 'bulleted_list_item':
            return (
              <li key={block.id} className="notion-list-item">
                <RichText value={rt(block.bulleted_list_item as Record<string, unknown>)} />
                {children}
              </li>
            )
          case 'numbered_list_item':
            return (
              <li key={block.id} className="notion-list-item">
                <RichText value={rt(block.numbered_list_item as Record<string, unknown>)} />
                {children}
              </li>
            )
          case 'to_do':
            return (
              <p key={block.id} className="notion-todo flex items-center gap-2">
                {block.to_do?.checked ? '☑' : '☐'}&nbsp;<RichText value={rt(block.to_do as Record<string, unknown>)} />
              </p>
            )
          case 'toggle':
            return (
              <details key={block.id} className="notion-toggle">
                <summary className="cursor-pointer"><RichText value={rt(block.toggle as Record<string, unknown>)} /></summary>
                <div className="ml-6 mt-2">{children}</div>
              </details>
            )
          case 'quote':
            return <blockquote key={block.id} className="border-l-3 border-brand pl-4 italic my-4 text-ink"><RichText value={rt(block.quote as Record<string, unknown>)} /></blockquote>
          case 'code':
            return (
              <pre key={block.id} className="bg-ink-gradient rounded-xl p-4 overflow-x-auto my-4">
                <code className="text-white font-mono text-sm">{rt(block.code as Record<string, unknown>).map((t) => t.plain_text).join('')}</code>
              </pre>
            )
          case 'divider':
            return <hr key={block.id} className="border-hairline my-8" />
          case 'callout':
            return (
              <div key={block.id} className="notion-callout bg-brand/10 border border-brand/20 rounded-xl p-4 my-4">
                <RichText value={rt(block.callout as Record<string, unknown>)} />
              </div>
            )
          case 'image': {
            const img = block.image as Record<string, unknown> | undefined
            const src = img?.type === 'external' ? (img.external as Record<string, unknown>)?.url : (img?.file as Record<string, unknown>)?.url
            if (!src) return null
            return (
              <figure key={block.id} className="my-6">
                <img src={src as string} alt={(img?.caption as Array<{ plain_text: string }>)?.map((c) => c.plain_text).join('') || ''} loading="lazy" className="rounded-xl border border-hairline w-full" />
                {img?.caption?.length > 0 && <figcaption className="text-center text-sm text-ink-muted mt-2">{(img.caption as Array<{ plain_text: string }>).map((c) => c.plain_text).join('')}</figcaption>}
              </figure>
            )
          }
          case 'child_page':
            return null
          default:
            return null
        }
      })}
    </div>
  )
}

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPostFn({ data: { slug: params.slug } })
    if (!post) {
      throw new Error("Not found")
    }
    return { post }
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()

  return (
    <article className="mx-auto mt-24 mb-12 max-w-3xl">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-brand mb-6 block w-fit"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>
      <h3 className="mt-6 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
        {post.title}
      </h3>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
        {post.date && (
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> {formatDate(post.date)}
          </span>
        )}
        {post.tags.length > 0 && (
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" /> {post.tags.join(', ')}
          </span>
        )}
      </p>
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          className="mt-8 h-64 w-full rounded-2xl border border-hairline object-cover"
        />
      )}
      {post.description && (
        <p className="mt-6 font-display text-xl italic text-ink-soft">{post.description}</p>
      )}
      <div className="notion-body mt-8">
        {post.blocks?.length ? (
          <Blocks blocks={post.blocks} />
        ) : (
          <p className="text-ink-muted">This post has no content yet.</p>
        )}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-hairline pt-6">
        <Link
          to="/blog"
          className="text-sm font-medium text-ink-muted transition-colors hover:text-brand"
        >
          Back to all posts
        </Link>
      </div>
    </article>
  )
}