import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { useModal } from '@/context/ModalProvider'
import { showSuccessNotification } from '@/handlers/handleModals'
import { updateUserProfileIcon } from '@/firebase/handlers/profileHandlers/updateUserProfileIcon'

interface IProfileImage {
	value: string
	error: string
}

const useUploadProfileImage = (photoURL: string) => {
	const [image, setImage] = useState<IProfileImage>({
		value: photoURL,
		error: '',
	})
	const [uploadProgress, setUploadProgress] = useState<number>(0)
	const storage = getStorage()
	const { showModal } = useModal()
	const isShowProgressBar = uploadProgress > 0 && uploadProgress < 100
	const isShowSaveButton = image && !image.error && uploadProgress === 100

	const createTemporaryImage = (temporaryImageSrc: string, error: string) => {
		const uploadingError = error.length !== 0 ? error : ''
		setImage({ value: temporaryImageSrc, error: uploadingError })
	}

	const changeProfileImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0]
		const MAX_FILE_SIZE = 1024 * 1024

		if (!file) return

		if (file.size > MAX_FILE_SIZE) {
			createTemporaryImage(
				image!.value,
				'The file size should not exceed 1MB'
			)
			return
		} else {
			try {
				const response = await uploadProfileImage(
					file,
					setUploadProgress
				)

				if (response.status === 200) {
					createTemporaryImage(response.data, '')
				}
			} catch (error) {
				createTemporaryImage(image!.value, (error as Error).toString())
			}
		}
	}

	const uploadProfileImage = async (
		file: File,
		setUploadProgress: Dispatch<SetStateAction<number>>
	): Promise<{ status: number; data: string }> => {
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
			return { status: 200, data: downloadURL }
		} catch (error) {
			return { status: 500, data: 'Error uploading image' }
		}
	}

	const saveProfileImage = () => {
		updateUserProfileIcon(image!.value).then(() => {
			setUploadProgress(0)
			showSuccessNotification(
				showModal,
				'Your profile was successfully updated'
			)
		})
	}

	useEffect(() => {
		setImage({ value: photoURL, error: '' })
	}, [photoURL])

	return {
		image,
		uploadProgress,
		isShowProgressBar,
		isShowSaveButton,
		changeProfileImage,
		saveProfileImage,
	}
}

export default useUploadProfileImage
