import { UserCollections } from '@/constants/enum'
import { DataSnapshot, ref } from 'firebase/database'
import { onValue } from '@firebase/database'
import { database } from '@/firebase/config'

export const reviewOrReplyReactionsListener = (
	reviewId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	setItems: ({ likes: [], dislikes: [] }) => void,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const likesCollectionRef = ref(
		database,
		`reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/likes`
	)
	const dislikesCollectionRef = ref(
		database,
		`reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/dislikes`
	)

	const likes = []
	const dislikes = []

	const unsubscribeLikes = onValue(
		likesCollectionRef,
		(snapshot: DataSnapshot) => {
			likes.length = 0
			snapshot.forEach(childSnapshot => {
				likes.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: likes,
				dislikes: prevState.dislikes,
			}))
		}
	)

	const unsubscribeDislikes = onValue(
		dislikesCollectionRef,
		(snapshot: DataSnapshot) => {
			dislikes.length = 0
			snapshot.forEach(childSnapshot => {
				dislikes.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: prevState.likes,
				dislikes: dislikes,
			}))
		}
	)

	return () => {
		unsubscribeLikes()
		unsubscribeDislikes()
	}
}
