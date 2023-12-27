import { FC } from 'react'
import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import FileInputField from '@/app/components/UI/Input/InputField/FileInputField'
import ProgressBar from '@/app/components/UI/ProgressBar'
import Button from '@/app/components/UI/Button'
import useUploadProfileImage from '@/hooks/useUploadProfileImage'

type PropsType = {
	photoURL: string
	isCurrentUserProfile: boolean
}

const ProfileIcon: FC<PropsType> = ({ photoURL, isCurrentUserProfile }) => {
	const {
		image,
		uploadProgress,
		isShowProgressBar,
		isShowSaveButton,
		changeProfileImage,
		saveProfileImage,
	} = useUploadProfileImage(photoURL)

	return (
		<>
			<Image
				className='!w-[232px] h-[232px] rounded-full mb-4'
				src={image.value}
				defaultImage={defaultUserImage}
			/>
			{isCurrentUserProfile && (
				<>
					{isShowSaveButton ? (
						<Button className='w-full' onClick={saveProfileImage}>
							Save changes
						</Button>
					) : (
						<FileInputField
							id='profileImage'
							error={image.error}
							onChange={changeProfileImage}
						/>
					)}
					{isShowProgressBar && (
						<ProgressBar progress={uploadProgress} />
					)}
				</>
			)}
		</>
	)
}

export default ProfileIcon
