import { IFetchedResult, IItemCard, IUpcomingMovieItem } from '../../interfaces'
import { createItemCard } from '@/handlers/createItemCard'

export const getResultsByPage = async (
	url: string,
	page: number,
	signal = null
): Promise<IFetchedResult<IItemCard>> => {
	const options = signal ? { signal } : {}

	try {
		const basicResponse = await fetch(
			url.replace('{currentPage}', page.toString()),
			options
		)
		const nextResponse = await fetch(
			url.replace('{currentPage}', (page + 1).toString())
		)

		if (!basicResponse.ok) {
			throw `Failed to fetch: ${basicResponse.statusText}`
		}

		const basicResult = await basicResponse.json()
		const nextResult = await nextResponse.json()

		try {
			const resultCards = (await createItemCard(
				basicResult.results
			)) as IItemCard[]

			return {
				items: resultCards,
				isMoreDataAvailable: !!nextResult.results.length,
			}
		} catch (error) {
			throw error
		}
	} catch (error) {
		throw error
	}
}
