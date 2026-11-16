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
import {
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, test } from 'vitest'

import { Button } from '@/components/ui/button'

import { DataTableView } from '../data-table-view'

const rows: { name: string; notes: string; status: string }[] = []
const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'notes', header: 'Notes' },
  { accessorKey: 'status', header: 'Status' },
]

function EmptyTable() {
  const [visibility, setVisibility] = useState<VisibilityState>({})
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility: visibility },
    onColumnVisibilityChange: setVisibility,
  })
  return (
    <>
      <Button onClick={() => table.getColumn('notes')?.toggleVisibility(false)}>
        Hide notes
      </Button>
      <DataTableView table={table} emptyTitle='No entries' />
    </>
  )
}

test('hiding a column keeps the empty state aligned with the visible table', async () => {
  render(<EmptyTable />)
  expect(screen.getByRole('cell')).toHaveAttribute('colspan', '3')

  await userEvent.click(screen.getByRole('button', { name: 'Hide notes' }))

  expect(
    screen.queryByRole('columnheader', { name: 'Notes' })
  ).not.toBeInTheDocument()
  expect(screen.getByRole('cell')).toHaveAttribute('colspan', '2')
})
