import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/cn'

import { FaFacebook, FaInstagram } from 'react-icons/fa'

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
    <footer className="container-spacing !pb-4">
      <div className="container-wrapper">
        <div className="flex justify-center pb-10">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {navItems && <FooterNav navItems={navItems} />}
          {rightNavItems && (
            <FooterNav navItems={rightNavItems} className="md:col-start-5" align="right" />
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
}

const FooterNav = ({ navItems, className, align = 'left' }: FooterNavProps) => {
  return (
    <nav
      className={cn(
        'col-span-1 flex flex-col gap-4 items-center',
        className,
        align === 'right' && 'md:items-end',
        align === 'center' && 'md:items-center',
        align === 'left' && 'md:items-start',
      )}
    >
      {navItems?.map(({ link }, i) => {
        return <CMSLink className="w-fit" key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}

type ContactInfo = Footer['contactInfo']

const ContactInfo = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <div className="md:col-span-3 md:col-start-2 flex flex-col justify-center items-center gap-4 row-start-1">
      {contactInfo?.telephoneLabel && <TelephoneLabel {...contactInfo?.telephoneLabel} />}

      <a href={`mailto:${contactInfo?.email}`} className="text-lg">
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
      className="text-3xl lg:text-5xl font-bold text-jaffa-400 hover:text-jaffa-500 transition-all duration-300"
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
    <p className="text-sm text-gray-500 text-center md:text-left md:col-start-1">
      {`${copyright} © ${year}`}
    </p>
  )
}

type SocialLinksProps = {
  socialLinks: Footer['socialLinks']
}

const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
  return (
    <div className="flex gap-4 md:col-start-2 justify-center">
      {socialLinks?.facebook && (
        <Link
          href={socialLinks?.facebook}
          target="_blank"
          className="text-2xl hover:text-jaffa-500 transition-all duration-300"
        >
          <FaFacebook />
        </Link>
      )}
      {socialLinks?.instagram && (
        <Link
          href={socialLinks?.instagram}
          target="_blank"
          className="text-2xl hover:text-jaffa-500 transition-all duration-300"
        >
          <FaInstagram />
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
    <div className="flex gap-4 justify-center md:justify-end md:col-start-3">
      {legalLinks?.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </div>
  )
}
