import { Dispatch, SetStateAction, ChangeEvent, FC, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import InputField from '@/app/components/UI/Input/InputField'
import { faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { updateUserInfo } from '@/firebase/config'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'
import CustomDatepicker from '@/app/components/UI/Datepicker'
import { IUser } from '../../../../../interfaces'

interface EditProfileFormData {
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

type PropsType = {
	profileInfo: IUser
	onFormClose: Dispatch<SetStateAction<boolean>>
}

const EditProfileForm: FC<PropsType> = ({ profileInfo, onFormClose }) => {
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<EditProfileFormData>({
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
	})
	const isNameValid = formData.name.value.length > 0

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('name', event.target.value, error)
	}

	const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
		updateField('country', event.target.value, '')
	}

	const handleDateOfBirthChange = date => {
		let formattedDate

		if (!date) {
			formattedDate = ''
		} else {
			formattedDate = date.startDate
		}

		updateField('dateOfBirth', formattedDate, '')
	}

	const handleTextareaChange = value => {
		updateField('about', value, '')
	}

	const updateField = (
		fieldName: keyof EditProfileFormData,
		value: string,
		error: string
	) => {
		setFormData(prevState => ({
			...prevState,
			[fieldName]: {
				...prevState[fieldName],
				value,
				error,
			},
		}))

		if (!isTouched) setIsTouched(true)
	}

	const updateFormError = (error: string) => {
		setFormData(prevState => ({
			...prevState,
			formError: { error },
		}))
	}

	const clearForm = () => {
		setFormData({
			name: { value: '', error: '' },
			country: { value: '', error: '' },
			dateOfBirth: { value: '', error: '' },
			about: { value: '', error: '' },
			formError: { error: '' },
		})
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = isNameValid

		if (isFormValid && isTouched) {
			try {
				await updateUserInfo(formData)

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
				setIsLoading(false)
			}
		} else {
			setFormData(prevState => ({
				...prevState,
				name: {
					...prevState.name,
					error: isNameValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD,
				},
			}))
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-start items-start gap-4 mb-16'
		>
			<InputField
				id='userName'
				label='Name'
				value={formData.name.value}
				error={formData.name.error}
				onChange={handleNameChange}
				icon={faUser}
				required
				placeholder='Name'
			/>
			<InputField
				id='country'
				label='Country'
				value={formData.country.value}
				onChange={handleCountryChange}
				icon={faCalendarCheck}
				placeholder='Country'
			/>
			<CustomDatepicker
				initialDateValue={formData.dateOfBirth.value}
				onChange={date => handleDateOfBirthChange(date)}
				label='Date of birth'
			/>
			<Textarea
				onChange={handleTextareaChange}
				value={formData.about.value}
			/>
			{formData.formError.error && (
				<Error
					className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
					error={formData.formError.error}
				/>
			)}
			<div className='mt-8 flex justify-start items-center'>
				<Button type='submit'>
					{isLoading ? (
						<Loader isShowText type='static' />
					) : (
						'Update profile'
					)}
				</Button>
				<Button
					context='filledDark'
					className='ml-2'
					onClick={() => onFormClose(false)}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default EditProfileForm
