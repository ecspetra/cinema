import { UserCollections } from '@/constants/enum'
import { DataSnapshot, ref } from 'firebase/database'
import { onValue } from '@firebase/database'
import { database } from '@/firebase/config'
import { Dispatch, SetStateAction } from 'react'
import { IAllReactions, IReaction } from '../../../../interfaces'

export const reviewOrReplyReactionsListener = (
	reviewId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	setItems: Dispatch<SetStateAction<IAllReactions>>,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForLikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/likes`
	const collectionPathForDislikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/dislikes`
	const collectionRefForLikes = ref(database, collectionPathForLikes)
	const collectionRefForDislikes = ref(database, collectionPathForDislikes)

	const likesList: IReaction[] = []
	const dislikesList: IReaction[] = []

	const unsubscribeLikes = onValue(
		collectionRefForLikes,
		(snapshot: DataSnapshot) => {
			likesList.length = 0
			snapshot.forEach(childSnapshot => {
				likesList.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: likesList,
				dislikes: prevState.dislikes,
			}))
		}
	)

	const unsubscribeDislikes = onValue(
		collectionRefForDislikes,
		(snapshot: DataSnapshot) => {
			dislikesList.length = 0
			snapshot.forEach(childSnapshot => {
				dislikesList.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: prevState.likes,
				dislikes: dislikesList,
			}))
		}
	)

	return () => {
		unsubscribeLikes()
		unsubscribeDislikes()
	}
}
