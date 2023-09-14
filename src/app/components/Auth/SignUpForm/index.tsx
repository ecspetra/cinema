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
import Error from '@/app/components/UI/Error'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { updateErrors } from '@/handlers/updateErrors'

type ErrorsState = {
	name: string
	email: string
	password: string
	general: string
}

function SignUpForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<ErrorsState>({
		name: '',
		email: '',
		password: '',
		general: '',
	})
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const router = useRouter()
	const isEmailValid =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const isPasswordValid = password.length >= 8

	const handleNameInput = (newValue: string) => {
		setName(newValue)

		setErrors(prevErrors => ({
			...prevErrors,
			name: newValue ? '' : ERROR_MESSAGES.NAME_REQUIRED,
		}))
	}

	const handleEmailInput = (newValue: string) => {
		setEmail(newValue)

		setErrors(prevErrors => ({
			...prevErrors,
			email: newValue ? '' : ERROR_MESSAGES.INVALID_EMAIL,
		}))
	}

	const handlePasswordInput = (newValue: string) => {
		setPassword(newValue)

		setErrors(prevErrors => ({
			...prevErrors,
			password: newValue ? '' : ERROR_MESSAGES.SHORT_PASSWORD,
		}))
	}

	const handleSignUp = async event => {
		event.preventDefault()
		setIsLoading(true)
		setErrors({
			name: name ? '' : ERROR_MESSAGES.NAME_REQUIRED,
			email: isEmailValid.test(email) ? '' : ERROR_MESSAGES.INVALID_EMAIL,
			password: isPasswordValid ? '' : ERROR_MESSAGES.SHORT_PASSWORD,
			general: '',
		})

		if (name && isPasswordValid && isEmailValid.test(email)) {
			try {
				await signUp(email, password, name)
				setName('')
				setEmail('')
				setPassword('')
				await router.push('/')
			} catch (error) {
				setErrors(prevErrors => ({
					...prevErrors,
					general: error.toString(),
				}))
			} finally {
				setIsLoading(false)
			}
		} else {
			setIsLoading(false)
		}
	}

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<div className='max-w-md w-full'>
				<div className='flex justify-center items-center mb-12 gap-4'>
					<Title className='mb-0'>Sign up</Title>
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
						icon={faUser}
						error={errors.name}
						required
						placeholder='Name'
						onChange={handleNameInput}
					/>
					<InputField
						id='userEmail'
						label='Email'
						icon={faAt}
						error={errors.email}
						required
						placeholder='Email'
						onChange={handleEmailInput}
					/>
					<InputField
						id='userPassword'
						label='Password'
						icon={faKey}
						error={errors.password}
						required
						type='password'
						placeholder='Password'
						onChange={handlePasswordInput}
					/>
					{errors.general && (
						<Error
							className='bg-red-600/20 px-4 py-2 w-full rounded-md'
							error={errors.general}
						/>
					)}
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
