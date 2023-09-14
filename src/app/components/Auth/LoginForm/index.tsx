import React, { useState } from 'react'
import { signIn, signUp } from '@/firebase/config'
import InputField from '../../UI/Input/InputField/index'
import Title from '../../UI/Title/Title'
import Button from '../../UI/Button/index'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faKey, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'

function LoginForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		general: '',
	})
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const isEmailValid =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const isPasswordValid = password.length >= 8

	const handleEmailInput = (newValue: string) => {
		setEmail(newValue)

		setErrors(prevErrors => ({
			...prevErrors,
			email: newValue ? '' : 'Please enter a valid email address',
		}))
	}

	const handlePasswordInput = (newValue: string) => {
		setPassword(newValue)

		setErrors(prevErrors => ({
			...prevErrors,
			password: newValue
				? ''
				: 'Password length must be at least 8 characters',
		}))
	}
	const handleLogin = async event => {
		event.preventDefault()
		setIsLoading(true)
		setErrors({
			email: isEmailValid.test(email)
				? ''
				: 'Please enter a valid email address',
			password: isPasswordValid
				? ''
				: 'Password length must be at least 8 characters',
			general: '',
		})

		if (isPasswordValid && isEmailValid.test(email)) {
			try {
				await signIn(email, password)
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
					<Title className='mb-0'>Login</Title>
					<FontAwesomeIcon
						className='text-2xl text-red-600'
						icon={faDoorOpen}
					/>
				</div>
				<form
					onSubmit={handleLogin}
					className='flex flex-col justify-center items-center'
				>
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

export default LoginForm
