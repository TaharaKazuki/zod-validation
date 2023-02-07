import { useCallback } from 'react'
import { Input } from 'react-daisyui'
import { useForm } from 'react-hook-form'

import { TextField } from '../src/components/TextField'

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onValid = useCallback((data: unknown) => {
    console.info('onValid', data)
  }, [])

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
      onSubmit={handleSubmit(onValid)}
    >
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

      <button>Submit</button>
    </form>
  )
}
