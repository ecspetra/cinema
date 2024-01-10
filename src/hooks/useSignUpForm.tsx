import { ChangeEvent, FormEvent, useMemo } from 'react'
import useSignUpFormReducer, {
	ISignUpFormData,
} from '@/hooks/useSignUpFormReducer'
import { useRouter } from 'next/router'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { useModal } from '@/context/ModalProvider'
import { usePathname } from 'next/navigation'
import { signUp } from '@/firebase/handlers/authHandlers/signUp'

export const useSignUpForm = () => {
	const [state, dispatch] = useSignUpFormReducer()
	const router = useRouter()
	const { hideModal, currentModal } = useModal()
	const { id } = currentModal || {}
	const pathname = usePathname()
	const isAuthPage = useMemo(() => pathname === '/auth', [pathname])
	const isNameValid = state.formData.name.value.trim() !== ''
	const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value)
	const isPasswordValid = state.formData.password.value.length >= 6

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('name', event.target.value, error)
	}

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_EMAIL : ''
		updateField('email', event.target.value, error)
	}

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_PASSWORD : ''
		updateField('password', event.target.value, error)
	}

	const updateField = (
		fieldName: keyof ISignUpFormData,
		value: string,
		error: string = ''
	) => {
		dispatch({
			type: 'SET_FORM_DATA',
			payload: {
				...state.formData,
				[fieldName]: { ...state.formData[fieldName], value, error },
			},
		})

		if (!state.isTouched) {
			dispatch({ type: 'SET_TOUCHED', payload: true })
		}
	}

	const updateFormError = (error: string) => {
		dispatch({
			type: 'SET_FORM_DATA',
			payload: {
				...state.formData,
				formError: { error },
			},
		})
	}

	const clearForm = () => {
		dispatch({ type: 'CLEAR_FORM' })
	}

	const handleSignUp = async (event: FormEvent) => {
		event.preventDefault()
		dispatch({ type: 'SET_LOADING', payload: true })

		const isFormValid = isNameValid && isEmailValid && isPasswordValid

		if (isFormValid && state.isTouched) {
			try {
				await signUp(
					state.formData.email.value,
					state.formData.password.value,
					state.formData.name.value
				)
				updateFormError('')
				clearForm()
				hideModal(id!)
				if (isAuthPage) await router.push('/')
			} catch (error: any) {
				updateFormError(error.toString())
			} finally {
				dispatch({ type: 'SET_LOADING', payload: false })
			}
		} else {
			dispatch({
				type: 'SET_FORM_DATA',
				payload: {
					...state.formData,
					name: {
						...state.formData.name,
						error: isNameValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD,
					},
					email: {
						...state.formData.email,
						error: isEmailValid ? '' : ERROR_MESSAGES.INVALID_EMAIL,
					},
					password: {
						...state.formData.password,
						error: isPasswordValid
							? ''
							: ERROR_MESSAGES.INVALID_PASSWORD,
					},
				},
			})
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	return {
		state,
		handleNameChange,
		handleEmailChange,
		handlePasswordChange,
		handleSignUp,
	}
}

export default useSignUpForm
