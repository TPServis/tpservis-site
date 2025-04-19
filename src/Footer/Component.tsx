import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/cn'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import { Facebook, Instagram } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const rightNavItems = footer?.rightNavItems || []
  const contactInfo = footer?.contactInfo || {}
  const socialLinks = footer?.socialLinks || {}
  const copyright = footer?.copyright || ''
  const legalLinks = footer?.legalLinks || []

  return (
    <footer className="container-spacing !pb-4" role="contentinfo" aria-label="Site footer">
      <div className="container-wrapper">
        <div className="flex justify-center pb-10">
          <Link href="/" aria-label="Return to homepage">
            <Logo />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {navItems && <FooterNav navItems={navItems} ariaLabel="Footer primary navigation" />}
          {rightNavItems && (
            <FooterNav
              navItems={rightNavItems}
              className="md:col-start-5"
              align="right"
              ariaLabel="Footer secondary navigation"
            />
          )}

          {contactInfo && <ContactInfo contactInfo={contactInfo} />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-24">
          {copyright && <Copyright copyright={copyright} />}
          {socialLinks && <SocialLinks socialLinks={socialLinks} />}
          {legalLinks && <LegalLinks legalLinks={legalLinks} />}
        </div>
      </div>
    </footer>
  )
}

type FooterNavProps = {
  navItems: Footer['navItems']
  className?: string
  align?: 'right' | 'center' | 'left'
  ariaLabel: string
}

const FooterNav = ({ navItems, className, align = 'left', ariaLabel }: FooterNavProps) => {
  return (
    <nav
      className={cn(
        'col-span-1 flex flex-col gap-4 items-center',
        className,
        align === 'right' && 'md:items-end',
        align === 'center' && 'md:items-center',
        align === 'left' && 'md:items-start',
      )}
      aria-label={ariaLabel}
    >
      {navItems?.map(({ link }, i) => {
        return (
          <CMSLink
            className="w-fit hover:underline focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded"
            key={i}
            {...link}
            appearance="link"
          />
        )
      })}
    </nav>
  )
}

type ContactInfo = Footer['contactInfo']

const ContactInfo = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <div
      className="md:col-span-3 md:col-start-2 flex flex-col justify-center items-center gap-4 row-start-1"
      role="complementary"
      aria-label="Contact information"
    >
      {contactInfo?.telephoneLabel && <TelephoneLabel {...contactInfo?.telephoneLabel} />}

      <a
        href={`mailto:${contactInfo?.email}`}
        className="text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded px-1"
        aria-label={`Send email to ${contactInfo?.email}`}
      >
        {contactInfo?.email}
      </a>
    </div>
  )
}

type TelephoneLabelProps = {
  telephone?: string | null
  label?: string | null
}

const TelephoneLabel = ({ telephone, label }: TelephoneLabelProps) => {
  if (!telephone) return null

  return (
    <a
      href={`tel:${telephone}`}
      className="text-3xl lg:text-5xl font-bold text-jaffa-400 hover:text-jaffa-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded px-1"
      aria-label={`Call us at ${label || telephone}`}
    >
      {label ?? telephone}
    </a>
  )
}

type CopyrightProps = {
  copyright: string
}

const Copyright = ({ copyright }: CopyrightProps) => {
  if (!copyright) return null

  const year = new Date().getFullYear()

  return (
    <p
      className="text-sm text-gray-500 text-center md:text-left md:col-start-1"
      role="contentinfo"
      aria-label="Copyright information"
    >
      {`${copyright} © ${year}`}
    </p>
  )
}

type SocialLinksProps = {
  socialLinks: Footer['socialLinks']
}

const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
  return (
    <div
      className="flex gap-4 md:col-start-2 justify-center"
      role="navigation"
      aria-label="Social media links"
    >
      {socialLinks?.facebook && (
        <Link
          href={socialLinks?.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-jaffa-500 transition-all duration-300 p-1 focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded"
          aria-label="Visit our Facebook page (opens in new tab)"
        >
          <Facebook aria-hidden="true" />
        </Link>
      )}
      {socialLinks?.instagram && (
        <Link
          href={socialLinks?.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-jaffa-500 transition-all duration-300 p-1 focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded"
          aria-label="Visit our Instagram page (opens in new tab)"
        >
          <Instagram aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

type LegalLinksProps = {
  legalLinks: Footer['legalLinks']
}

const LegalLinks = ({ legalLinks }: LegalLinksProps) => {
  return (
    <nav
      className="flex gap-4 justify-center md:justify-end md:col-start-3"
      aria-label="Legal links"
    >
      {legalLinks?.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded px-1"
          />
        )
      })}
    </nav>
  )
}
