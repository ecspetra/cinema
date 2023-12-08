import { useState, useEffect } from 'react'
import {
	getCollectionItem,
	removeCollectionItem,
	setNewCollectionItem,
} from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import {
	openLoginModal,
	openRemoveModal,
	showErrorNotification,
	showSuccessNotification,
} from '@/handlers/handleModals'
import { IItemCard } from '../../interfaces'

export const useCollectionButton = (
	itemInfo: IItemCard,
	collection: 'movie' | 'tv' | 'person'
) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [isCollectionItem, setIsCollectionItem] = useState<boolean>(false)
	const [isLoadingCollection, setIsLoadingCollection] =
		useState<boolean>(true)
	const { isLoggedIn } = useAuth()
	const { showModal, hideModal } = useModal()

	const handleSetCollectionItem = () => {
		if (isLoggedIn) {
			setIsLoadingCollection(true)

			setNewCollectionItem(itemInfo.id, collection)
				.then(() => {
					getCollectionItem(itemInfo.id, collection)
						.then(data => {
							setIsCollectionItem(data)
							setIsLoadingCollection(false)
							// showSuccessNotification(
							// 	showModal,
							// 	'The item was successfully added'
							// )
						})
						.catch(() => {
							setIsLoadingCollection(false)
							showErrorNotification(
								showModal,
								'An error has occurred'
							)
						})
				})
				.catch(() => {
					setIsLoadingCollection(false)
				})
		} else openLoginModal(showModal)
	}

	const handleRemoveCollectionItem = modalId => {
		hideModal(modalId)
		setIsLoadingCollection(true)
		setIsMounted(false)

		setTimeout(() => {
			removeCollectionItem(itemInfo.id, collection)
				.then(() => {
					setIsCollectionItem(false)
					setIsLoadingCollection(false)
				})
				// .then(() => {
				// 	showSuccessNotification(
				// 		showModal,
				// 		'The item was successfully removed'
				// 	)
				// })
				.catch(() => {
					setIsLoadingCollection(false)
					showErrorNotification(showModal, 'An error has occurred')
				})
		}, 500)
	}

	const openConfirmationPopup = () => {
		const itemName = itemInfo.title ? itemInfo.title : itemInfo.name
		openRemoveModal(
			showModal,
			hideModal,
			handleRemoveCollectionItem,
			itemName
		)
	}

	useEffect(() => {
		if (isLoggedIn) {
			setIsLoadingCollection(true)
			getCollectionItem(itemInfo.id, collection)
				.then(data => {
					setIsCollectionItem(data)
					setIsLoadingCollection(false)
					setIsMounted(true)
				})
				.catch(() => {
					setIsLoadingCollection(false)
				})
		} else setIsLoadingCollection(false)
	}, [isLoggedIn])

	return {
		isMounted,
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	}
}
