import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'
import { IReaction } from '../../../../interfaces'

export const getReviewOrReplyReactions = async (
	itemId: string,
	itemConfig: {
		reviewedItemId: number
		collectionType: UserCollections.reviews | UserCollections.replies
		reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	}
) => {
	const { reviewedItemId, collectionType, reviewedItemCollectionType } =
		itemConfig
	const collectionPathForLikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/likes/`
	const collectionPathForDislikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/dislikes/`
	const collectionRefForLikes = ref(database, collectionPathForLikes)
	const collectionRefForDislikes = ref(database, collectionPathForDislikes)

	const getItemLikes = () => {
		return new Promise(async resolve => {
			get(collectionRefForLikes).then(snapshot => {
				let likesList: IReaction[] = []

				snapshot.forEach(childSnapshot => {
					const like = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					likesList.push(like)
				})

				resolve(likesList)
			})
		})
	}

	const getItemDislikes = () => {
		return new Promise(async resolve => {
			get(collectionRefForDislikes).then(snapshot => {
				let dislikesList: IReaction[] = []

				snapshot.forEach(childSnapshot => {
					const dislike = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					dislikesList.push(dislike)
				})

				resolve(dislikesList)
			})
		})
	}

	const likes = await getItemLikes()
	const dislikes = await getItemDislikes()

	return { likes, dislikes }
}
