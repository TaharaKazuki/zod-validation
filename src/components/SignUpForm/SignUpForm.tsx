import { FC, forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'react-daisyui'

import { TextField } from '../TextField'
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod'

const SignUpSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: '入力がありません' })
      .email({ message: 'Emailの形式ではありません' }),
    password: z
      .string()
      .min(6, { message: '6文字以上で入力してください' })
      .max(24, { message: '24文字以下で入力してください' }),
    confirmPassword: z
      .string()
      .min(6, { message: '6文字以上で入力してください' })
      .max(24, { message: '24文字以下で入力してください' }),
  })
  .refine(
    (form) => {
      return form.confirmPassword === form.password
    },
    {
      message: 'Passwordが一致していません',
      path: ['confirmPassword'],
    }
  )

export type SignUpFormValue = z.infer<typeof SignUpSchema>

type SignUpFormProps = {
  onSubmitReady: (data: SignUpFormValue) => Promise<void>
}

export type SignUpApi = {
  setErrors: (errors: Record<string, string>) => void
}

export const SignUpForm = forwardRef<SignUpApi, SignUpFormProps>((props, ref) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValue>({ resolver: zodResolver(SignUpSchema) })

  const setErrorRef = useRef(setError)
  setErrorRef.current = setError

  useImperativeHandle(
    ref,
    () => {
      return {
        setErrors: (errors: Record<string, string>) => {
          Object.entries(errors).forEach(([key, value]) => {
            setErrorRef.current(key as 'email' | 'password' | 'confirmPassword', { message: value })
          })
        },
      }
    },
    []
  )

  return (
    <form
      style={{
        display: 'flex',
        flexFlow: 'column',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
      onSubmit={handleSubmit(props.onSubmitReady)}
    >
      <h2>Sign Up</h2>
      <TextField
        id="email"
        label="email"
        inputProps={register('email', { required: 'Emailの入力は必須です' })}
        error={errors.email?.message as string}
      />

      <TextField
        id="password"
        label="password"
        inputProps={register('password', { required: 'Passwordの入力は必須です' })}
        error={errors.password?.message as string}
        type="password"
      />

      <TextField
        id="confirm password"
        label="confirm password"
        inputProps={register('confirmPassword', { required: '確認用のpasswordの入力は必須です' })}
        error={errors.confirmPassword?.message as string}
        type="password"
      />

      <Button disabled={isSubmitting} color="primary">
        {isSubmitting ? '送信中...' : '登録'}
      </Button>
    </form>
  )
})

SignUpForm.displayName = 'SignUpForm'
