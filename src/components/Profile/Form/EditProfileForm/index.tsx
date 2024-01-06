import { Dispatch, SetStateAction, FC } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import InputField from '@/app/components/UI/Input/InputField'
import { faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons'
import Loader from '@/components/Loader'
import Error from '@/app/components/UI/Error'
import CustomDatepicker from '@/app/components/UI/Datepicker'
import { IUser } from '../../../../../interfaces'
import useProfileEditForm from '@/components/Profile/hooks/useProfileEditForm'

type PropsType = {
	profileInfo: IUser
	onFormClose: Dispatch<SetStateAction<boolean>>
}

const EditProfileForm: FC<PropsType> = ({ profileInfo, onFormClose }) => {
	const {
		state,
		handleNameChange,
		handleCountryChange,
		handleDateOfBirthChange,
		handleTextareaChange,
		handleSubmit,
	} = useProfileEditForm(profileInfo, onFormClose)

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-start items-start gap-4 mb-16'
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
				id='country'
				label='Country'
				value={state.formData.country.value}
				onChange={handleCountryChange}
				icon={faCalendarCheck}
				placeholder='Country'
			/>
			<CustomDatepicker
				initialDateValue={state.formData.dateOfBirth.value}
				onChange={date => handleDateOfBirthChange(date)}
				label='Date of birth'
			/>
			<Textarea
				onChange={handleTextareaChange}
				value={state.formData.about.value}
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
						'Update profile'
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

export default EditProfileForm
