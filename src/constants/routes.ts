export const getCollectionLink = userId => {
	return userId ? `/collection?uid=${userId}` : `/collection`
}

export const createRoutes = userId => [
	{
		name: 'Favorite',
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
		name: 'TV',
		href: '/tv',
	},
]
