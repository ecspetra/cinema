import { useReducer } from 'react'

export interface LoginFormData {
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

export interface State {
	isLoading: boolean
	isTouched: boolean
	formData: LoginFormData
}

interface Action {
	type: string
	payload?: any
}

const initialState: State = {
	isLoading: false,
	isTouched: false,
	formData: {
		email: { value: '', error: '' },
		password: { value: '', error: '' },
		formError: { error: '' },
	},
}

const loginFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload }
		case 'SET_TOUCHED':
			return { ...state, isTouched: action.payload }
		case 'SET_FORM_DATA':
			return { ...state, formData: action.payload }
		case 'CLEAR_FORM':
			return initialState
		default:
			return state
	}
}

const useLoginFormReducer = () => {
	return useReducer(loginFormReducer, initialState)
}

export default useLoginFormReducer
