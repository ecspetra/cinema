import React, { FC, useEffect, useState } from 'react'
import { IReviewCard, IReviewCardFromDB } from '../../../../interfaces'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { reviewsListener } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import ReviewCard from '@/components/Review/ReviewsList/ReviewCard'

type PropsType = {
	movieId: number
	reviews: Array<IReviewCard | IReviewCardFromDB>
}

const ReviewsList: FC<PropsType> = ({ movieId, reviews }) => {
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
		reviews.map(item => {
			if (item.authorId) {
				setItemsFromDB(prevState => [...prevState, item])
			} else {
				setDefaultItems(prevState => [...prevState, item])
			}
		})
	}

	useEffect(() => {
		if (userId) {
			setItemsToShow([...itemsFromDB, ...defaultItems])
		}
	}, [itemsFromDB, defaultItems, userId])

	useEffect(() => {
		if (userId) {
			const unsubscribe = reviewsListener(
				movieId,
				itemsFromDB,
				setItemsFromDB
			)

			return () => {
				unsubscribe()
			}
		}
	}, [itemsToShow, userId])

	useEffect(() => {
		if (userId) {
			defineReviewSrc()
		}
	}, [userId])

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
				<ReviewCard
					key={item.id}
					review={item}
					movieId={movieId}
					userId={userId}
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
	)

	return (
		<div className='mb-16'>
			<Title>Reviews</Title>
			{renderReviews()}
		</div>
	)
}

export default ReviewsList
