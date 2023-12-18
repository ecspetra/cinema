import { ChangeEvent, useReducer, Dispatch, FormEvent } from 'react'
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
	CURRENT_USER_COLLECTION_PAGE,
} from '@/constants/paths'
import { parseCookies } from '@/handlers/handleCookies'
import { useRouter } from 'next/router'

interface Action {
	type: string
	payload?: any
}

interface State {
	isLoading: boolean
	isTouched: boolean
	formData: LoginFormData
}

const initialState: State = {
	isLoading: false,
	isTouched: false,
	formData: {
		email: { value: '', error: '' },
		password: { value: '', error: '' },
		formError: { error: '' },
	},
}

const loginFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload }
		case 'SET_TOUCHED':
			return { ...state, isTouched: action.payload }
		case 'SET_FORM_DATA':
			return { ...state, formData: action.payload }
		case 'CLEAR_FORM':
			return initialState
		default:
			return state
	}
}

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
	const [state, dispatch] = useReducer(loginFormReducer, initialState)
	const pathname = usePathname()
	const { hideModal, currentModal } = useModal()
	const { id } = currentModal || {}
	const router = useRouter()
	const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value)
	const isPasswordValid = state.formData.password.value.length > 0

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

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault()
		dispatch({ type: 'SET_LOADING', payload: true })

		const isFormValid = isEmailValid && isPasswordValid

		if (isFormValid && state.isTouched) {
			try {
				await signIn(
					state.formData.email.value,
					state.formData.password.value
				)
				updateFormError('')
				clearForm()
				hideModal(id)

				let target: string = ''

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
					await router.push(target)
				}
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
					onSubmit={handleLogin}
					className='flex flex-col justify-center items-center gap-4'
				>
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
