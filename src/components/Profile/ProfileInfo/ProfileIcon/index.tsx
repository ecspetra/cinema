import { FC, useEffect, useState } from 'react'
import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import FileInputField from '@/app/components/UI/Input/InputField/FileInputField'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import ProgressBar from '@/app/components/UI/ProgressBar'
import Button from '@/app/components/UI/Button'
import { updateProfileIcon } from '@/firebase/config'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'

type PropsType = {
	photoURL: string
	isCurrentUserProfile: boolean
}

const ProfileIcon: FC<PropsType> = ({ photoURL, isCurrentUserProfile }) => {
	const [image, setImage] = useState({ value: '', error: '' })
	const [uploadProgress, setUploadProgress] = useState(0)
	const storage = getStorage()
	const { showModal } = useModal()
	const isShowProgressBar = uploadProgress > 0 && uploadProgress < 100
	const isShowSaveButton = !image.error && uploadProgress === 100

	const handleTemporaryImage = (newImage: string, error: string) => {
		const uploadingError = error.length !== 0 ? error : ''
		setImage({ value: newImage, error: uploadingError })
	}

	const handleSaveChanges = () => {
		updateProfileIcon(image.value).then(() => {
			setUploadProgress(0)
			showSuccessNotification(
				showModal,
				'Your profile was successfully updated'
			)
		})
	}

	const handleImageChange = async event => {
		const file = event.target.files[0]
		const MAX_FILE_SIZE = 1024 * 1024

		if (file.size > MAX_FILE_SIZE) {
			handleTemporaryImage(
				image.value,
				'The file size should not exceed 1MB'
			)
			return
		} else {
			try {
				const response = await handleUploadImage(
					file,
					setUploadProgress
				)

				if (response.status === 200) {
					handleTemporaryImage(response.data.url, '')
				}
			} catch (error) {
				handleTemporaryImage(image.value, error.toString())
			}
		}
	}

	const handleUploadImage = async (file: object, setUploadProgress) => {
		const storageRef = ref(storage, `images/${file.name}`)

		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on('state_changed', snapshot => {
			const progress =
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			setUploadProgress(progress)
		})

		try {
			await uploadTask
			const downloadURL = await getDownloadURL(storageRef)
			return { status: 200, data: { url: downloadURL } }
		} catch (error) {
			return { status: 500, data: 'Error uploading image' }
		}
	}

	useEffect(() => {
		setImage({ value: photoURL, error: '' })
	}, [photoURL])

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
						<Button className='w-full' onClick={handleSaveChanges}>
							Save changes
						</Button>
					) : (
						<FileInputField
							id='profileImage'
							error={image.error}
							onChange={handleImageChange}
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
