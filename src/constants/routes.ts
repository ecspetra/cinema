import {
	COLLECTION_PAGE,
	CURRENT_USER_COLLECTION_PAGE,
} from '@/constants/paths'

export const getCollectionLink = (userId: string | undefined) => {
	return userId === undefined
		? COLLECTION_PAGE
		: CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId)
}

export const createRoutes = (userId: string | undefined) => [
	{
		name: 'Library',
		href: getCollectionLink(userId),
	},
	{
		name: 'Persons',
		href: '/person',
	},
	{
		name: 'Movies',
		href: '/movie',
	},
	{
		name: 'TV shows',
		href: '/tv',
	},
]
