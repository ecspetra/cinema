import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { IReviewCard, IReviewCardFromDB } from '../../../../interfaces'
import Image from '../../../components/Images/Image'
import defaultUserImage from '../../../app/assets/images/default-user-image.svg'
import Button from '../../../app/components/UI/Button'
import Title from '../../../app/components/UI/Title/Title'
import moment from 'moment'
import classNames from 'classnames'
import { removeReviewItem } from '@/firebase/config'

type PropsType = {
	movieId: number
	userId: string
	review: IReviewCard | IReviewCardFromDB
}

const ReviewsCard: FC<PropsType> = ({ movieId, userId, review }) => {
	const { content, id, author, created_at, avatar_path, authorId } = review
	const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false)
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
		isLongReviewContent && !isReviewOpen && isTruncateReview
	const isCurrentUserReview = userId && isItemFromDB

	const getReviewAuthorDetails = () => {
		if (isItemFromDB) {
		} else {
		}
	}

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

	useEffect(() => {
		if (authorId) {
			setIsItemFromDB(true)
		}
	}, [])

	const handleReviewContent = () => {
		setIsReviewOpen(!isReviewOpen)
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
			<div>
				<div
					style={{ maxHeight: isReviewOpen ? contentHeight : '3rem' }}
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
						{isReviewOpen ? 'Hide' : 'Show more'}
					</Button>
				)}
			</div>
			{isCurrentUserReview && (
				<Button onClick={() => removeReviewItem(id, movieId, userId)}>
					Delete
				</Button>
			)}
		</div>
	)
}

export default ReviewsCard
