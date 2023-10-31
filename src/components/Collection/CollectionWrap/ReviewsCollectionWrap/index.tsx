import React, { FC } from 'react'
import { IReviewCardFromDB } from '../../../../../interfaces'
import { useAuth } from '@/context/AuthProvider'
import ReviewList from '@/components/Review/ReviewList'

type PropsType = {
	items: Array<IReviewCardFromDB>
}

const ReviewsCollectionWrap: FC<PropsType> = ({ items }) => {
	const { userId } = useAuth()

	return <ReviewList reviews={items} isShowTitle={false} isCollectionList />
}

export default ReviewsCollectionWrap
