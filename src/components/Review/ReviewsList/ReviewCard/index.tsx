import { FC, useEffect, useMemo, useRef, useState } from 'react'
import {
	IReplyCard,
	IReviewCard,
	IReviewCardFromDB,
} from '../../../../../interfaces'
import Image from '../../../Images/Image'
import defaultUserImage from '../../../../app/assets/images/default-user-image.svg'
import Button from '../../../../app/components/UI/Button'
import Title from '../../../../app/components/UI/Title/Title'
import moment from 'moment'
import classNames from 'classnames'
import { getDBReviewsList, removeReviewItem } from '@/firebase/config'
import ReviewActions from '@/components/Review/ReviewsList/ReviewCard/ReviewActions'
import NewReviewForm from '@/components/Review/NewReviewForm'
import RepliesList from '@/components/Review/RepliesList'

type PropsType = {
	movieId: number
	userId: string
	review: IReviewCard | IReviewCardFromDB
}

const ReviewsCard: FC<PropsType> = ({ movieId, userId, review }) => {
	const { content, id, author, created_at, avatar_path, authorId } = review
	const [replies, setReplies] = useState<Array<IReplyCard>>([])
	const [isShowReplyForm, setIsShowReplyForm] = useState<boolean>(false)
	const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
	const [isItemFromDB, setIsItemFromDB] = useState<boolean>(false)
	const [isTruncateReview, setIsTruncateReview] = useState<boolean>(false)
	const [contentHeight, setContentHeight] = useState<number>(0)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const isLongReviewContent = useMemo(() => content.length > 400, [content])
	const formattedDate = useMemo(
		() => moment(created_at).format('MMM Do YY'),
		[created_at]
	)
	const isShowTruncateDots =
		isLongReviewContent && !isContentOpen && isTruncateReview
	const isCurrentUserItem = userId && isItemFromDB

	const getAuthorDetails = () => {
		if (isItemFromDB) {
		} else {
		}
	}

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current!.scrollHeight)
		}

		if (!isContentOpen) {
			setTimeout(() => {
				setIsTruncateReview(true)
			}, 500)
		} else setIsTruncateReview(false)
	}, [isContentOpen])

	useEffect(() => {
		if (authorId) {
			setIsItemFromDB(true)
		}

		getDBReviewsList(movieId, 'replies').then(data => {
			setReplies(data)
		})
	}, [])

	const handleReviewContent = () => {
		setIsContentOpen(!isContentOpen)
	}

	return (
		<div className='mb-4 p-4 bg-slate-900'>
			<div className='flex mb-2'>
				<div className='flex items-center'>
					<Image
						className='aspect-square !w-10 h-10 mr-3 rounded-md overflow-hidden'
						src={`https://image.tmdb.org/t/p/original${avatar_path}`}
						defaultImage={defaultUserImage}
					/>
					<div>
						<Title variant='h3' className='mb-2'>
							{author}
						</Title>
						<p className='text-xs'>{formattedDate}</p>
					</div>
				</div>
			</div>
			<div className='mb-4'>
				<div
					style={{
						maxHeight: isContentOpen ? contentHeight : '3rem',
					}}
					ref={contentRef}
					className='overflow-hidden transition-[max-height] duration-500'
				>
					<p
						className={classNames(
							isShowTruncateDots && 'line-clamp-2'
						)}
					>
						{content}
					</p>
				</div>
				{isLongReviewContent && (
					<Button
						context='text'
						onClick={() => handleReviewContent()}
					>
						{isContentOpen ? 'Hide' : 'Show more'}
					</Button>
				)}
			</div>
			<ReviewActions
				reviewId={id}
				movieId={movieId}
				userId={userId}
				onReply={setIsShowReplyForm}
			/>
			{isCurrentUserItem && (
				<Button onClick={() => removeReviewItem(id, movieId, userId)}>
					Delete
				</Button>
			)}
			{replies && <RepliesList replies={replies} />}
			{isShowReplyForm && (
				<NewReviewForm
					movieId={movieId}
					userId={userId}
					reviewId={id}
					onClose={setIsShowReplyForm}
					isReply
				/>
			)}
		</div>
	)
}

export default ReviewsCard
