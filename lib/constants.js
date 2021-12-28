export const NODE_ENV = process.env.NODE_ENV;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
export const STATIC_URL = process.env.NEXT_PUBLIC_STATIC_SERVER;
export const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_SERVER;
export const CHAT_URL_API = process.env.NEXT_PUBLIC_CHAT_SERVER_API;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET;
export const PUBLIC_SEARCH = process.env.NEXT_PUBLIC_SEARCH;
export const MY_SECRET = process.env.NEXT_PUBLIC_MY_SECRET;

// https://stackoverflow.com/questions/64792787/easiest-way-to-detect-production-or-dev-environment-in-nextjs#comment124341949_64802783
export const IS_DEVELOPMENT = NODE_ENV === "development";
