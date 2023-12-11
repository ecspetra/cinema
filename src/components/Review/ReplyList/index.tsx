import React, { FC, useEffect, useState } from 'react'
import { IReviewCard } from '../../../../interfaces'
import Button from '@/app/components/UI/Button'
import { repliesListener } from '@/firebase/config'
import ReplyCard from '@/components/Review/ReplyList/ReplyCard'

type PropsType = {
	movieId: number
	userId: string
	reviewId: string
	replies: IReviewCard[]
	onReply: (userName: string) => void
	isCollectionList?: boolean
}

const ReplyList: FC<PropsType> = ({
	movieId,
	userId,
	reviewId,
	replies,
	onReply,
	isCollectionList = false,
}) => {
	const initialItemsLength = 2
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState<IReviewCard[]>([])
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
		<span className='mt-4 block'>
			{itemsToShow.slice(0, maxReviewsLength).map(item => (
				<ReplyCard
					key={item.id}
					reply={item}
					userId={userId}
					movieId={movieId}
					onReply={onReply}
					isCollectionItem={isCollectionList}
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
		</span>
	)
}

export default ReplyList
