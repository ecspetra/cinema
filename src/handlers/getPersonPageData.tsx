import { fetchItemData } from '@/handlers/fetchItemData'
import { URL_TO_FETCH_MOVIES_WITH_PERSONS } from '@/constants/linksToFetch'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import { UserCollections } from '@/constants/enum'
import {
	IBackdrop,
	IFetchedResult,
	IItemCard,
	IPersonInfo,
} from '../../interfaces'

export const getPersonPageData = async (
	personId: string
): Promise<{
	info: IPersonInfo
	images: IBackdrop[]
	movies: IFetchedResult<IItemCard>
}> => {
	const getPersonData = async (fetchQuery: string) => {
		try {
			const personData = await fetchItemData(
				UserCollections.person,
				personId,
				fetchQuery
			)
			return personData
		} catch (error) {
			throw error
		}
	}

	try {
		const urlToFetchMoviesWithCurrentPerson =
			URL_TO_FETCH_MOVIES_WITH_PERSONS.replace('{personId}', personId)
		const personInfo = await getPersonData('')
		const personImages = await getPersonData('/images')
		const moviesWithPerson = await getResultsByPage(
			urlToFetchMoviesWithCurrentPerson,
			1
		)

		return {
			info: personInfo,
			images: personImages.profiles,
			movies: moviesWithPerson,
		}
	} catch (error) {
		throw error
	}
}
