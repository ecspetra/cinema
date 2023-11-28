import {
	URL_TO_FETCH_COUNTRIES,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'

export const getCountriesList = async type => {
	const response = await fetch(URL_TO_FETCH_COUNTRIES)
	const result = await response.json()

	const countryList = await Promise.all(
		result.map(async item => {
			const response = await fetch(
				URL_TO_SEARCH_LIST_ITEMS.replace('{type}', type).replace(
					'{searchQuery}',
					`with_original_language=${item.iso_3166_1.toLowerCase()}`
				)
			)
			const result = await response.json()

			if (result.results.length) {
				return item
			}
		})
	)

	return countryList.filter(Boolean)
}
