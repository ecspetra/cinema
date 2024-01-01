import { FC, useEffect, useState } from 'react'
import { IReviewCard } from '../../../../interfaces'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import {
	collectionRepliesListener,
	collectionReviewsListener,
	reviewsListener,
} from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import ReviewCard from '@/components/Review/ReviewList/ReviewCard'
import EmptyList from '@/components/List/EmptyList'
import useScrollToTop from '@/hooks/useScrollToTop'
import classNames from 'classnames'
import { UserCollections } from '@/constants/enum'
import useReviewList from '@/components/Review/hooks/useReviewList'

type PropsType = {
	reviews: IReviewCard[]
	collectionType?: UserCollections.movie | UserCollections.tv
	reviewedItemId?: number
	isCollectionList?: boolean
	className?: string
}

const ReviewList: FC<PropsType> = ({
	reviews,
	collectionType,
	reviewedItemId,
	isCollectionList = false,
	className,
}) => {
	const { listRef, scrollToTop } = useScrollToTop(100)

	const collectionInfo = { collectionType, isCollectionList, reviewedItemId }
	const {
		itemsToShow,
		isShowMoreButton,
		buttonText,
		maxReviewsLength,
		handleItemsToShowLength,
	} = useReviewList(reviews, collectionInfo, scrollToTop)

	if (!itemsToShow.length) {
		return (
			<EmptyList
				title='Reviews'
				text={
					isCollectionList
						? 'Please write a review before you can see it here'
						: undefined
				}
				className={
					isCollectionList
						? 'border border-gray-500 !mb-4 -my-12 p-4 last:mb-0'
						: undefined
				}
			/>
		)
	}

	return (
		<div ref={listRef} className={classNames('mb-16', className)}>
			<Title>Reviews</Title>
			<div>
				{itemsToShow.slice(0, maxReviewsLength).map(item => (
					<ReviewCard
						key={item.id}
						review={item}
						collectionType={
							collectionType! ?? item.reviewedItemCollectionType!
						}
						defaultCardReviewedId={reviewedItemId}
						isLinkToMovie={isCollectionList}
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
			</div>
		</div>
	)
}

export default ReviewList
