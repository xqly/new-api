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
  Code2,
  Gauge,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()
  const features = [
    {
      icon: Gauge,
      title: 'High Performance',
      description: 'Support for high concurrency with automatic load balancing',
    },
    {
      icon: Wallet,
      title: 'Transparent Billing',
      description: 'Pay-as-you-go with real-time usage monitoring',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multi-user management with flexible permission allocation',
    },
    {
      icon: HeartHandshake,
      title: 'Open Source',
      description: 'Community driven, self-hosted, and extensible',
    },
  ]

  return (
    <section className='mx-auto max-w-[1120px] px-6 py-20 md:py-28'>
      <h2 className='mb-10 max-w-3xl text-4xl leading-[1.12] font-semibold tracking-[-0.035em] text-balance md:text-5xl'>
        {t('Built for developers,')}
        <br />
        {t('designed for scale')}
      </h2>
      <div className='grid gap-5 md:grid-cols-5'>
        <div className='notion-feature-panel bg-[var(--notion-blue)] md:col-span-3'>
          <Code2 className='size-8' strokeWidth={1.5} aria-hidden='true' />
          <h3>{t('Developer Friendly')}</h3>
          <p className='max-w-md text-sm leading-6'>
            {t('Compatible API routes for common AI application workflows')}
          </p>
          <div className='border-foreground/10 bg-background/70 mt-9 space-y-0 overflow-hidden rounded-md border font-mono text-xs'>
            {[
              '/v1/chat/completions',
              '/v1/responses',
              '/v1/messages',
              '/v1beta/models',
            ].map((path) => (
              <div
                key={path}
                className='border-foreground/10 flex items-center gap-3 border-b px-4 py-3.5 last:border-0'
              >
                <span className='text-primary text-[10px] font-semibold'>
                  API
                </span>
                <code className='min-w-0 break-all'>{path}</code>
              </div>
            ))}
          </div>
        </div>
        <div className='notion-feature-panel bg-[var(--notion-sand)] md:col-span-2'>
          <ShieldCheck
            className='size-8'
            strokeWidth={1.5}
            aria-hidden='true'
          />
          <h3>{t('Secure & Reliable')}</h3>
          <p className='text-sm leading-6'>
            {t(
              'Enterprise-grade security with comprehensive permission management'
            )}
          </p>
          <div className='mt-9 space-y-5'>
            {[
              { icon: Globe2, label: 'Load Balancing' },
              { icon: ShieldCheck, label: 'Rate Limiting' },
              { icon: Zap, label: 'Cost Tracking' },
            ].map((item) => (
              <div className='flex items-center gap-3 text-sm' key={item.label}>
                <item.icon
                  className='size-4'
                  strokeWidth={1.5}
                  aria-hidden='true'
                />
                {t(item.label)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map((feature) => (
          <div key={feature.title}>
            <feature.icon
              className='mb-3 size-6'
              strokeWidth={1.5}
              aria-hidden='true'
            />
            <h3 className='mb-2 text-base font-semibold'>{t(feature.title)}</h3>
            <p className='text-muted-foreground text-sm leading-6'>
              {t(feature.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
