import React, { FC, useEffect, useState } from 'react'
import { IReplyCard } from '../../../../interfaces'
import Button from '@/app/components/UI/Button'
import { reviewsListener } from '@/firebase/config'
import ReplyCard from '@/components/Review/RepliesList/ReplyCard'

type PropsType = {
	movieId: number
	userId: string
	replies: Array<IReplyCard>
}

const ReviewsList: FC<PropsType> = ({ movieId, userId, replies }) => {
	const initialItemsLength = 2
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState<Array<IReplyCard>>([])
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

	useEffect(() => {
		setItemsToShow(replies)
	}, [replies])

	// useEffect(() => {
	// 	if (userId) {
	// 		const unsubscribe = reviewsListener(
	// 			movieId,
	// 			itemsToShow,
	// 			setItemsToShow,
	// 			'replies'
	// 		)
	//
	// 		return () => {
	// 			unsubscribe()
	// 		}
	// 	}
	// }, [itemsToShow, userId])

	return (
		<div className='mt-4'>
			{itemsToShow.slice(0, maxReviewsLength).map(item => (
				<ReplyCard
					key={item.id}
					reply={item}
					userId={userId}
					movieId={movieId}
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
}

export default ReviewsList
