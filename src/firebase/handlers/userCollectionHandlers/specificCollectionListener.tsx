import { UserCollections } from '@/constants/enum'
import { DataSnapshot, get, onChildRemoved, ref } from 'firebase/database'
import { database } from '@/firebase/config'
import { Dispatch, SetStateAction } from 'react'
import { IItemCard } from '../../../../interfaces'

export const specificCollectionListener = (
	userId: string,
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person,
	oldItems: any[],
	setItems: Dispatch<SetStateAction<IItemCard[]>>,
	setIsMoreDataAvailable: (arg: boolean) => void
) => {
	const specificCollectionPath = `users/${userId}/collection/${collectionType}`
	const specificCollectionRef = ref(database, specificCollectionPath)

	const getAllItemsFromSpecificCollection = () => {
		return new Promise(async resolve => {
			get(specificCollectionRef).then(snapshot => {
				let specificCollectionItems: IItemCard[] = []

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						specificCollectionItems.push(childSnapshot.val())
					})
				}

				resolve(specificCollectionItems)
			})
		})
	}

	const onItemRemoved = async (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		const allItemsFromSpecificCollection =
			(await getAllItemsFromSpecificCollection()) as IItemCard[]
		const totalItemsFromSpecificCollectionLength =
			allItemsFromSpecificCollection.length
		const oldItemsLength = oldItems.length
		const newItems = oldItems.filter(
			existingItem => existingItem.id !== removedItem.id
		)
		setItems(newItems)
		setIsMoreDataAvailable(
			totalItemsFromSpecificCollectionLength > oldItemsLength
		)
	}

	const unsubscribeItemRemoved = onChildRemoved(
		specificCollectionRef,
		onItemRemoved
	)

	return () => {
		unsubscribeItemRemoved()
	}
}
