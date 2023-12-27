import { FC, Dispatch, SetStateAction } from 'react'
import Button from '../../../../app/components/UI/Button'
import InputField from '@/app/components/UI/Input/InputField'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'
import useProfileEditCredentialForm from '@/hooks/useProfileEditCredentialForm'

type PropsType = {
	onFormClose: Dispatch<SetStateAction<boolean>>
}

const EditCredentialForm: FC<PropsType> = ({ onFormClose }) => {
	const {
		state,
		handleEmailChange,
		handleOldPasswordChange,
		handleNewPasswordChange,
		handleSubmit,
	} = useProfileEditCredentialForm(onFormClose)

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-start items-start gap-4 mb-16'
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
				id='userOldPassword'
				label='Old password'
				value={state.formData.oldPassword.value}
				error={state.formData.oldPassword.error}
				onChange={handleOldPasswordChange}
				icon={faKey}
				required
				type='password'
				placeholder='Old password'
			/>
			<InputField
				id='userNewPassword'
				label='New password'
				value={state.formData.newPassword.value}
				error={state.formData.newPassword.error}
				onChange={handleNewPasswordChange}
				icon={faKey}
				required
				type='password'
				placeholder='New password'
			/>
			{state.formData.formError.error && (
				<Error
					className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
					error={state.formData.formError.error}
				/>
			)}
			<div className='mt-8 flex justify-start items-center'>
				<Button type='submit'>
					{state.isLoading ? (
						<Loader isShowText type='static' />
					) : (
						'Update'
					)}
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
