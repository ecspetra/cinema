import React, { ChangeEvent, useMemo, useState } from 'react'
import { signUp } from '@/firebase/config'
import Button from '../../UI/Button/index'
import InputField from '../../UI/Input/InputField/index'
import { useRouter } from 'next/router'
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import Error from '@/app/components/UI/Error'
import { useModal } from '@/context/ModalProvider'
import { usePathname } from 'next/navigation'

interface SignUpFormData {
	name: {
		value: string
		error: string
	}
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

const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<SignUpFormData>({
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
		formError: {
			error: '',
		},
	})
	const router = useRouter()
	const pathname = usePathname()
	const { hideModal } = useModal()
	const isAuthPage = useMemo(() => pathname === '/auth', [pathname])
	const isNameValid = formData.name.value.trim() !== ''
	const isEmailValid = /\S+@\S+\.\S+/.test(formData.email.value)
	const isPasswordValid = formData.password.value.length >= 8

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
		fieldName: keyof SignUpFormData,
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
			password: { value: '', error: '' },
			formError: { error: '' },
		})
	}

	const handleSignUp = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = isNameValid && isEmailValid && isPasswordValid

		if (isFormValid && isTouched) {
			try {
				await signUp(
					formData.email.value,
					formData.password.value,
					formData.name.value
				)
				updateFormError('')
				clearForm()
				hideModal()
				if (isAuthPage) await router.push('/')
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
					{formData.formError.error && (
						<Error
							className='px-4 py-2 bg-red-600/20 w-full rounded-md'
							error={formData.formError.error}
						/>
					)}
					<Button className='mt-8 w-full' type='submit'>
						{isLoading ? (
							<span className='flex justify-center items-center'>
								Loading{' '}
								<Loader type='static' className='ml-2' />
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
