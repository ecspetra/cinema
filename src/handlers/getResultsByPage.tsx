export const getResultsByPage = async (link, page, signal = null) => {
	const options = signal ? { signal } : {}

	try {
		const defaultResponse = await fetch(
			link.replace('{currentPage}', page),
			options
		)
		const nextResponse = await fetch(
			link.replace('{currentPage}', page + 1)
		)

		const result = await defaultResponse.json()
		const nextResult = await nextResponse.json()

		return {
			items: result.results,
			isMoreDataAvailable: !!nextResult.results.length,
		}
	} catch (error) {
		return {
			items: [],
			isMoreDataAvailable: false,
		}
	}
}
