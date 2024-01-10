import useProfileEditCredentialFormReducer, {
	IProfileEditCredentialFormData,
} from '@/components/Profile/hooks/useProfileEditCredentialFormReducer'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { useModal } from '@/context/ModalProvider'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { showSuccessNotification } from '@/handlers/handleModals'
import { updateUserCredential } from '@/firebase/handlers/profileHandlers/updateUserCredential'

const useProfileEditCredentialForm = (
	onFormClose: Dispatch<SetStateAction<boolean>>
) => {
	const [state, dispatch] = useProfileEditCredentialFormReducer()
	const { showModal } = useModal()
	const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value)
	const isOldPasswordValid = state.formData.oldPassword.value.length > 0
	const isNewPasswordValid = state.formData.newPassword.value.length > 6
	const isNewPasswordSameAsOldPassword =
		state.formData.newPassword.value === state.formData.oldPassword.value

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_EMAIL : ''
		updateField('email', event.target.value, error)
	}

	const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_PASSWORD : ''
		updateField('oldPassword', event.target.value, error)
	}

	const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_PASSWORD : ''
		updateField('newPassword', event.target.value, error)
	}

	const updateField = (
		fieldName: keyof IProfileEditCredentialFormData,
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

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		dispatch({ type: 'SET_LOADING', payload: true })

		const isFormValid =
			isEmailValid &&
			isOldPasswordValid &&
			isNewPasswordValid &&
			!isNewPasswordSameAsOldPassword

		if (isFormValid && state.isTouched) {
			try {
				await updateUserCredential(state.formData)

				onFormClose(false)
				updateFormError('')
				clearForm()
				showSuccessNotification(
					showModal,
					'Your profile was successfully updated'
				)
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
						error: isEmailValid
							? ''
							: ERROR_MESSAGES.REQUIRED_FIELD,
					},
					oldPassword: {
						...state.formData.oldPassword,
						error: isOldPasswordValid
							? ''
							: ERROR_MESSAGES.REQUIRED_FIELD,
					},
					newPassword: {
						...state.formData.newPassword,
						error: !isNewPasswordValid
							? ERROR_MESSAGES.INVALID_PASSWORD
							: isNewPasswordSameAsOldPassword
							? ERROR_MESSAGES.SAME_PASSWORDS
							: '',
					},
				},
			})
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	return {
		state,
		handleEmailChange,
		handleOldPasswordChange,
		handleNewPasswordChange,
		handleSubmit,
	}
}

export default useProfileEditCredentialForm
