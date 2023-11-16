import { useState, useEffect } from 'react'
import {
	getCollectionItem,
	getFriend,
	removeCollectionItem,
	removeFriend,
	setNewCollectionItem,
	setNewFriend,
} from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import {
	openLoginModal,
	openRemoveModal,
	showErrorNotification,
	showSuccessNotification,
} from '@/handlers/handleModals'
import { IMovieCard, IPersonCard, ITVShowCard } from '../../interfaces'

export const useFriendsCollection = (itemInfo: object) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [isFriend, setIsFriend] = useState<boolean>(false)
	const [isLoadingFriends, setIsLoadingFriends] = useState<boolean>(true)
	const { showModal, hideModal } = useModal()
	const { isLoggedIn } = useAuth()

	const handleSetNewFriend = () => {
		if (isLoggedIn) {
			setIsLoadingFriends(true)

			setNewFriend(itemInfo?.id)
				.then(() => {
					getFriend(itemInfo?.id)
						.then(data => {
							setIsFriend(data)
							setIsLoadingFriends(false)
							showSuccessNotification(
								showModal,
								'User added as friend'
							)
						})
						.catch(() => {
							setIsLoadingFriends(false)
							showErrorNotification(
								showModal,
								'An error has occurred'
							)
						})
				})
				.catch(() => {
					setIsLoadingFriends(false)
				})
		} else openLoginModal(showModal)
	}

	const handleRemoveFriend = modalId => {
		hideModal(modalId)
		setIsLoadingFriends(true)
		setIsMounted(false)

		removeFriend(itemInfo?.id)
			.then(() => {
				setIsFriend(false)
				setIsLoadingFriends(false)
			})
			.then(() => {
				showSuccessNotification(
					showModal,
					'User was removed from friends'
				)
			})
			.catch(() => {
				setIsLoadingFriends(false)
				showErrorNotification(showModal, 'An error has occurred')
			})
	}

	const openConfirmationPopup = () => {
		openRemoveModal(
			showModal,
			hideModal,
			handleRemoveFriend,
			itemInfo?.displayName
		)
	}

	useEffect(() => {
		if (isLoggedIn) {
			setIsLoadingFriends(true)
			getFriend(itemInfo?.id)
				.then(data => {
					setIsFriend(data)
					setIsLoadingFriends(false)
					setIsMounted(true)
				})
				.catch(() => {
					setIsLoadingFriends(false)
				})
		} else setIsLoadingFriends(false)
	}, [isLoggedIn, itemInfo])

	return {
		isMounted,
		isLoadingFriends,
		isFriend,
		handleSetNewFriend,
		openConfirmationPopup,
	}
}
