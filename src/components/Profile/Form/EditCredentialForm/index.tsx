import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import InputField from '@/app/components/UI/Input/InputField'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { updateUserCredential } from '@/firebase/config'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'

interface EditProfileFormData {
	email: {
		value: string
		error: string
	}
	oldPassword: {
		value: string
		error: string
	}
	newPassword: {
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

const EditCredentialForm: FC<PropsType> = ({ userInfo, onFormClose }) => {
	const initialDateValue = new Date()
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<EditProfileFormData>({
		email: {
			value: '',
			error: '',
		},
		oldPassword: {
			value: '',
			error: '',
		},
		newPassword: {
			value: '',
			error: '',
		},
		formError: {
			error: '',
		},
	})
	const isEmailValid = /\S+@\S+\.\S+/.test(formData.email.value)
	const isOldPasswordValid = formData.oldPassword.value.length > 0
	const isNewPasswordValid = formData.newPassword.value.length > 0

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
			email: { value: '', error: '' },
			oldPassword: { value: '', error: '' },
			newPassword: { value: '', error: '' },
			formError: { error: '' },
		})
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid =
			isEmailValid && isOldPasswordValid && isNewPasswordValid

		if (isFormValid && isTouched) {
			try {
				await updateUserCredential(formData)

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
				email: {
					...prevState.email,
					error: isEmailValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD,
				},
				oldPassword: {
					...prevState.oldPassword,
					error: isOldPasswordValid
						? ''
						: ERROR_MESSAGES.REQUIRED_FIELD,
				},
				newPassword: {
					...prevState.newPassword,
					error: isNewPasswordValid
						? ''
						: ERROR_MESSAGES.REQUIRED_FIELD,
				},
			}))
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-start items-start gap-4 z-10 mb-16'
		>
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
				id='userOldPassword'
				label='Old password'
				value={formData.oldPassword.value}
				error={formData.oldPassword.error}
				onChange={handleOldPasswordChange}
				icon={faKey}
				required
				type='password'
				placeholder='Old password'
			/>
			<InputField
				id='userNewPassword'
				label='New password'
				value={formData.newPassword.value}
				error={formData.newPassword.error}
				onChange={handleNewPasswordChange}
				icon={faKey}
				required
				type='password'
				placeholder='New password'
			/>
			{formData.formError.error && (
				<Error
					className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
					error={formData.formError.error}
				/>
			)}
			<div className='mt-8 flex justify-start items-center'>
				<Button type='submit'>
					{isLoading ? <Loader isShowText type='static' /> : 'Update'}
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

export default EditCredentialForm
