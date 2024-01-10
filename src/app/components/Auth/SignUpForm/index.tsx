import Button from '../../UI/Button/index'
import InputField from '../../UI/Input/InputField/index'
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'
import useSignUpForm from '@/hooks/useSignUpForm'

const SignUpForm = () => {
	const {
		state,
		handleNameChange,
		handleEmailChange,
		handlePasswordChange,
		handleSignUp,
	} = useSignUpForm()

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
