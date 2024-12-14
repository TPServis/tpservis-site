import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { cn } from '@/utilities/cn'
import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="text-shark-500 font-medium text-base">
        {label}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        className={cn(
          'bg-astral-50 border-astral-50 hover:bg-astral-100 focus:bg-astral-100 focus:ring-astral-400 transition-all duration-300 cursor-text invalid:ring-orange-500 caret-astral-500 placeholder:text-astral-500 text-astral-800 font-medium text-lg',
          {
            'bg-astral-50': !errors[name],
            'ring-orange-500 ring-2 ring-offset-2 bg-orange-50 hover:bg-orange-100 focus:bg-orange-100 focus:ring-orange-400':
              errors[name],
          },
        )}
        {...register(name, { required: requiredFromProps })}
      />

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
