import { useReducer } from 'react'

export interface IProfileEditCredentialFormData {
	email: {
		value: string
		error: string
	}
	oldPassword: {
		value: string
		error: string
	}
	newPassword: {
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
	formData: IProfileEditCredentialFormData
}

interface Action {
	type: string
	payload?: IProfileEditCredentialFormData | boolean
}

const initialState: State = {
	isLoading: false,
	isTouched: false,
	formData: {
		email: {
			value: '',
			error: '',
		},
		oldPassword: {
			value: '',
			error: '',
		},
		newPassword: {
			value: '',
			error: '',
		},
		formError: {
			error: '',
		},
	},
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_FORM_DATA':
			return {
				...state,
				formData: action.payload as IProfileEditCredentialFormData,
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
			return initialState
		default:
			return state
	}
}

const useProfileEditCredentialFormReducer = () => {
	return useReducer(reducer, initialState)
}

export default useProfileEditCredentialFormReducer
