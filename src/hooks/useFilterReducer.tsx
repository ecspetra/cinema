import { Dispatch, useReducer } from 'react'
import { ITag } from '../../interfaces'

type Action =
	| { type: 'RESET' }
	| { type: 'SELECT_FIELD_CHANGE'; field: keyof FilterFormData; value: any }
	| {
			type: 'ARRAY_FIELD_CHANGE'
			field: keyof FilterFormData
			value: object
	  }
	| { type: 'REMOVE_TAG'; tag: ITag }
	| {
			type: 'TOGGLE_TAG'
			field: keyof FilterFormData
			tag: ITag
			isChecked: boolean
	  }

export interface FilterFormData {
	primary_release_year?: string
	first_air_date_year?: string
	'vote_average.lte'?: string
	with_people?: ITag[]
	with_companies?: ITag[]
	with_genres?: ITag[]
	with_original_language?: string
	with_keywords?: ITag[]
	[key: string]: any
}

const isGroupedField: Record<keyof FilterFormData, boolean> = {
	primary_release_year: true,
	first_air_date_year: true,
	'vote_average.lte': true,
	with_people: true,
	with_companies: true,
	with_genres: false,
	with_original_language: true,
	with_keywords: true,
}

export const groupedFilterFields: (keyof FilterFormData)[] = Object.keys(
	isGroupedField
)
	.filter(key => isGroupedField[key])
	.map(key => key as keyof FilterFormData)

export const ungroupedFilterFields: (keyof FilterFormData)[] = Object.keys(
	isGroupedField
)
	.filter(key => !isGroupedField[key])
	.map(key => key as keyof FilterFormData)

const initialState: FilterFormData = {}

const useFilterReducer = (): [FilterFormData, Dispatch<Action>] => {
	const reducer = (state: FilterFormData, action: Action): FilterFormData => {
		switch (action.type) {
			case 'RESET':
				return initialState
			case 'SELECT_FIELD_CHANGE':
				return { ...state, [action.field]: action.value }
			case 'ARRAY_FIELD_CHANGE':
				return {
					...state,
					[action.field]: Array.isArray(state[action.field])
						? [...state[action.field], action.value]
						: [action.value],
				}
			case 'REMOVE_TAG':
				const updatedArray = Array.isArray(
					state[action.tag.field as string]
				)
					? state[action.tag.field as string].filter(
							(item: ITag) => item.name !== action.tag.name
					  )
					: []

				const updatedState = {
					...state,
					[action.tag.field as string]: updatedArray,
				}

				if (updatedArray.length === 0) {
					const {
						[action.tag.field as string]: removedField,
						...restState
					} = updatedState
					return restState
				}

				return updatedState
			case 'TOGGLE_TAG':
				const currentArrayToggle = Array.isArray(state[action.field])
					? state[action.field]
					: []

				const updatedArrayToggle = action.isChecked
					? currentArrayToggle.filter(
							(item: ITag) => item.name !== action.tag.name
					  )
					: [...currentArrayToggle, action.tag]

				const updatedStateToggle = {
					...state,
					[action.field]: updatedArrayToggle,
				}

				if (updatedArrayToggle.length === 0) {
					const { [action.field]: removedField, ...restStateToggle } =
						updatedStateToggle
					return restStateToggle
				}

				return updatedStateToggle
			default:
				return state
		}
	}

	return useReducer(reducer, initialState)
}

export default useFilterReducer
