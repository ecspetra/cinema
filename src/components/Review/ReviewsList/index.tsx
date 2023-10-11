import React, { FC, useEffect, useState } from 'react'
import { IReviewCard, IReviewCardFromDB } from '../../../../interfaces'
import ReviewCard from '@/components/Review/ReviewCard'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { getDBReviewsList, reviewsListener } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Loader from '@/components/Loader'

type PropsType = {
	reviews: Array<IReviewCard | IReviewCardFromDB>
}

const ReviewsList: FC<PropsType> = ({ reviews }) => {
	const { currentUser } = useAuth()
	const userId = currentUser?.uid
	const initialItemsLength = 3
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState(reviews)
	const [itemsFromDB, setItemsFromDB] = useState([])
	const isMoreDataAvailable = itemsToShow.length > initialItemsLength
	const isShowMoreButton = reviews.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show more' : 'Show less'

	const getReviews = () => {
		setIsLoading(true)
		const newMaxReviewsLength = isMoreDataAvailable
			? Math.min(maxReviewsLength + initialItemsLength, reviews.length)
			: initialItemsLength

		setMaxReviewsLength(newMaxReviewsLength)
		setIsLoading(false)
	}

	// useEffect(() => {
	// 	if (userId) {
	// 		const unsubscribe = reviewsListener(
	// 			userId,
	// 			'reviews',
	// 			itemsFromDB,
	// 			setItemsToShow,
	// 			setIsShowMoreButton
	// 		)
	//
	// 		return () => {
	// 			unsubscribe()
	// 		}
	// 	}
	// }, [itemsToShow])

	console.log(itemsToShow)

	useEffect(() => {
		if (userId) {
			itemsToShow.map(item => {
				if (!item.author) {
					setItemsFromDB(prevState => [...prevState, item])
				}
			})
		}
	}, [itemsToShow])

	if (!reviews.length) {
		return (
			<div className='mb-16'>
				<Title>Reviews</Title>
				<p>No reviews yet</p>
			</div>
		)
	}

	const renderReviews = () => (
		<div>
			{itemsToShow.slice(0, maxReviewsLength).map(item => (
				<ReviewCard key={item.id} review={item} />
			))}
			{isLoading && <Loader type='static' />}
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={getReviews}
				>
					{buttonText}
				</Button>
			)}
		</div>
	)

	return (
		<div className='mb-16'>
			<Title>Reviews</Title>
			{renderReviews()}
		</div>
	)
}

export default ReviewsList
