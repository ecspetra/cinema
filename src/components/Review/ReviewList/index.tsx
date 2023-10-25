import React, { FC, useEffect, useState } from 'react'
import { IReviewCard, IReviewCardFromDB } from '../../../../interfaces'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import {
	collectionRepliesListener,
	repliesListener,
	reviewsListener,
} from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import ReviewCard from '@/components/Review/ReviewList/ReviewCard'
import EmptyList from '@/components/List/EmptyList'

type PropsType = {
	reviews: Array<IReviewCard | IReviewCardFromDB>
	movieId?: number
	isCollectionList?: boolean
	isShowTitle?: boolean
}

const ReviewList: FC<PropsType> = ({
	reviews,
	movieId,
	isCollectionList = false,
	isShowTitle = true,
}) => {
	const { currentUser } = useAuth()
	const userId = currentUser?.uid
	const initialItemsLength = 3
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState(reviews)
	const [itemsFromDB, setItemsFromDB] = useState([])
	const [defaultItems, setDefaultItems] = useState([])
	const isMoreDataAvailable = maxReviewsLength < itemsToShow.length
	const isShowMoreButton = itemsToShow.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show more' : 'Show less'

	const handleItemsToShowLength = () => {
		const newMaxReviewsLength = isMoreDataAvailable
			? Math.min(
					maxReviewsLength + initialItemsLength,
					itemsToShow.length
			  )
			: initialItemsLength
		setMaxReviewsLength(newMaxReviewsLength)
	}

	const defineReviewSrc = () => {
		const itemsFromDB = []
		const defaultItems = []

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
			const unsubscribe = reviewsListener(
				isCollectionList ? userId : movieId,
				itemsFromDB,
				setItemsFromDB,
				isCollectionList ? 'users' : 'movies'
			)

			return () => {
				unsubscribe()
			}
		}
	}, [itemsFromDB, userId])

	useEffect(() => {
		if (isCollectionList) {
			const unsubscribe = collectionRepliesListener(
				userId,
				setItemsToShow
			)

			return () => {
				unsubscribe()
			}
		}
	}, [userId])

	if (!itemsToShow.length) {
		return (
			<EmptyList
				title='Reviews'
				text={
					isCollectionList
						? `This collection is empty. Please add some items in this collection before you can see it here`
						: undefined
				}
			/>
		)
	}

	return (
		<div className='mb-16'>
			{isShowTitle && <Title>Reviews</Title>}
			<div>
				{itemsToShow.slice(0, maxReviewsLength).map(item => (
					<ReviewCard
						key={item.id}
						review={item}
						defaultCardMovieId={movieId}
						isLinkToMovie={isCollectionList}
					/>
				))}
				{isShowMoreButton && (
					<Button
						className='mx-auto'
						context='empty'
						onClick={handleItemsToShowLength}
					>
						{buttonText}
					</Button>
				)}
			</div>
		</div>
	)
}

export default ReviewList
