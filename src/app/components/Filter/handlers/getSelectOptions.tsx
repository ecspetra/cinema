import { FilterFormData } from '@/hooks/useFilterReducer'
import { generateYearsList } from '@/app/components/Filter/handlers/generateYearsList'
import { generateRatingList } from '@/app/components/Filter/handlers/generateRatingList'

export const getSelectOptions = (field: keyof FilterFormData) => {
	let options: string[] = []
	switch (field) {
		case 'primary_release_year':
		case 'first_air_date_year':
			options = generateYearsList(1930)
			return options
		case 'vote_average.lte':
			options = generateRatingList(10)
			return options
	}
}
