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
import { UserCollections } from '@/constants/enum'

export const useCollectionButton = (
	itemInfo: IItemCard,
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
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

			setNewCollectionItem(itemInfo.id, collectionType).then(() => {
				getCollectionItem(itemInfo.id, collectionType)
					.then(data => {
						setIsCollectionItem(data)
						showSuccessNotification(
							showModal,
							'The item was successfully added'
						)
					})
					.catch(() => {
						showErrorNotification(
							showModal,
							'An error has occurred'
						)
					})
					.finally(() => {
						setIsLoadingCollection(false)
					})
			})
		} else openLoginModal(showModal)
	}

	const handleRemoveCollectionItem = (modalId: string) => {
		hideModal(modalId)
		setIsLoadingCollection(true)
		setIsMounted(false)

		setTimeout(() => {
			removeCollectionItem(itemInfo.id, collectionType)
				.then(() => {
					setIsCollectionItem(false)
					showSuccessNotification(
						showModal,
						'The item was successfully removed'
					)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoadingCollection(false)
				})
		}, 500)
	}

	const openConfirmationPopup = () => {
		const itemName = itemInfo.title ?? itemInfo.name ?? 'this item'
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
			getCollectionItem(itemInfo.id, collectionType)
				.then(data => {
					setIsCollectionItem(data)
				})
				.finally(() => {
					setIsLoadingCollection(false)
					setIsMounted(true)
				})
		} else setIsLoadingCollection(false)
	}, [isLoggedIn, itemInfo])

	return {
		isMounted,
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	}
}
