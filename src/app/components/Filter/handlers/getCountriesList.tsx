import {
	URL_TO_FETCH_COUNTRY_MOVIE_LIST,
	URL_TO_FETCH_COUNTRIES,
} from '@/constants/linksToFetch'
import { IItemCountry } from '../../../../../interfaces'

export const getCountriesList = async (
	type: string
): Promise<IItemCountry[]> => {
	const allCountries = await fetch(URL_TO_FETCH_COUNTRIES)
	const allCountriesResult = await allCountries.json()

	const requests = allCountriesResult.map(async (item: IItemCountry) => {
		return await fetch(
			URL_TO_FETCH_COUNTRY_MOVIE_LIST.replace('{type}', type).replace(
				'{country}',
				item.iso_3166_1.toLowerCase()
			)
		).then(response => response.json())
	})

	const responses = await Promise.all(requests)

	const countriesWhichHaveAvailableResults = allCountriesResult.filter(
		(item: IItemCountry, idx: number) => {
			return responses[idx].results.length > 0
		}
	)

	return countriesWhichHaveAvailableResults
}
