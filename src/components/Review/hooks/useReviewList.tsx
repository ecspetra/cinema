import { useAuth } from '@/context/AuthProvider'
import { useEffect, useState } from 'react'
import { IReviewCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { movieOrTVShowReviewsListener } from '@/firebase/handlers/reviewHandlers/movieOrTVShowReviewsListener'
import { collectionRepliesListener } from '@/firebase/handlers/userCollectionHandlers/collectionRepliesListener'
import { collectionReviewsListener } from '@/firebase/handlers/userCollectionHandlers/collectionReviewsListener'

type CollectionInfo = {
	collectionType?: UserCollections.movie | UserCollections.tv
	isCollectionList: boolean
	reviewedItemId?: number
	collectionOwnerId?: string
}

const useReviewList = (
	reviews: IReviewCard[],
	collectionInfo: CollectionInfo,
	scrollToTop: () => void
) => {
	const { userId } = useAuth()
	const initialItemsLength = 3
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState<IReviewCard[]>(reviews)
	const [itemsFromDB, setItemsFromDB] = useState<IReviewCard[]>([])
	const [defaultItems, setDefaultItems] = useState<IReviewCard[]>([])
	const isMoreDataAvailable =
		maxReviewsLength <
		itemsToShow.filter(item => item.id !== undefined).length
	const isShowMoreButton = itemsToShow.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show more' : 'Show less'
	const {
		collectionType,
		isCollectionList,
		reviewedItemId,
		collectionOwnerId,
	} = collectionInfo

	const handleItemsToShowLength = () => {
		if (!isMoreDataAvailable) scrollToTop()

		const newMaxReviewsLength = isMoreDataAvailable
			? Math.min(
					maxReviewsLength + initialItemsLength,
					itemsToShow.length
			  )
			: initialItemsLength

		if (isMoreDataAvailable) {
			setMaxReviewsLength(newMaxReviewsLength)
		} else {
			setTimeout(() => {
				setMaxReviewsLength(newMaxReviewsLength)
			}, 600)
		}
	}

	const defineReviewSrc = () => {
		const itemsFromDB: IReviewCard[] = []
		const defaultItems: IReviewCard[] = []

		reviews.forEach(item => {
			if (item.authorId) {
				itemsFromDB.push(item)
			} else {
				defaultItems.push(item)
			}
		})

		setItemsFromDB(itemsFromDB)
		setDefaultItems(defaultItems)
	}

	useEffect(() => {
		defineReviewSrc()
	}, [reviews])

	useEffect(() => {
		const newItemsToShow = [...itemsFromDB, ...defaultItems]
		setItemsToShow(newItemsToShow)
	}, [itemsFromDB, defaultItems])

	useEffect(() => {
		if (userId) {
			if (isCollectionList) {
				const collectionId = isCollectionList ? userId : reviewedItemId

				const unsubscribe = collectionReviewsListener(
					collectionId!,
					setItemsToShow
				)

				return () => {
					unsubscribe()
				}
			} else {
				const collectionId = isCollectionList ? userId : reviewedItemId

				const unsubscribe = movieOrTVShowReviewsListener(
					collectionId!,
					itemsFromDB,
					setItemsFromDB,
					collectionType
				)

				return () => {
					unsubscribe()
				}
			}
		}
	}, [itemsFromDB, userId])

	useEffect(() => {
		if (userId) {
			if (isCollectionList) {
				const unsubscribe = collectionRepliesListener(
					userId,
					collectionOwnerId!,
					setItemsToShow
				)

				return () => {
					unsubscribe()
				}
			}
		}
	}, [userId])

	return {
		itemsToShow,
		isShowMoreButton,
		buttonText,
		maxReviewsLength,
		handleItemsToShowLength,
	}
}

export default useReviewList
