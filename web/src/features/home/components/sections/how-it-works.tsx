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
import { useTranslation } from 'react-i18next'

export function HowItWorks() {
  const { t } = useTranslation()
  const steps = [
    {
      title: 'Configure',
      description:
        'Add your API keys, set up channels and configure access permissions',
    },
    {
      title: 'Connect',
      description:
        'Connect through OpenAI, Claude, Gemini, and other compatible API routes',
    },
    {
      title: 'Monitor',
      description:
        'Track usage, costs and performance with real-time analytics',
    },
  ]
  return (
    <section className='mx-auto max-w-[1120px] border-t px-6 py-20 md:py-24'>
      <h2 className='mb-12 text-3xl font-semibold tracking-[-0.035em] md:text-5xl'>
        {t('Three steps to get started')}
      </h2>
      <ol className='grid gap-9 md:grid-cols-3 md:gap-12'>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className='bg-muted mb-5 inline-flex size-8 items-center justify-center rounded-md text-sm font-semibold tabular-nums'>
              {index + 1}
            </span>
            <h3 className='mb-2 text-xl font-semibold tracking-tight'>
              {t(step.title)}
            </h3>
            <p className='text-muted-foreground max-w-[30ch] text-sm leading-6'>
              {t(step.description)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
