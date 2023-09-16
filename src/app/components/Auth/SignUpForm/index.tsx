import React, { useState } from 'react'
import { signUp } from '@/firebase/config'
import Title from '../../UI/Title/Title'
import Button from '../../UI/Button/index'
import InputField from '../../UI/Input/InputField/index'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUser,
	faAt,
	faKey,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import { ERROR_MESSAGES } from '@/constants/errorMessages'

function SignUpForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState({
		name: {
			value: '',
			error: '',
		},
		email: {
			value: '',
			error: '',
		},
		password: {
			value: '',
			error: '',
		},
	})
	const router = useRouter()
	const isNameValid = formData.name.value.trim() !== ''
	const isEmailValid = /\S+@\S+\.\S+/.test(formData.email.value)
	const isPasswordValid = formData.password.value.length >= 8

	const handleNameChange = event => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.REQUIRED_FIELD : ''
		updateField('name', event.target.value, error)
	}

	const handleEmailChange = event => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_EMAIL : ''
		updateField('email', event.target.value, error)
	}

	const handlePasswordChange = event => {
		const error =
			event.target.value === '' ? ERROR_MESSAGES.INVALID_PASSWORD : ''
		updateField('password', event.target.value, error)
	}

	const updateField = (
		fieldName: string,
		value: string,
		error: string = ''
	) => {
		setFormData(prevState => ({
			...prevState,
			[fieldName]: { ...prevState[fieldName], value, error },
		}))

		if (!isTouched) setIsTouched(true)
	}

	const clearErrors = () => {
		setFormData(prevState => ({
			...prevState,
			name: { ...prevState.name, error: '' },
			email: { ...prevState.email, error: '' },
			password: { ...prevState.password, error: '' },
		}))
	}

	const handleSignUp = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = isNameValid && isEmailValid && isPasswordValid

		if (isFormValid && isTouched) {
			clearErrors()
			try {
				await signUp(
					formData.email.value,
					formData.password.value,
					formData.name.value
				)
				await router.push('/')
			} catch (error) {
				console.log(error)
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
				email: {
					...prevState.email,
					error: isEmailValid ? '' : ERROR_MESSAGES.INVALID_EMAIL,
				},
				password: {
					...prevState.password,
					error: isPasswordValid
						? ''
						: ERROR_MESSAGES.INVALID_PASSWORD,
				},
			}))
			setIsLoading(false)
		}
	}

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<div className='max-w-md w-full'>
				<div className='flex justify-center items-center mb-12 gap-4'>
					<Title className='!mb-0'>Sign up</Title>
					<FontAwesomeIcon
						className='text-2xl text-red-600'
						icon={faUserPlus}
					/>
				</div>
				<form
					onSubmit={handleSignUp}
					autoComplete='off'
					className='flex flex-col justify-center items-center gap-4'
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
						id='userPassword'
						label='Password'
						value={formData.password.value}
						error={formData.password.error}
						onChange={handlePasswordChange}
						icon={faKey}
						required
						type='password'
						placeholder='Password'
					/>
					<Button className='mt-8 w-full relative' type='submit'>
						{isLoading ? (
							<span className='flex justify-center items-center'>
								Loading{' '}
								<Loader className='!static bg-transparent !transform-none !inset-0 ml-2' />
							</span>
						) : (
							'Submit'
						)}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default SignUpForm
