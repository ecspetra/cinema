import { useReducer, Dispatch } from 'react'
import { IUser } from '../../../../interfaces'

export interface IProfileEditFormData {
	name: {
		value: string
		error: string
	}
	country: {
		value: string
		error: string
	}
	dateOfBirth: {
		value: string
		error: string
	}
	about: {
		value: string
		error: string
	}
	formError: {
		error: string
	}
}

export interface State {
	isLoading: boolean
	isTouched: boolean
	formData: IProfileEditFormData
}

interface Action {
	type: string
	payload?: IProfileEditFormData | boolean
}

const initialState = (profileInfo: IUser): State => {
	return {
		isLoading: false,
		isTouched: false,
		formData: {
			name: {
				value: profileInfo.displayName,
				error: '',
			},
			country: {
				value: profileInfo.country || '',
				error: '',
			},
			dateOfBirth: {
				value: profileInfo.dateOfBirth || '',
				error: '',
			},
			about: {
				value: profileInfo.about || '',
				error: '',
			},
			formError: {
				error: '',
			},
		},
	}
}

const reducer = (state: State, action: Action, profileInfo: IUser): State => {
	switch (action.type) {
		case 'SET_FORM_DATA':
			return {
				...state,
				formData: action.payload as IProfileEditFormData,
			}
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload as boolean,
			}
		case 'SET_TOUCHED':
			return {
				...state,
				isTouched: true,
			}
		case 'CLEAR_FORM':
			return initialState(profileInfo)
		default:
			return state
	}
}

const useProfileEditCredentialFormReducer = (
	profileInfo: IUser
): [State, Dispatch<Action>] => {
	return useReducer(
		(state: State, action: Action) => reducer(state, action, profileInfo),
		initialState(profileInfo)
	)
}

export default useProfileEditCredentialFormReducer
