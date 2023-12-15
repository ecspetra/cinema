import { URL_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import { getReviewListFromStorage } from '@/firebase/config'
import { fetchItemData } from '@/handlers/fetchItemData'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import { UserCollections } from '@/constants/enum'
import { IMovieOrTVShowData, IItemCard } from '../../interfaces'
import { createItemCard } from '@/handlers/createItemCard'

export const getMovieOrTvShowData = async (
	itemId: string,
	collectionType: UserCollections
): Promise<IMovieOrTVShowData> => {
	try {
		const collectionTypeToFetch = collectionType
		const urlToFetchSimilarMovies = URL_TO_FETCH_SIMILAR_LIST.replace(
			'{itemId}',
			itemId
		).replace('{collectionType}', collectionType)

		const fetchReviewListFromStorage = async () => {
			const reviewListFromStorage = await getReviewListFromStorage(
				itemId,
				UserCollections.reviews
			)
			return reviewListFromStorage
		}

		const [
			basicInfo,
			credits,
			images,
			reviews,
			video,
			reviewListFromStorage,
			similarItemsList,
		] = await Promise.all([
			fetchItemData(collectionTypeToFetch, itemId, ''),
			fetchItemData(collectionTypeToFetch, itemId, '/credits'),
			fetchItemData(collectionTypeToFetch, itemId, '/images'),
			fetchItemData(collectionTypeToFetch, itemId, '/reviews'),
			fetchItemData(collectionTypeToFetch, itemId, '/videos'),
			fetchReviewListFromStorage(),
			getResultsByPage(urlToFetchSimilarMovies, 1),
		])

		const reviewsFromAPIAndStorage = [
			...reviews.results,
			...reviewListFromStorage,
		]

		const getCreditsItems = async (items: any[]) => {
			if (items.length > 0) {
				const itemCards = await createItemCard(items)
				return itemCards as IItemCard[]
			} else return []
		}

		const cast = await getCreditsItems(credits.cast)
		const crew = await getCreditsItems(credits.crew)

		return {
			basicInfo,
			credits: { cast: cast, crew: crew },
			images: images.backdrops,
			video: video.results,
			reviewsFromAPIAndStorage,
			similarItemsList,
		}
	} catch (error) {
		throw error
	}
}
