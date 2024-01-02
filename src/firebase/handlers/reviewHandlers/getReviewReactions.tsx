import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getReviewReactions = async (
	itemId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const likesCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/likes/`
	const dislikesCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/dislikes/`
	const likesCollectionRef = ref(database, likesCollectionPath)
	const dislikesCollectionRef = ref(database, dislikesCollectionPath)

	const getItemLikes = () => {
		return new Promise(async resolve => {
			get(likesCollectionRef).then(snapshot => {
				let response = []

				snapshot.forEach(childSnapshot => {
					const like = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					response.push(like)
				})

				resolve(response)
			})
		})
	}

	const getItemDislikes = () => {
		return new Promise(async resolve => {
			get(dislikesCollectionRef).then(snapshot => {
				let response = []

				snapshot.forEach(childSnapshot => {
					const dislike = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					response.push(dislike)
				})

				resolve(response)
			})
		})
	}

	const likes = await getItemLikes()
	const dislikes = await getItemDislikes()

	return { likes, dislikes }
}
