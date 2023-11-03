import React, { ChangeEvent, useState } from 'react'
import { signIn } from '@/firebase/config'
import InputField from '../../UI/Input/InputField/index'
import Button from '../../UI/Button/index'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { useModal } from '@/context/ModalProvider'
import { usePathname } from 'next/navigation'
import {
	AUTH_PAGE,
	COLLECTION_PAGE,
	CURRENT_USER_COLLECTION_MOVIES_PAGE,
	CURRENT_USER_COLLECTION_PAGE,
} from '@/constants/paths'
import { parseCookies } from '@/handlers/handleCookies'
import { useRouter } from 'next/router'

interface LoginFormData {
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

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<LoginFormData>({
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
	const pathname = usePathname()
	const { hideModal, currentModal } = useModal()
	const { id } = currentModal || {}
	const router = useRouter()
	const isEmailValid = /\S+@\S+\.\S+/.test(formData.email.value)
	const isPasswordValid = formData.password.value.length > 0

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
		fieldName: keyof LoginFormData,
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
			email: { value: '', error: '' },
			password: { value: '', error: '' },
			formError: { error: '' },
		})
	}

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = isEmailValid && isPasswordValid

		if (isFormValid && isTouched) {
			try {
				await signIn(formData.email.value, formData.password.value)
				updateFormError('')
				clearForm()
				hideModal(id)

				let target

				switch (true) {
					case pathname === AUTH_PAGE:
						target = `/`
						break
					case pathname === COLLECTION_PAGE:
						const cookies = parseCookies()
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
					router.push(target)
				}
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
				password: {
					...prevState.password,
					error: isPasswordValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD,
				},
			}))
			setIsLoading(false)
		}
	}

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<div className='max-w-md w-full'>
				<form
					onSubmit={handleLogin}
					className='flex flex-col justify-center items-center gap-4'
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
							className='px-4 py-2 bg-amber-600/20 w-full rounded-md'
							error={formData.formError.error}
						/>
					)}
					<Button className='mt-8 w-full' type='submit'>
						{isLoading ? (
							<Loader isShowText type='static' />
						) : (
							'Submit'
						)}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
