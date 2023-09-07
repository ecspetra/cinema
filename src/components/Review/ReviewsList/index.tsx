import React, {FC, useState} from 'react'
import {IReview} from "../../../../interfaces"
import ReviewCard from "@/components/Review/ReviewCard"
import Title from "@/app/components/UI/Title/Title"
import Button from "@/app/components/UI/Button"

type PropsType = {
	reviews: Array<IReview>;
}

const ReviewsList: FC<PropsType> = ({reviews}) => {
	const initialReviewsLength = 3
	const [maxReviewsLength, setMaxReviewsLength] = useState<number>(initialReviewsLength)
	const isAllReviewsShown = reviews.length === maxReviewsLength
	const isShowMoreButton = reviews.length > initialReviewsLength

	const handleReviewsToShow = () => {
		const newMaxReviewsLength = isAllReviewsShown
			? initialReviewsLength
			: Math.min(maxReviewsLength + initialReviewsLength, reviews.length)

		setMaxReviewsLength(newMaxReviewsLength)
	};

	if (!reviews.length) {
		return (
			<div className="mb-16">
				<Title>Reviews</Title>
				<p>No reviews yet</p>
			</div>
		)
	}

	const renderReviews = () => (
		<div>
			{reviews.slice(0, maxReviewsLength).map((item) => (
				<ReviewCard key={item.id} review={item} />
			))}
			{isShowMoreButton && (
				<Button className="mx-auto" context="empty" onClick={handleReviewsToShow}>
					{isAllReviewsShown ? 'Hide' : 'Show more'}
				</Button>
			)}
		</div>
	)

	return (
		<div className="mb-16">
			<Title>Reviews</Title>
			{renderReviews()}
		</div>
	)
}

export default ReviewsList
