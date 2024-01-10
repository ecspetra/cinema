import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ITag } from '../../../../interfaces'
import { useModal } from '@/context/ModalProvider'
import { updateUserProfileGenres } from '@/firebase/handlers/profileHandlers/updateUserProfileGenres'
import { showSuccessNotification } from '@/handlers/handleModals'
import { getAllGenres } from '@/handlers/getAllGenres'

type TagListConfigType = {
	onFormClose?: Dispatch<SetStateAction<boolean>>
	isEditTags?: boolean
}

const useTagList = (tags: ITag[], tagListConfig: TagListConfigType) => {
	const { onFormClose, isEditTags } = tagListConfig
	const [itemsList, setItemsList] = useState<ITag[]>([])
	const [selectedTags, setSelectedTags] = useState<ITag[]>(tags)
	const { showModal } = useModal()

	const toggleTag = (tag: ITag, isChecked: boolean) => {
		if (isChecked) {
			setSelectedTags(prevState =>
				prevState.filter(item => item.name !== tag.name)
			)
		} else {
			setSelectedTags(prevState => [...prevState, tag])
		}
	}

	const checkIfTagIsSelected = (tagName: ITag['name']) => {
		if (tags && tags.find(item => item.name === tagName)) {
			return true
		}
	}

	const closeEditTagsForm = () => {
		onFormClose && onFormClose(false)
	}

	const saveChanges = async () => {
		await updateUserProfileGenres(selectedTags).then(() => {
			closeEditTagsForm()
			showSuccessNotification(
				showModal,
				'Your profile was successfully updated'
			)
		})
	}

	useEffect(() => {
		if (isEditTags) {
			const getTags = async () => {
				const allTags = await getAllGenres('all')
				setItemsList(allTags)
			}

			getTags()
		} else {
			setItemsList(tags)
		}
	}, [isEditTags])

	return {
		itemsList,
		toggleTag,
		saveChanges,
		closeEditTagsForm,
		checkIfTagIsSelected,
	}
}

export default useTagList
