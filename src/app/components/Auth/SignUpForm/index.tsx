import { ChangeEvent, useMemo, useReducer, FormEvent } from 'react'
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

interface State {
	isLoading: boolean
	isTouched: boolean
	formData: SignUpFormData
}

interface Action {
	type: string
	payload?: any
}

const initialState: State = {
	isLoading: false,
	isTouched: false,
	formData: {
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
	},
}

const signUpFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_FORM_DATA':
			return { ...state, formData: action.payload }
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload,
			}
		case 'SET_TOUCHED':
			return {
				...state,
				isTouched: true,
			}
		case 'CLEAR_FORM':
			return initialState
		default:
			return state
	}
}

const SignUpForm = () => {
	const [state, dispatch] = useReducer(signUpFormReducer, initialState)
	const router = useRouter()
	const pathname = usePathname()
	const { hideModal, currentModal } = useModal()
	const { id } = currentModal || {}
	const isAuthPage = useMemo(() => pathname === '/auth', [pathname])
	const isNameValid = state.formData.name.value.trim() !== ''
	const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value)
	const isPasswordValid = state.formData.password.value.length >= 8

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

	const handleSignUp = async (event: FormEvent) => {
		event.preventDefault()
		dispatch({ type: 'SET_LOADING', payload: true })

		const isFormValid = isNameValid && isEmailValid && isPasswordValid

		if (isFormValid && state.isTouched) {
			try {
				await signUp(
					state.formData.email.value,
					state.formData.password.value,
					state.formData.name.value
				)
				updateFormError('')
				clearForm()
				hideModal(id)
				if (isAuthPage) await router.push('/')
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
					email: {
						...state.formData.email,
						error: isEmailValid ? '' : ERROR_MESSAGES.INVALID_EMAIL,
					},
					password: {
						...state.formData.password,
						error: isPasswordValid
							? ''
							: ERROR_MESSAGES.REQUIRED_FIELD,
					},
				},
			})
			dispatch({ type: 'SET_LOADING', payload: false })
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
						value={state.formData.name.value}
						error={state.formData.name.error}
						onChange={handleNameChange}
						icon={faUser}
						required
						placeholder='Name'
					/>
					<InputField
						id='userEmail'
						label='Email'
						value={state.formData.email.value}
						error={state.formData.email.error}
						onChange={handleEmailChange}
						icon={faAt}
						required
						placeholder='Email'
					/>
					<InputField
						id='userPassword'
						label='Password'
						value={state.formData.password.value}
						error={state.formData.password.error}
						onChange={handlePasswordChange}
						icon={faKey}
						required
						type='password'
						placeholder='Password'
					/>
					{state.formData.formError.error && (
						<Error
							className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
							error={state.formData.formError.error}
						/>
					)}
					<Button className='mt-8 w-full' type='submit'>
						{state.isLoading ? (
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
