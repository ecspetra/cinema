import { IReviewCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import {
	DataSnapshot,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'

export const movieOrTVShowRepliesListener = (
	reviewedItemId: number,
	reviewId: string,
	loadedItems: IReviewCard[],
	setItems: ([]) => void,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const repliesRef = ref(
		database,
		`${reviewedItemCollectionType}/${reviewedItemId}/replies/`
	)

	const onReplyAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (
			!loadedItems.some(existingItem => existingItem.id === newItem.id) &&
			newItem.reviewId === reviewId
		) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onReplyRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReplyChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReplyAdded = onChildAdded(repliesRef, onReplyAdded)
	const unsubscribeReplyRemoved = onChildRemoved(repliesRef, onReplyRemoved)
	const unsubscribeReplyChanged = onChildChanged(repliesRef, onReplyChanged)

	return () => {
		unsubscribeReplyAdded()
		unsubscribeReplyRemoved()
		unsubscribeReplyChanged()
	}
}
