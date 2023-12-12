import { useState, useEffect } from 'react'
import { getIsFriend, removeFriend, setNewFriend } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import {
	openLoginModal,
	openRemoveFriendModal,
	showErrorNotification,
	showSuccessNotification,
} from '@/handlers/handleModals'
import { IFriendInfo, IUser } from '../../interfaces'

export const useFriendsCollection = (itemInfo: IFriendInfo['info']) => {
	const [isFriend, setIsFriend] = useState<boolean>(false)
	const [isLoadingFriends, setIsLoadingFriends] = useState<boolean>(true)
	const { showModal, hideModal } = useModal()
	const { isLoggedIn } = useAuth()

	const handleSetNewFriend = () => {
		if (isLoggedIn) {
			setIsLoadingFriends(true)

			setNewFriend(itemInfo?.id)
				.then(() => {
					getIsFriend(itemInfo?.id)
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

	const handleRemoveFriend = (userId: string, modalId: string) => {
		hideModal(modalId)
		setIsLoadingFriends(true)

		setTimeout(() => {
			removeFriend(userId)
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
		}, 500)
	}

	const openConfirmationPopup = (
		userInfo: IUser,
		modalId: string | null = null
	) => {
		if (modalId) {
			hideModal(modalId)
		}

		openRemoveFriendModal(
			showModal,
			hideModal,
			handleRemoveFriend,
			userInfo?.displayName,
			userInfo?.id
		)
	}

	useEffect(() => {
		if (isLoggedIn) {
			setIsLoadingFriends(true)
			getIsFriend(itemInfo?.id)
				.then(data => {
					setIsFriend(data)
					setIsLoadingFriends(false)
				})
				.catch(() => {
					setIsLoadingFriends(false)
				})
		} else setIsLoadingFriends(false)
	}, [isLoggedIn, itemInfo])

	return {
		isLoadingFriends,
		isFriend,
		handleSetNewFriend,
		openConfirmationPopup,
	}
}
