import {FC, useEffect, useState} from 'react'
import {IReview} from "../../../../interfaces"
import Image from "@/components/Image"
import defaultUserImage from "../../../app/assets/images/default-user-image.svg"
import Button from "@/app/components/UI/Button";

type PropsType = {
	review: IReview;
}

const ReviewsCard: FC<PropsType> = ({review}) => {
	const [reviewContent, setReviewContent] = useState<string>('')
	const [isAllReviewContentShown, setIsAllReviewContentShown] = useState<boolean>(review.content.length === reviewContent.length)
	const isLongReviewContent = review.content.length > 300

	const handleReviewContent = () => {
		if (isAllReviewContentShown) {
			setReviewContent(review.content.substring(0, 300).trim() + "... ")
			setIsAllReviewContentShown(false)
		} else {
			setReviewContent(review.content + " ")
			setIsAllReviewContentShown(true)
		}
	}

	const getReviewContent = () => {
		if (isLongReviewContent) {
			setReviewContent(review.content.substring(0, 300).trim() + "... ")
		} else setReviewContent(review.content + " ")
	}

	useEffect(() => {
		getReviewContent()
	}, [])

	return (
		<div className="mb-8">
			<div className="flex">
				<div className="flex items-center">
					<Image className="aspect-square w-10 h-10 mr-3" src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`} defaultImage={defaultUserImage} />
					<div>
						<h3>{review.author}</h3>
						<p>{review.created_at}</p>
					</div>
				</div>
			</div>
			<p className="inline">
				{reviewContent}
				{isLongReviewContent && <Button context="text" onClick={() => handleReviewContent()}>{isAllReviewContentShown ? 'Hide' : 'Show more'}</Button>}
			</p>
		</div>
	)
}

export default ReviewsCard
