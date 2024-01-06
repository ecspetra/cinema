import useProfileEditFormReducer, {
	IProfileEditFormData,
} from '@/components/Profile/hooks/useProfileEditFormReducer'
import { useModal } from '@/context/ModalProvider'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { showSuccessNotification } from '@/handlers/handleModals'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { IUser } from '../../../../interfaces'
import { updateUserProfileInfo } from '@/firebase/handlers/profileHandlers/updateUserProfileInfo'

const useProfileEditForm = (
	profileInfo: IUser,
	onFormClose: Dispatch<SetStateAction<boolean>>
) => {
	const [state, dispatch] = useProfileEditFormReducer(profileInfo)
	const { showModal } = useModal()
	const isNameValid = state.formData.name.value.length > 0

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('name', event.target.value, error)
	}

	const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
		updateField('country', event.target.value, '')
	}

	const handleDateOfBirthChange = (date: DateValueType | null) => {
		let formattedDate

		if (!date) {
			formattedDate = ''
		} else {
			formattedDate = date.startDate
		}

		updateField('dateOfBirth', formattedDate as string, '')
	}

	const handleTextareaChange = (value: string) => {
		updateField('about', value, '')
	}

	const updateField = (
		fieldName: keyof IProfileEditFormData,
		value: string,
		error: string
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

		if (isNameValid && state.isTouched) {
			try {
				await updateUserProfileInfo(state.formData)

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
					name: {
						...state.formData.name,
						error: isNameValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD,
					},
				},
			})
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	return {
		state,
		handleNameChange,
		handleCountryChange,
		handleDateOfBirthChange,
		handleTextareaChange,
		handleSubmit,
	}
}

export default useProfileEditForm
