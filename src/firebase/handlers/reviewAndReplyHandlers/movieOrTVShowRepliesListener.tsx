import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import {
	DataSnapshot,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'
import { Dispatch, SetStateAction } from 'react'

export const movieOrTVShowRepliesListener = (
	reviewedItemId: number,
	replyListConfig: {
		reviewId: string
		oldItems: IReviewItemCard[]
		setItems: Dispatch<SetStateAction<IReviewItemCard[]>>
		reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	}
) => {
	const { reviewId, oldItems, setItems, reviewedItemCollectionType } =
		replyListConfig
	const collectionPathForReplies = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`
	const collectionRefForReplies = ref(database, collectionPathForReplies)

	const onReplyAdded = (childSnapshot: DataSnapshot) => {
		const newReply = childSnapshot.val()
		if (
			!oldItems.some(existingItem => existingItem.id === newReply.id) &&
			newReply.reviewId === reviewId
		) {
			setItems(prevItems => [newReply, ...prevItems])
		}
	}

	const onReplyRemoved = (childSnapshot: DataSnapshot) => {
		const removedReply = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedReply.id)
		)
	}

	const onReplyChanged = (childSnapshot: DataSnapshot) => {
		const updatedReply = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedReply.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedReply
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReplyAdded = onChildAdded(
		collectionRefForReplies,
		onReplyAdded
	)
	const unsubscribeReplyRemoved = onChildRemoved(
		collectionRefForReplies,
		onReplyRemoved
	)
	const unsubscribeReplyChanged = onChildChanged(
		collectionRefForReplies,
		onReplyChanged
	)

	return () => {
		unsubscribeReplyAdded()
		unsubscribeReplyRemoved()
		unsubscribeReplyChanged()
	}
}
