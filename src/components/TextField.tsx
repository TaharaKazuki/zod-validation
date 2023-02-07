import React, { FC, RefCallback } from 'react'
import { Input } from 'react-daisyui'

type Props = {
  id?: string
  label: string
  error?: string
  inputProps?: {
    onChange: (ev: any) => unknown
    onBlur: (ev: any) => unknown
    ref: RefCallback<HTMLInputElement>
    name?: string
    min?: string | number
    max?: string | number
    maxLength?: number
    minLength?: number
    pattern?: string
    required?: boolean
    disabled?: boolean
  }
  type?: 'password' | 'text' | 'phone-number'
}

export const TextField: FC<Props> = ({ id, label, error, inputProps, type }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      <Input color={'ghost'} id={id} type={type ?? 'text'} {...(inputProps ?? {})} />
      {error ? <span className="label-text text-error">{error}</span> : null}
    </div>
  )
}
