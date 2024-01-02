import { UserCollections } from '@/constants/enum'
import { DataSnapshot, get, onChildRemoved, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const specificCollectionListener = (
	userId: string,
	collectionType: UserCollections,
	loadedItems: any[],
	setItems: ([]) => void,
	setIsMoreDataAvailable: (arg: boolean) => void
) => {
	const collectionRef = ref(
		database,
		`users/${userId}/collection/${collectionType}`
	)

	const getAllItemsFromCurrentCollection = () => {
		return new Promise(async resolve => {
			get(collectionRef).then(snapshot => {
				let items = []

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						items.push(childSnapshot.val())
					})
				}

				resolve(items)
			})
		})
	}

	const onItemRemoved = async (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		const allItemsFromCurrentCollection =
			await getAllItemsFromCurrentCollection()
		const totalItemsLength = allItemsFromCurrentCollection.length
		const loadedItemsLength = loadedItems.length
		const newItems = loadedItems.filter(
			existingItem => existingItem.id !== removedItem.id
		)
		setItems(newItems)
		setIsMoreDataAvailable(totalItemsLength > loadedItemsLength)
	}

	const unsubscribe = onChildRemoved(collectionRef, onItemRemoved)

	return () => {
		unsubscribe()
	}
}
