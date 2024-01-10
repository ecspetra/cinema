import { useEffect, useState } from 'react'
import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { movieOrTVShowRepliesListener } from '@/firebase/handlers/reviewAndReplyHandlers/movieOrTVShowRepliesListener'

type CollectionInfo = {
	collectionType?: UserCollections.movie | UserCollections.tv
	reviewId: string
	reviewedItemId?: number
}

const useReplyList = (
	replies: IReviewItemCard[],
	collectionInfo: CollectionInfo,
	userId: string
) => {
	const initialItemsLength = 2
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState<IReviewItemCard[]>([])
	const isMoreDataAvailable = maxReviewsLength < itemsToShow.length
	const isShowMoreButton = itemsToShow.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show more' : 'Show less'
	const { collectionType, reviewId, reviewedItemId } = collectionInfo

	const handleItemsToShowLength = () => {
		const newMaxReviewsLength = isMoreDataAvailable
			? Math.min(
					maxReviewsLength + initialItemsLength,
					itemsToShow.length
			  )
			: initialItemsLength
		setMaxReviewsLength(newMaxReviewsLength)
	}

	useEffect(() => {
		setItemsToShow(replies)
	}, [replies])

	useEffect(() => {
		if (userId) {
			const replyListConfig = {
				reviewId,
				oldItems: replies,
				setItems: setItemsToShow,
				reviewedItemCollectionType: collectionType!,
			}

			const unsubscribe = movieOrTVShowRepliesListener(
				reviewedItemId!,
				replyListConfig
			)

			return () => {
				unsubscribe()
			}
		}
	}, [replies, userId, reviewedItemId, reviewId])

	return {
		itemsToShow,
		maxReviewsLength,
		isShowMoreButton,
		buttonText,
		handleItemsToShowLength,
	}
}

export default useReplyList
