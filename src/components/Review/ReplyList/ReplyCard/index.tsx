import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { IReplyCard } from '../../../../../interfaces'
import Button from '../../../../app/components/UI/Button'
import moment from 'moment'
import classNames from 'classnames'
import { getUserInfo, removeReviewItem } from '@/firebase/config'
import ReviewActions from '@/components/Review/ReviewList/ReviewCard/ReviewActions'
import EditReviewForm from '@/components/Review/Form/EditReviewForm'
import Dropdown from '@/app/components/UI/Dropdown'
import DropdownItem from '@/app/components/UI/Dropdown/DropdownItem'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'

type PropsType = {
	movieId: number
	userId: string
	reply: IReplyCard
	onReply: (userName: string) => void
	isCollectionItem?: boolean
}

const ReplyCard: FC<PropsType> = ({
	movieId,
	userId,
	reply,
	onReply,
	isCollectionItem,
}) => {
	const { content, id, created_at, authorId, replyTo } = reply
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)
	const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
	const [authorInfo, setAuthorInfo] = useState({
		userId: '',
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
		getUserInfo(authorId)
			.then(data => {
				setAuthorInfo({
					userId: data.info.id,
					photoURL: data.info.photoURL,
					displayName: data.info.displayName,
				})
			})
			.then(() => {
				setIsMounted(true)
			})
	}, [])

	useEffect(() => {
		if (!userId) {
			setIsShowEditForm(false)
		}
	}, [userId])

	return (
		<CSSTransition
			in={isMounted}
			timeout={500}
			classNames='fade'
			unmountOnExit
		>
			<span className='mb-4 p-4 bg-gray-800 rounded-md border-gray-500 relative last:mb-0 block'>
				{isCurrentUserItem && (
					<Dropdown>
						<DropdownItem
							label='Edit'
							icon={faPenToSquare}
							onClick={() => setIsShowEditForm(true)}
						/>
						<DropdownItem
							label='Delete'
							icon={faTrash}
							onClick={() =>
								removeReviewItem(id, movieId, userId, 'replies')
							}
						/>
					</Dropdown>
				)}
				<span className='flex mb-2'>
					<span className='flex items-center'>
						<ProfileIconSmall
							userId={authorInfo.userId}
							photoURL={authorInfo.photoURL}
							isLinkToProfile={!isCollectionItem}
						/>
						<span>
							<span className='mb-1 min-h-[22.5px] text-lg font-semibold leading-tight block'>
								{authorInfo.displayName}
							</span>
							<span className='text-xs block'>
								{formattedDate}
							</span>
						</span>
					</span>
				</span>
				<span>
					{isShowEditForm ? (
						<EditReviewForm
							item={reply}
							movieId={movieId}
							onFormClose={setIsShowEditForm}
							isReply
						/>
					) : (
						<>
							<span className='mb-4 block'>
								<span
									style={{
										maxHeight: isContentOpen
											? contentHeight
											: '3rem',
									}}
									ref={contentRef}
									className='overflow-hidden transition-[max-height] duration-500'
								>
									<span
										className={classNames(
											isShowTruncateDots && 'line-clamp-2'
										)}
									>
										<span className='mr-1 font-semibold'>{`${replyTo},`}</span>
										{content}
									</span>
								</span>
								{isLongReviewContent && (
									<Button
										context='text'
										onClick={() => handleReplyContent()}
									>
										{isContentOpen ? 'Hide' : 'Show more'}
									</Button>
								)}
							</span>
							<ReviewActions
								reviewId={id}
								movieId={movieId}
								userId={userId}
								collectionName='replies'
								onReply={() => onReply(authorInfo.displayName)}
							/>
						</>
					)}
				</span>
			</span>
		</CSSTransition>
	)
}

export default ReplyCard
