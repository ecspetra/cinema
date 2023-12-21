import { FilterFormData } from '@/hooks/useFilterReducer'

export const getFilterQuery = (state: FilterFormData) => {
	let filterQueryArray: string[] = []

	for (const key in state) {
		if (state.hasOwnProperty(key)) {
			const formFieldValue = state[key]
			const formFieldIds = Array.isArray(formFieldValue)
				? formFieldValue.map(item => item?.id).join(',')
				: formFieldValue?.id
			const stringValue = Array.isArray(formFieldValue)
				? formFieldIds
				: `${formFieldValue}`

			filterQueryArray.push(`${key}=${stringValue || ''}`)
		}
	}

	return `&${filterQueryArray.join('&').replace(/\s/g, '')}`
}
