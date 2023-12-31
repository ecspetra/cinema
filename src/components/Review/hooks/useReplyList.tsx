import { useEffect, useState } from 'react'
import { IReviewCard } from '../../../../interfaces'
import { repliesListener } from '@/firebase/config'
import { UserCollections } from '@/constants/enum'

type CollectionInfo = {
	collectionType?: UserCollections.movie | UserCollections.tv
	reviewId: string
	reviewedItemId?: number
}

const useReplyList = (
	replies: IReviewCard[],
	collectionInfo: CollectionInfo,
	userId: string
) => {
	const initialItemsLength = 2
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState<IReviewCard[]>([])
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
			const unsubscribe = repliesListener(
				reviewedItemId!,
				reviewId,
				replies,
				setItemsToShow,
				collectionType!
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
