import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import PostHogProvider from '@/integrations/posthog/provider'

import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'

import { getLocale } from '#/paraglide/runtime'

import appCss from '@/styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Booker from '#/components/Book'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Devonyx — Build, Brand & Grow',
      },
      {
        name: 'description',
        content: 'A digital agency helping founders build, brand, and grow — trusted across the USA, UAE, Netherlands, New Zealand & India.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <PostHogProvider>
          <Header />
          <main>{children}</main>
          <Booker />
          <Footer />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  )
}