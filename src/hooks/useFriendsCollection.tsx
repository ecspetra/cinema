import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import {
	openLoginModal,
	openRemoveFriendModal,
	showErrorNotification,
	showSuccessNotification,
} from '@/handlers/handleModals'
import { IFullUserInfo, IUser } from '../../interfaces'
import { createNewFriend } from '@/firebase/handlers/friendHandlers/createNewFriend'
import { removeFriend } from '@/firebase/handlers/friendHandlers/removeFriend'
import { checkIfUserExistsInFriendsCollection } from '@/firebase/handlers/friendHandlers/checkIfUserExistsInFriendsCollection'

export const useFriendsCollection = (
	userInfo: IFullUserInfo['info'] | null
) => {
	const [isFriend, setIsFriend] = useState<boolean>(false)
	const [isLoadingFriends, setIsLoadingFriends] = useState<boolean>(true)
	const { showModal, hideModal } = useModal()
	const { isLoggedIn } = useAuth()
	const userId = userInfo?.id

	const handleSetNewFriend = () => {
		if (isLoggedIn) {
			setIsLoadingFriends(true)

			if (userId) {
				createNewFriend(userInfo?.id).then(() => {
					checkIfUserExistsInFriendsCollection(userInfo?.id)
						.then(data => {
							setIsFriend(data)
							showSuccessNotification(
								showModal,
								'User added as friend'
							)
						})
						.catch(() => {
							showErrorNotification(
								showModal,
								'An error has occurred'
							)
						})
						.finally(() => {
							setIsLoadingFriends(false)
						})
				})
			}
		} else openLoginModal(showModal)
	}

	const handleRemoveFriend = (userId: string, modalId: string) => {
		hideModal(modalId)
		setIsLoadingFriends(true)

		setTimeout(() => {
			removeFriend(userId)
				.then(() => {
					setIsFriend(false)
				})
				.then(() => {
					showSuccessNotification(
						showModal,
						'User was removed from friends'
					)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoadingFriends(false)
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

			if (userId) {
				checkIfUserExistsInFriendsCollection(userInfo?.id)
					.then(data => {
						setIsFriend(data)
					})
					.finally(() => {
						setIsLoadingFriends(false)
					})
			}
		} else setIsLoadingFriends(false)
	}, [isLoggedIn, userInfo])

	return {
		isLoadingFriends,
		isFriend,
		handleSetNewFriend,
		openConfirmationPopup,
	}
}
