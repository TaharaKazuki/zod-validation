import { useState, useRef } from 'react'
import { SignUpForm, SignUpFormValue, SignUpApi } from '../src/components/SignUpForm/SignUpForm'

export default function SignUpPage() {
  const signupFormRef = useRef<SignUpApi>(null)

  const handleSubmit = async (data: SignUpFormValue) => {
    const httpResponse = await fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    const jsonResponse = await httpResponse.json()
    console.info(jsonResponse)
    if (!jsonResponse.success) {
      signupFormRef.current?.setErrors(jsonResponse.errors)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return <SignUpForm onSubmitReady={handleSubmit} ref={signupFormRef} />
}
