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
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'
import { cn } from '@/lib/utils'

import { WorkspacePreview } from '../workspace-preview'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  return (
    <section className={cn('notion-hero', props.className)}>
      <h1>
        {t('Unified API Gateway for')}
        <br />
        <mark>{t('Vast Range of AI Models')}</mark>
      </h1>
      <p className='notion-hero-description'>
        {t(
          'Access a vast selection of models via a standard, unified API protocol. Power AI applications, manage digital assets, and connect the Future.'
        )}
      </p>
      <div className='notion-hero-actions'>
        <Button
          className='h-10 gap-2 px-5 text-base'
          render={
            <Link to={props.isAuthenticated ? '/dashboard' : '/sign-up'} />
          }
        >
          {props.isAuthenticated ? t('Go to Dashboard') : t('Get Started')}
          <ArrowRight className='size-4' aria-hidden='true' />
        </Button>
        <Button
          variant='secondary'
          className='h-10 px-5 text-base'
          render={<Link to='/pricing' />}
        >
          {t('View Pricing')}
        </Button>
        <Button
          variant='ghost'
          className='h-10 px-3'
          render={
            docsUrl.startsWith('http') ? (
              <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
            ) : (
              <Link to={docsUrl} />
            )
          }
        >
          {t('Docs')} <ArrowRight className='size-3.5' aria-hidden='true' />
        </Button>
      </div>
      <WorkspacePreview />
      <div className='text-muted-foreground border-border mx-auto flex max-w-[1040px] flex-wrap items-center justify-center gap-x-5 gap-y-2 border-x border-b px-5 py-4 text-xs'>
        <span>{t('Supported Applications')}</span>
        <a
          href='https://cherry-ai.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground font-medium hover:underline'
        >
          Cherry Studio
        </a>
        <a
          href='https://ccswitch.io'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground font-medium hover:underline'
        >
          CC Switch
        </a>
        <span>{t('More Apps')}</span>
      </div>
    </section>
  )
}
