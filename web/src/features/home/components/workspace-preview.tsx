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
  ArrowUpRight,
  BarChart3,
  FileText,
  Globe2,
  Home,
  KeyRound,
  Layers,
  PanelLeft,
  Settings,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSystemConfigStore } from '@/stores/system-config-store'

const providers = [
  { name: 'OpenAI', protocol: 'OpenAI', path: '/v1/chat/completions' },
  { name: 'Anthropic', protocol: 'Claude', path: '/v1/messages' },
  { name: 'Google', protocol: 'Gemini', path: '/v1beta/models' },
  { name: 'DeepSeek', protocol: 'OpenAI', path: '/v1/chat/completions' },
]

export function WorkspacePreview() {
  const { t } = useTranslation()
  const systemName = useSystemConfigStore((state) => state.config.systemName)

  return (
    <div className='notion-workspace' aria-label={t('Preview')}>
      <div className='notion-workspace-topbar'>
        <span className='flex items-center gap-2'>
          <PanelLeft className='size-3.5' aria-hidden='true' />
          {systemName} <span aria-hidden='true'>/</span>{' '}
          {t('Channel Management')}
        </span>
        <span>{t('Preview')}</span>
      </div>
      <div className='notion-workspace-body'>
        <aside className='notion-workspace-sidebar' aria-hidden='true'>
          <span>
            <Layers className='size-4' /> {systemName}
          </span>
          <span>
            <Home className='size-3.5' />
            {t('Overview')}
          </span>
          <span data-current>
            <Globe2 className='size-3.5' />
            {t('Channels')}
          </span>
          <span>
            <KeyRound className='size-3.5' />
            {t('API Keys')}
          </span>
          <span>
            <BarChart3 className='size-3.5' />
            {t('Usage Logs')}
          </span>
          <span>
            <Settings className='size-3.5' />
            {t('System Settings')}
          </span>
        </aside>
        <div className='notion-workspace-content'>
          <Globe2 className='size-8' strokeWidth={1.4} aria-hidden='true' />
          <h2>{t('Channel Management')}</h2>
          <Tabs defaultValue='channels'>
            <TabsList
              variant='line'
              className='mb-1 w-full justify-start border-b'
            >
              <TabsTrigger value='channels' className='flex-none px-3'>
                <Layers className='size-3.5' aria-hidden='true' />
                {t('Channels')}
              </TabsTrigger>
              <TabsTrigger value='api' className='flex-none px-3'>
                <FileText className='size-3.5' aria-hidden='true' />
                {t('API')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value='channels'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('Provider')}</TableHead>
                    <TableHead>{t('Protocol')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers.map((provider) => (
                    <TableRow key={provider.name}>
                      <TableCell className='font-medium'>
                        {provider.name}
                      </TableCell>
                      <TableCell>{provider.protocol}</TableCell>
                      <TableCell>
                        <Badge
                          variant='secondary'
                          className='bg-success/10 text-success'
                        >
                          {t('Enabled')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value='api'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('Protocol')}</TableHead>
                    <TableHead>{t('API')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers.map((provider) => (
                    <TableRow key={provider.name}>
                      <TableCell>{provider.protocol}</TableCell>
                      <TableCell>
                        <code className='text-xs'>{provider.path}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
          <p className='text-muted-foreground mt-4 flex items-center gap-1.5 text-xs'>
            <ArrowUpRight className='size-3.5' aria-hidden='true' />
            {t('Multi-protocol Compatible')}
          </p>
        </div>
      </div>
    </div>
  )
}
