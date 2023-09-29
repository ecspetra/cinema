import { parse } from 'cookie'

export const setCookie = (name, value, options = {}) => {
	const { expires, path } = options
	document.cookie = `${name}=${value};${
		expires ? `expires=${expires};` : ''
	}${path ? `path=${path};` : ''}`
}

export const removeCookie = (name, options = {}) => {
	options = {
		expires: new Date(0),
		path: '/',
		...options,
	}

	document.cookie = `${name}=; expires=${options.expires.toUTCString()}; path=${
		options.path
	}`
}

export function parseCookies(req) {
	return parse(req ? req.headers.cookie || '' : document.cookie)
}
