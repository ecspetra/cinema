import { useReducer } from 'react'

export interface ISignUpFormData {
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
	formData: ISignUpFormData
}

interface Action {
	type: string
	payload?: ISignUpFormData | boolean
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

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_FORM_DATA':
			return { ...state, formData: action.payload as ISignUpFormData }
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

const useSignUpFormReducer = () => {
	return useReducer(reducer, initialState)
}

export default useSignUpFormReducer
