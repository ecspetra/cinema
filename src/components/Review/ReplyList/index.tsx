import { FC, useEffect, useState } from 'react'
import { IReviewCard } from '../../../../interfaces'
import Button from '@/app/components/UI/Button'
import { repliesListener } from '@/firebase/config'
import ReplyCard from '@/components/Review/ReplyList/ReplyCard'
import { UserCollections } from '@/constants/enum'
import useReplyList from '@/components/Review/hooks/useReplyList'

type PropsType = {
	reviewedItemId: number
	userId: string
	reviewId: string
	replies: IReviewCard[]
	onReply: (userName: string) => void
	collectionType: UserCollections.movie | UserCollections.tv
	isCollectionList?: boolean
}

const ReplyList: FC<PropsType> = ({
	reviewedItemId,
	userId,
	reviewId,
	replies,
	onReply,
	collectionType,
	isCollectionList = false,
}) => {
	const collectionInfo = { collectionType, reviewedItemId, reviewId }

	const {
		itemsToShow,
		maxReviewsLength,
		isShowMoreButton,
		buttonText,
		handleItemsToShowLength,
	} = useReplyList(replies, collectionInfo, userId)

	if (!itemsToShow.length) return null

	return (
		<span className='mt-4 block'>
			{itemsToShow.slice(0, maxReviewsLength).map(item => (
				<ReplyCard
					key={item.id}
					reply={item}
					userId={userId}
					reviewedItemId={reviewedItemId}
					onReply={onReply}
					isCollectionItem={isCollectionList}
					collectionType={collectionType}
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
