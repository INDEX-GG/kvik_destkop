import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  let secure
  secure = process.env.SESSION_COOKIE_OPTION_SECURE === '1';
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'kvik_s',
    cookieOptions: {
      secure: secure,
    },
  })
}
