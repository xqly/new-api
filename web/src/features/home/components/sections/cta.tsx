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

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()
  if (props.isAuthenticated) return null
  return (
    <section className='bg-muted px-6 py-20 text-center md:py-28'>
      <h2 className='mx-auto max-w-3xl text-4xl leading-[1.12] font-semibold tracking-[-0.035em] md:text-5xl'>
        {t('Ready to simplify')}
        <br />
        {t('your AI integration?')}
      </h2>
      <p className='text-muted-foreground mx-auto mt-5 max-w-xl text-base leading-7'>
        {t(
          'Deploy your own gateway and start routing requests through your configured upstream services.'
        )}
      </p>
      <div className='mt-7 flex flex-wrap items-center justify-center gap-3'>
        <Button className='h-10 px-5 text-base' render={<Link to='/sign-up' />}>
          {t('Get Started')}
          <ArrowRight className='size-4' aria-hidden='true' />
        </Button>
        <Button
          variant='outline'
          className='h-10 px-5 text-base'
          render={<Link to='/pricing' />}
        >
          {t('View Pricing')}
        </Button>
      </div>
    </section>
  )
}
