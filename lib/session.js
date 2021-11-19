import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'kvik_s',
    cookieOptions: {
      // включить эту хрень, чтобы работало безопасно на https
      secure: true,
    },
  })
}
