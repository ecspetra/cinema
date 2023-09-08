import {FC, useState, useRef, useEffect, useMemo} from 'react'
import {IReview} from "../../../../interfaces"
import Image from "../../../components/Images/Image"
import defaultUserImage from "../../../app/assets/images/default-user-image.svg"
import Button from "../../../app/components/UI/Button"
import Title from "../../../app/components/UI/Title/Title"
import moment from "moment"
import classNames from "classnames"

type PropsType = {
	review: IReview;
}

const ReviewsCard: FC<PropsType> = ({review}) => {
	const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false)
	const [isTruncateReview, setIsTruncateReview] = useState<boolean>(false)
	const [contentHeight, setContentHeight] = useState<number>(0)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const isLongReviewContent = useMemo(() => review.content.length > 400, [review.content])
	const formattedDate = useMemo(() => moment(review.created_at).format('MMM Do YY'), [review.created_at])
	const isShowTruncateDots = isLongReviewContent && !isReviewOpen && isTruncateReview

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current!.scrollHeight)
		}

		if (!isReviewOpen) {
			setTimeout(() => {
				setIsTruncateReview(true)
			}, 500)
		} else setIsTruncateReview(false)
	}, [isReviewOpen])

	const handleReviewContent = () => {
		setIsReviewOpen(!isReviewOpen)
	}

	return (
		<div className="mb-8 pb-4 px-4 border-b border-l border-slate-800">
			<div className="flex mb-2">
				<div className="flex items-center">
					<Image className="aspect-square !w-10 h-10 mr-3 rounded-md overflow-hidden" src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`} defaultImage={defaultUserImage} />
					<div>
						<Title variant="h3" className="mb-2">{review.author}</Title>
						<p className="text-xs">{formattedDate}</p>
					</div>
				</div>
			</div>
			<div>
				<div
					style={{ maxHeight: isReviewOpen ? contentHeight : '3rem' }}
					ref={contentRef}
					className="overflow-hidden transition-[max-height] duration-500"
				>
					<p className={classNames(isShowTruncateDots && 'line-clamp-2')}>{review.content}</p>
				</div>
				{isLongReviewContent && <Button context="text" onClick={() => handleReviewContent()}>{isReviewOpen ? 'Hide' : 'Show more'}</Button>}
			</div>
		</div>
	);
}

export default ReviewsCard
