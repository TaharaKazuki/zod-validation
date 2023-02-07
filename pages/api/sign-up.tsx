import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body as Record<string, string>

  console.log('POST /sign-up', req.body, { email, password })

  if (email === 'sample@sample.com') {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({
      success: false,
      errors: {
        email: 'すでに登録済みのemailです',
      },
    })
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))
  res.status(200).json({
    success: true,
  })
}
