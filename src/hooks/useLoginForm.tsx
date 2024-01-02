import useLoginFormReducer, {
	ILoginFormData,
} from '@/hooks/useLoginFormReducer'
import { ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import {
	AUTH_PAGE,
	COLLECTION_PAGE,
	CURRENT_USER_COLLECTION_PAGE,
} from '@/constants/paths'
import { useModal } from '@/context/ModalProvider'
import { usePathname } from 'next/navigation'
import { parseCookies } from '@/handlers/handleCookies'
import { signIn } from '@/firebase/handlers/authHandlers/signIn'

export const useLoginForm = () => {
	const [state, dispatch] = useLoginFormReducer()
	const pathname = usePathname()
	const { hideModal, currentModal } = useModal()
	const { id } = currentModal || {}
	const router = useRouter()
	const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value)
	const isPasswordValid = state.formData.password.value.length > 0

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_EMAIL : ''
		updateField('email', event.target.value, error)
	}

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('password', event.target.value, error)
	}

	const updateField = (
		fieldName: keyof ILoginFormData,
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

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault()
		dispatch({ type: 'SET_LOADING', payload: true })

		const isFormValid = isEmailValid && isPasswordValid

		if (isFormValid && state.isTouched) {
			try {
				await signIn(
					state.formData.email.value,
					state.formData.password.value
				)
				updateFormError('')
				clearForm()
				hideModal(id)

				let target: string | null = null

				switch (true) {
					case pathname === AUTH_PAGE:
						target = `/`
						break
					case pathname === COLLECTION_PAGE:
						const cookies = await parseCookies()
						const userId = cookies.uid
						target = CURRENT_USER_COLLECTION_PAGE.replace(
							'{userId}',
							userId
						)
						break
					default:
						break
				}

				if (target !== null) {
					await router.push(target)
				}
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
					email: {
						...state.formData.email,
						error: isEmailValid ? '' : ERROR_MESSAGES.INVALID_EMAIL,
					},
					password: {
						...state.formData.password,
						error: isPasswordValid
							? ''
							: ERROR_MESSAGES.REQUIRED_FIELD,
					},
				},
			})
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	return {
		state,
		handleEmailChange,
		handlePasswordChange,
		handleLogin,
	}
}

export default useLoginForm
