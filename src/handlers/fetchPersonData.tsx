import { LINK_TO_FETCH_PERSON } from '@/constants/linksToFetch'

export const fetchPersonData = async (personId: number, queryParam: string) => {
	const linkToFetch = LINK_TO_FETCH_PERSON.replace(
		'{personId}',
		personId
	).replace('{queryParam}', queryParam)

	const response = await fetch(linkToFetch)
	return await response.json()
}
