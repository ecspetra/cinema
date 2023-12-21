import {
	URL_TO_FETCH_COUNTRY_MOVIE_LIST,
	URL_TO_FETCH_COUNTRIES,
} from '@/constants/linksToFetch'
import { ICountry, IItemCountry } from '../../../../../interfaces'

export const getCountriesList = async (
	type: string
): Promise<IItemCountry[]> => {
	const allCountries = await fetch(URL_TO_FETCH_COUNTRIES)
	const allCountriesResult = await allCountries.json()

	const countriesWhichHaveAvailableResults = await Promise.all(
		allCountriesResult.map(async (item: ICountry) => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			const responseForCountry = await fetch(
				URL_TO_FETCH_COUNTRY_MOVIE_LIST.replace('{type}', type).replace(
					'{country}',
					item.iso_3166_1.toLowerCase()
				)
			)
			const resultForCountry = await responseForCountry.json()

			if (resultForCountry.results.length > 0) {
				return item
			}
		})
	)

	return countriesWhichHaveAvailableResults.filter(Boolean)
}
