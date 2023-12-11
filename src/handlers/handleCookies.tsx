import { parse } from 'cookie'

interface CookieOptions {
	expires?: Date
	path?: string
}

export const setCookie = (
	name: string,
	value: string,
	options: CookieOptions = {}
) => {
	const { expires, path } = options
	document.cookie = `${name}=${value};${
		expires ? `expires=${expires};` : ''
	}${path ? `path=${path};` : ''}`
}

export const removeCookie = (name: string, options: CookieOptions = {}) => {
	options = {
		expires: new Date(0),
		path: '/',
		...options,
	}

	document.cookie = `${name}=; expires=${options.expires?.toUTCString()}; path=${
		options.path
	}`
}

export function parseCookies(req: { headers: { cookie?: string } }) {
	return parse(req ? req.headers.cookie || '' : document.cookie)
}
