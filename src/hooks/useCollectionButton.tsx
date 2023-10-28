import { useState, useEffect } from 'react'
import {
	getCollectionItem,
	removeCollectionItem,
	setNewCollectionItem,
} from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import { openLoginModal } from '@/handlers/openLoginModal'
import { IMovieCard, IPersonCard } from '../../interfaces'

export const useCollectionButton = (
	itemInfo: IMovieCard | IPersonCard,
	collection: 'movies' | 'persons'
) => {
	const [isCollectionItem, setIsCollectionItem] = useState<boolean>(false)
	const [isLoadingCollection, setIsLoadingCollection] =
		useState<boolean>(true)
	const { userId, isLoggedIn } = useAuth()
	const { showModal } = useModal()

	const handleSetCollectionItem = (item: IMovieCard | IPersonCard) => {
		if (isLoggedIn) {
			setIsLoadingCollection(true)
			let newItem: IMovieCard | IPersonCard = {}

			if (collection === 'movies') {
				newItem = {
					id: item.id,
					poster_path: item.poster_path,
					release_date: item.release_date,
					title: item.title,
					genres: item.genres,
				}
			} else {
				newItem = {
					id: item.id,
					profile_path: item.profile_path,
					name: item.name,
				}
			}

			setNewCollectionItem(newItem, userId, collection)
				.then(() => {
					getCollectionItem(itemInfo.id, userId, collection)
						.then(data => {
							setIsCollectionItem(data)
							setIsLoadingCollection(false)
						})
						.catch(() => {
							setIsLoadingCollection(false)
						})
				})
				.catch(() => {
					setIsLoadingCollection(false)
				})
		} else openLoginModal(showModal)
	}

	const handleRemoveCollectionItem = (itemId: number, userId: string) => {
		setIsLoadingCollection(true)
		removeCollectionItem(itemId, userId, collection)
			.then(() => {
				setIsCollectionItem(false)
				setIsLoadingCollection(false)
			})
			.catch(() => {
				setIsLoadingCollection(false)
			})
	}

	useEffect(() => {
		if (isLoggedIn) {
			setIsLoadingCollection(true)
			getCollectionItem(itemInfo.id, userId, collection)
				.then(data => {
					setIsCollectionItem(data)
					setIsLoadingCollection(false)
				})
				.catch(() => {
					setIsLoadingCollection(false)
				})
		} else setIsLoadingCollection(false)
	}, [isLoggedIn])

	return {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		handleRemoveCollectionItem,
	}
}
