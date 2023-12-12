import { IFetchedResult, IItemCard, IUpcomingMovieItem } from '../../interfaces'
import { createItemCard } from '@/handlers/createItemCard'

export const getResultsByPage = async (
	link: string,
	page: number,
	signal = null
): Promise<IFetchedResult<IItemCard>> => {
	const options = signal ? { signal } : {}

	try {
		const basicResponse = await fetch(
			link.replace('{currentPage}', page.toString()),
			options
		)
		const nextResponse = await fetch(
			link.replace('{currentPage}', (page + 1).toString())
		)

		const basicResult = await basicResponse.json()
		const nextResult = await nextResponse.json()

		const resultCards = (await createItemCard(basicResult.results)) as
			| IItemCard[]
			| IUpcomingMovieItem[]

		return {
			items: resultCards,
			isMoreDataAvailable: !!nextResult.results.length,
		}
	} catch (error) {
		return {
			items: [],
			isMoreDataAvailable: false,
		}
	}
}
