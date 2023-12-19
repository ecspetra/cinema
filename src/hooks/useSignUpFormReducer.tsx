import { useReducer } from 'react'

export interface SignUpFormData {
	name: {
		value: string
		error: string
	}
	email: {
		value: string
		error: string
	}
	password: {
		value: string
		error: string
	}
	formError: {
		error: string
	}
}

interface State {
	isLoading: boolean
	isTouched: boolean
	formData: SignUpFormData
}

interface Action {
	type: string
	payload?: any
}

const initialState: State = {
	isLoading: false,
	isTouched: false,
	formData: {
		name: {
			value: '',
			error: '',
		},
		email: {
			value: '',
			error: '',
		},
		password: {
			value: '',
			error: '',
		},
		formError: {
			error: '',
		},
	},
}

const signUpFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_FORM_DATA':
			return { ...state, formData: action.payload }
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload,
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

const useSignUpFormReducer = () => {
	return useReducer(signUpFormReducer, initialState)
}

export default useSignUpFormReducer
