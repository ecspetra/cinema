import { useReducer } from 'react'

export interface ILoginFormData {
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
	formData: ILoginFormData
}

interface Action {
	type: string
	payload?: ILoginFormData | boolean
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

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload as boolean }
		case 'SET_TOUCHED':
			return { ...state, isTouched: true }
		case 'SET_FORM_DATA':
			return { ...state, formData: action.payload as ILoginFormData }
		case 'CLEAR_FORM':
			return initialState
		default:
			return state
	}
}

const useLoginFormReducer = () => {
	return useReducer(reducer, initialState)
}

export default useLoginFormReducer
