import InputField from '../../UI/Input/InputField/index'
import Button from '../../UI/Button/index'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'
import useLoginForm from '@/hooks/useLoginForm'

const LoginForm = () => {
	const { state, handleEmailChange, handlePasswordChange, handleLogin } =
		useLoginForm()

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
