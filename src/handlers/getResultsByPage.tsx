export const getResultsByPage = async (link, page) => {
	try {
		const defaultResponse = await fetch(link.replace('{currentPage}', page))
		const nextResponse = await fetch(
			link.replace('{currentPage}', page + 1)
		)
		const result = await defaultResponse.json()
		const nextResult = await nextResponse.json()

		return {
			results: result.results,
			isMoreDataAvailable: !!nextResult.results.length,
		}
	} catch (error) {
		return {
			moviesFromProps: [],
			isMoreDataAvailable: false,
		}
	}
}
