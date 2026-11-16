/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'

import { ThemeProvider } from '@/context/theme-provider'
import { useSystemConfigStore } from '@/stores/system-config-store'

import { PublicHeader } from '../components/public-header'

afterEach(() => {
  useSystemConfigStore.setState(useSystemConfigStore.getInitialState(), true)
  window.localStorage.clear()
})

test('mobile navigation exposes its links only while open and closes after selection', async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  client.setQueryData(['status'], {
    HeaderNavModules: JSON.stringify({
      home: false,
      console: false,
      docs: false,
      about: false,
      pricing: false,
      rankings: false,
    }),
  })
  client.setQueryData(['notice'], { success: true, data: '' })
  useSystemConfigStore.setState({ loading: false })
  const root = createRootRoute({
    component: () => (
      <PublicHeader
        navLinks={[{ title: 'Example', href: '/example' }]}
        showAuthButtons={false}
        showThemeSwitch={false}
        showLanguageSwitcher={false}
        showNotifications={false}
      />
    ),
  })
  const router = createRouter({
    routeTree: root.addChildren([
      createRoute({
        getParentRoute: () => root,
        path: '/example',
        component: () => null,
      }),
    ]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
  const user = userEvent.setup()
  const toggle = await screen.findByRole('button', {
    name: 'Toggle navigation menu',
  })
  const menu = document.querySelector<HTMLElement>(
    `#${toggle.getAttribute('aria-controls')}`
  )
  expect(menu).not.toBeNull()
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(menu).toHaveAttribute('inert')
  expect(menu).toHaveAttribute('aria-hidden', 'true')

  await user.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  expect(menu).not.toHaveAttribute('inert')
  expect(menu).toHaveAttribute('aria-hidden', 'false')
  await user.click(
    within(menu as HTMLElement).getByRole('link', { name: 'Example' })
  )
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(menu).toHaveAttribute('inert')
  client.clear()
})
