import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import InputField from '@/app/components/UI/Input/InputField'
import {
	faAt,
	faCalendarCheck,
	faKey,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ProfileIcon from '@/components/Profile/ProfileInfo/ProfileIcon'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { updateUserInfo } from '@/firebase/config'
import GenreList from '@/components/Genre/GenreList'
import moment from 'moment'

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
	biography: {
		value: string
		error: string
	}
	formError: {
		error: string
	}
}

type PropsType = {
	onFormClose: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileForm: FC<PropsType> = ({ userInfo, onFormClose }) => {
	const initialDateValue = new Date()
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<EditProfileFormData>({
		name: {
			value: userInfo.displayName,
			error: '',
		},
		country: {
			value: userInfo.country || '',
			error: '',
		},
		dateOfBirth: {
			value: userInfo.dateOfBirth || '',
			error: '',
		},
		biography: {
			value: userInfo.biography || '',
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
		updateField('dateOfBirth', moment(date).format('Do MMM YYYY'), '')
	}

	const handleTextareaChange = value => {
		updateField('biography', value, '')
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
			biography: { value: '', error: '' },
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
		<form className='flex flex-col justify-start items-center z-10 mb-16'>
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
			<DatePicker
				selected={initialDateValue}
				onChange={date => handleDateOfBirthChange(date)}
				maxDate={initialDateValue}
			/>
			<Textarea
				onChange={handleTextareaChange}
				value={formData.biography.value}
			/>
			<div className='mt-8 flex justify-start items-center'>
				<Button onClick={handleSubmit}>Update profile</Button>
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
