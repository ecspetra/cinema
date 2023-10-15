import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { IReplyCard } from '../../../../../interfaces'
import Image from '../../../Images/Image'
import defaultUserImage from '../../../../app/assets/images/default-user-image.svg'
import Button from '../../../../app/components/UI/Button'
import Title from '../../../../app/components/UI/Title/Title'
import moment from 'moment'
import classNames from 'classnames'
import { getUserAvatar, removeReviewItem } from '@/firebase/config'
import ReviewActions from '@/components/Review/ReviewsList/ReviewCard/ReviewActions'
import EditReviewForm from '@/components/Review/Form/EditReviewForm'

type PropsType = {
	movieId: number
	userId: string
	reply: IReplyCard
	onReply: (userName: string) => void
}

const ReplyCard: FC<PropsType> = ({ movieId, userId, reply, onReply }) => {
	const { reviewId, content, id, created_at, authorId, replyTo } = reply
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)
	const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
	const [authorInfo, setAuthorInfo] = useState({
		photoURL: '',
		displayName: '',
	})
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
	const isCurrentUserItem = userId === authorId

	const handleReplyContent = () => {
		setIsContentOpen(!isContentOpen)
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
		getUserAvatar(authorId).then(data => {
			setAuthorInfo({
				photoURL: data.photoURL,
				displayName: data.displayName,
			})
		})
	}, [])

	useEffect(() => {
		if (!userId) {
			setIsShowEditForm(false)
		}
	}, [userId])

	return (
		<div className='mb-4 p-4 bg-slate-800'>
			{isCurrentUserItem && (
				<div>
					<Button onClick={() => setIsShowEditForm(true)} />
				</div>
			)}
			<div className='flex mb-2'>
				<div className='flex items-center'>
					<Image
						className='aspect-square !w-10 h-10 mr-3 rounded-md overflow-hidden'
						src={authorInfo.photoURL}
						defaultImage={defaultUserImage}
					/>
					<div>
						<Title variant='h3' className='mb-2'>
							{authorInfo.displayName}
						</Title>
						<p className='text-xs'>{formattedDate}</p>
					</div>
				</div>
			</div>
			<div className='mb-4'>
				{isShowEditForm ? (
					<EditReviewForm
						item={reply}
						movieId={movieId}
						onFormClose={setIsShowEditForm}
						isReply
					/>
				) : (
					<>
						<div
							style={{
								maxHeight: isContentOpen
									? contentHeight
									: '3rem',
							}}
							ref={contentRef}
							className='overflow-hidden transition-[max-height] duration-500'
						>
							<p
								className={classNames(
									isShowTruncateDots && 'line-clamp-2'
								)}
							>
								<span className='mr-1 font-semibold'>{`${replyTo},`}</span>
								{content}
							</p>
						</div>
						{isLongReviewContent && (
							<Button
								context='text'
								onClick={() => handleReplyContent()}
							>
								{isContentOpen ? 'Hide' : 'Show more'}
							</Button>
						)}
						<ReviewActions
							reviewId={id}
							movieId={movieId}
							userId={userId}
							collectionName='replies'
							onReply={() => onReply(authorInfo.displayName)}
						/>
						{isCurrentUserItem && (
							<Button
								onClick={() =>
									removeReviewItem(
										id,
										movieId,
										userId,
										'replies'
									)
								}
							>
								Delete
							</Button>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default ReplyCard
