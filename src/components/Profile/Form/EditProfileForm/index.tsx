import React, { ChangeEvent, FC, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import InputField from '@/app/components/UI/Input/InputField'
import { faAt, faUser } from '@fortawesome/free-solid-svg-icons'

interface EditProfileFormData {
	name: {
		value: string
		error: string
	}
	email: {
		value: string
		error: string
	}
	dateOFBirth: {
		value: string
	}
	favoriteGenres: {
		value: Array<string>
	}
	biography: {
		value: string
	}
	formError: {
		error: string
	}
}

type PropsType = {
	onFormClose: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileForm: FC<PropsType> = ({ userInfo, onFormClose }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<EditProfileFormData>({
		name: {
			value: userInfo.displayName,
			error: '',
		},
		email: {
			value: userInfo.email,
			error: '',
		},
		dateOFBirth: {
			value: userInfo.dateOFBirth,
		},
		favoriteGenres: {
			value: userInfo.favoriteGenres,
		},
		biography: {
			value: userInfo.biography,
		},
		formError: {
			error: '',
		},
	})
	const isEmailValid = /\S+@\S+\.\S+/.test(formData.email.value)

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

	const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('dateOFBirth', event.target.value, error)
	}

	const handleTextareaChange = (event: ChangeEvent<HTMLInputElement>) => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('biography', event.target.value, error)
	}

	const updateField = (
		fieldName: keyof EditProfileFormData,
		value: string,
		error: string = ''
	) => {
		setFormData(prevState => ({
			...prevState,
			[fieldName]: { ...prevState[fieldName], value, error },
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
			email: { value: '', error: '' },
			dateOFBirth: { value: '' },
			favoriteGenres: { value: [] },
			biography: { value: '' },
			formError: { error: '' },
		})
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = isEmailValid

		if (isFormValid && isTouched) {
			try {
				// await signIn(formData.email.value, formData.password.value)
				console.log(formData)
				updateFormError('')
				clearForm()
			} catch (error: any) {
				updateFormError(error.toString())
			} finally {
				setIsLoading(false)
			}
		} else {
			setFormData(prevState => ({
				...prevState,
				email: {
					...prevState.email,
					error: isEmailValid ? '' : ERROR_MESSAGES.INVALID_EMAIL,
				},
			}))
			setIsLoading(false)
		}
	}

	return (
		<form>
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
				id='userEmail'
				label='Email'
				value={formData.email.value}
				error={formData.email.error}
				onChange={handleEmailChange}
				icon={faAt}
				required
				placeholder='Email'
			/>
			<InputField
				id='dateOFBirth'
				label='Date of birth'
				value={formData.dateOFBirth.value}
				onChange={handleEmailChange}
				icon={faAt}
				placeholder='Date of birth'
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
