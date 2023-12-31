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
	isShowTitle?: boolean
}

const ReviewList: FC<PropsType> = ({
	reviews,
	collectionType,
	reviewedItemId,
	isCollectionList = false,
	className,
	isShowTitle = true,
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
	console.log(itemsToShow)

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
		<div ref={listRef} className={classNames('mb-16', className)}>
			{isShowTitle && <Title>Reviews</Title>}
			<div>
				{itemsToShow
					.filter(item => item.id !== undefined)
					.slice(0, maxReviewsLength)
					.map(item => (
						<ReviewCard
							key={item.id}
							review={item}
							collectionType={
								collectionType! ??
								item.reviewedItemCollectionType!
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
