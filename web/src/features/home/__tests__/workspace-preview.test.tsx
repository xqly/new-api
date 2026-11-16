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
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { WorkspacePreview } from '../components/workspace-preview'

describe('homepage workspace preview', () => {
  test('switching to API shows protocol endpoints instead of channel statuses', async () => {
    const user = userEvent.setup()
    render(<WorkspacePreview />)

    expect(screen.getByText('Preview')).toBeVisible()
    expect(screen.getByRole('columnheader', { name: 'Protocol' })).toBeVisible()
    expect(screen.getAllByText('Enabled')).toHaveLength(4)
    await user.click(screen.getByRole('tab', { name: 'API' }))

    expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    const panel = screen.getByRole('tabpanel')
    expect(within(panel).getByText('/v1/messages')).toBeVisible()
    expect(within(panel).queryByText('Enabled')).not.toBeInTheDocument()
  })

  test('keyboard navigation changes the preview and preserves tab focus', async () => {
    const user = userEvent.setup()
    render(<WorkspacePreview />)
    const channels = screen.getByRole('tab', { name: 'Channels' })
    channels.focus()

    await user.keyboard('{ArrowRight}')
    const api = screen.getByRole('tab', { name: 'API' })
    expect(api).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(api).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowLeft}{Enter}')
    expect(channels).toHaveFocus()
    expect(channels).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByText('Enabled')).toHaveLength(4)
  })
})
