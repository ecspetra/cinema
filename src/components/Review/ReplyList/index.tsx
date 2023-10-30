import React, { FC, useEffect, useState } from 'react'
import { IReplyCard } from '../../../../interfaces'
import Button from '@/app/components/UI/Button'
import { repliesListener } from '@/firebase/config'
import ReplyCard from '@/components/Review/ReplyList/ReplyCard'
import { TransitionGroup } from 'react-transition-group'

type PropsType = {
	movieId: number
	userId: string
	reviewId: string
	replies: Array<IReplyCard>
	onReply: (userName: string) => void
}

const ReplyList: FC<PropsType> = ({
	movieId,
	userId,
	reviewId,
	replies,
	onReply,
}) => {
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

	useEffect(() => {
		if (userId) {
			const unsubscribe = repliesListener(
				movieId,
				reviewId,
				replies,
				setItemsToShow
			)

			return () => {
				unsubscribe()
			}
		}
	}, [replies, userId, movieId, reviewId])

	if (!itemsToShow.length) return null

	return (
		<div className='mt-4'>
			{itemsToShow.slice(0, maxReviewsLength).map(item => (
				<ReplyCard
					key={item.id}
					reply={item}
					userId={userId}
					movieId={movieId}
					onReply={onReply}
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

export default ReplyList