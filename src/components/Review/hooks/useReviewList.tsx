import { useAuth } from '@/context/AuthProvider'
import { useEffect, useState } from 'react'
import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { movieOrTVShowReviewsListener } from '@/firebase/handlers/reviewAndReplyHandlers/movieOrTVShowReviewsListener'
import { collectionRepliesListener } from '@/firebase/handlers/userCollectionHandlers/collectionRepliesListener'
import { collectionReviewsListener } from '@/firebase/handlers/userCollectionHandlers/collectionReviewsListener'

type CollectionInfo = {
	collectionType?: UserCollections.movie | UserCollections.tv
	isCollectionList: boolean
	reviewedItemId?: number
	collectionOwnerId?: string
}

const useReviewList = (
	reviews: IReviewItemCard[],
	collectionInfo: CollectionInfo,
	scrollToTop: () => void
) => {
	const { userId } = useAuth()
	const initialItemsLength = 3
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState<IReviewItemCard[]>(reviews)
	const [itemsFromStorage, setitemsFromStorage] = useState<IReviewItemCard[]>(
		[]
	)
	const [defaultItems, setDefaultItems] = useState<IReviewItemCard[]>([])
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
		const itemsFromStorage: IReviewItemCard[] = []
		const defaultItems: IReviewItemCard[] = []

		reviews.forEach(item => {
			if (item.authorId) {
				itemsFromStorage.push(item)
			} else {
				defaultItems.push(item)
			}
		})

		setitemsFromStorage(itemsFromStorage)
		setDefaultItems(defaultItems)
	}

	useEffect(() => {
		defineReviewSrc()
	}, [reviews])

	useEffect(() => {
		const newItemsToShow = [...itemsFromStorage, ...defaultItems]
		setItemsToShow(newItemsToShow)
	}, [itemsFromStorage, defaultItems])

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
				const reviewListConfig = {
					oldItems: itemsFromStorage,
					setItems: setitemsFromStorage,
					reviewedItemCollectionType: collectionType,
				}

				const unsubscribe = movieOrTVShowReviewsListener(
					collectionId!,
					reviewListConfig
				)

				return () => {
					unsubscribe()
				}
			}
		}
	}, [itemsFromStorage, userId])

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
