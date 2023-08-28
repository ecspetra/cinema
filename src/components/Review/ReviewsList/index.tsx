import {FC} from 'react'
import {IReview} from "../../../../interfaces"
import ReviewCard from "@/components/Review/ReviewCard";

type PropsType = {
	reviews: Array<IReview>;
}

const ReviewsList: FC<PropsType> = ({reviews}) => {
	return (
		<div className="">
			{reviews.map((item) => {
				return <ReviewCard key={item.id} review={item} />
			})}
		</div>
	)
}

export default ReviewsList
