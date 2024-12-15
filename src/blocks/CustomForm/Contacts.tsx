import React from 'react'
import { cn } from '@/utilities/cn'

import { Facebook, Instagram } from 'lucide-react'

import { Contact } from '@/payload-types'
import { P } from 'pino'

interface ContactsProps extends Contact {}

export const Contacts: React.FC<ContactsProps> = (props) => {
  const { email, phone, address, social } = props

  return (
    <div className="flex flex-col gap-10">
      {email && (
        <div className=" space-x-3">
          <p className="text-sm text-text-secondary">Електронна адреса</p>
          <a
            href={`mailto:${email}`}
            className="text-lg text-text-primary hover:text-jaffa-400 transition-colors font-semibold"
          >
            {email}
          </a>
        </div>
      )}

      {phone && (
        <div className=" space-x-3">
          <p className="text-sm text-text-secondary">Телефон</p>
          <a
            href={`tel:${phone}`}
            className="text-lg hover:text-jaffa-400 transition-colors font-semibold"
          >
            {phone}
          </a>
        </div>
      )}

      {address && (
        <div className=" space-x-3">
          <p className="text-sm text-text-secondary">Адреса</p>
          <a
            href={address.maps || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-text-primary hover:text-jaffa-400 transition-colors font-semibold"
          >
            <span className="text-lg">{address.label}</span>
          </a>
        </div>
      )}

      {social && social.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-secondary">Соцмережі</p>

          <div className="flex items-center justify-start space-x-6">
            {social[0].facebook && (
              <a
                href={social[0].facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-jaffa-400 transition-colors"
              >
                <Facebook className="h-6 w-6 text-jaffa-400" />
                <span className="sr-only">Facebook</span>
              </a>
            )}
            {social[0].instagram && (
              <a
                href={social[0].instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-jaffa-400 transition-colors"
              >
                <Instagram className="h-6 w-6 text-jaffa-400" />
                <span className="sr-only">Instagram</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
