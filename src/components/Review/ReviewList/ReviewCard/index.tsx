import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
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
import {
	getDBRepliesList,
	getUserInfo,
	removeReviewItem,
} from '@/firebase/config'
import ReviewActions from '@/components/Review/ReviewList/ReviewCard/ReviewActions'
import NewReviewForm from '../../Form/NewReviewForm'
import RepliesList from '../../ReplyList'
import EditReviewForm from '@/components/Review/Form/EditReviewForm'
import Dropdown from '@/app/components/UI/Dropdown'
import DropdownItem from '@/app/components/UI/Dropdown/DropdownItem'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import { useAuth } from '@/context/AuthProvider'
import Link from 'next/link'
import MovieCardSmall from '@/components/Movie/MovieCard/MovieCardSmall'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'

type PropsType = {
	defaultCardMovieId: number
	review: IReviewCard | IReviewCardFromDB
	isLinkToMovie?: boolean
	isCollectionItem?: boolean
}

const ReviewCard: FC<PropsType> = ({
	defaultCardMovieId,
	review,
	isLinkToMovie = false,
	isCollectionItem = false,
}) => {
	const { userId } = useAuth()
	const {
		content,
		id,
		author,
		created_at,
		avatar_path,
		authorId,
		movieId,
		isTVShow,
	} = review
	const [replies, setReplies] = useState<Array<IReplyCard>>([])
	const [authorInfo, setAuthorInfo] = useState({
		userId: '',
		photoURL: '',
		displayName: '',
	})
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)
	const [isShowReplyForm, setIsShowReplyForm] = useState<boolean>(false)
	const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
	const [isItemFromDB, setIsItemFromDB] = useState<boolean>(false)
	const [isTruncateReview, setIsTruncateReview] = useState<boolean>(false)
	const [replyTo, setReplyTo] = useState<string>('')
	const [contentHeight, setContentHeight] = useState<number>(0)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const isLongReviewContent = useMemo(() => content.length > 400, [content])
	const formattedDate = useMemo(
		() => moment(created_at).format('MMM Do YY'),
		[created_at]
	)
	const isShowTruncateDots =
		isLongReviewContent && !isContentOpen && isTruncateReview
	const isCurrentUserItem = userId === authorId && isItemFromDB

	const handleFormClose = () => {
		setReplyTo(isItemFromDB ? authorInfo.displayName : author)
		setIsShowReplyForm(false)
	}

	const handleReplyTo = (userName: string) => {
		setIsShowReplyForm(true)
		setReplyTo(userName)
	}

	const handleReviewContent = () => {
		setIsContentOpen(!isContentOpen)
	}

	const handleRemoveReview = () => {
		setIsMounted(false)

		setTimeout(() => {
			removeReviewItem(id, movieId, userId, 'reviews')
		}, 500)
	}

	const reviewContent = (
		<span>
			<span className='mb-4 p-4 gap-4 bg-gray-900 relative duration-300 flex group-hover:bg-gray-800'>
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
							onClick={handleRemoveReview}
						/>
					</Dropdown>
				)}
				{isLinkToMovie && (
					<MovieCardSmall itemId={movieId} isTVShow={isTVShow} />
				)}
				<span className='w-full'>
					<span className='flex mb-2 max-w-[calc(100%-54px)]'>
						<span className='flex items-center'>
							<ProfileIconSmall
								userId={isItemFromDB && authorInfo.userId}
								photoURL={
									isItemFromDB
										? authorInfo.photoURL
										: `https://image.tmdb.org/t/p/original${avatar_path}`
								}
								isLinkToProfile={isItemFromDB && !isLinkToMovie}
							/>
							<span>
								<span className='mb-2 min-h-[22.5px] text-lg font-semibold leading-tight block'>
									{isItemFromDB
										? authorInfo.displayName
										: author}
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
								item={review}
								movieId={defaultCardMovieId ?? movieId}
								onFormClose={setIsShowEditForm}
							/>
						) : (
							<>
								<span className='block mb-4'>
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
												isShowTruncateDots &&
													'line-clamp-2'
											)}
										>
											{content}
										</span>
									</span>
									{isLongReviewContent && (
										<Button
											context='text'
											onClick={handleReviewContent}
										>
											{isContentOpen
												? 'Hide'
												: 'Show more'}
										</Button>
									)}
								</span>
								<ReviewActions
									reviewId={id}
									movieId={defaultCardMovieId ?? movieId}
									userId={userId}
									onReply={() => setIsShowReplyForm(true)}
									collectionName='reviews'
								/>
								<RepliesList
									movieId={defaultCardMovieId ?? movieId}
									userId={userId}
									reviewId={id}
									replies={replies}
									onReply={handleReplyTo}
									isCollectionList={isCollectionItem}
								/>
								{isShowReplyForm && (
									<NewReviewForm
										movieId={defaultCardMovieId ?? movieId}
										isTVShow={isTVShow}
										userId={userId}
										reviewId={id}
										replyTo={replyTo}
										onFormClose={handleFormClose}
										isReply
									/>
								)}
							</>
						)}
					</span>
				</span>
			</span>
		</span>
	)

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
		getDBRepliesList(movieId, id).then(data => {
			setReplies(data)
		})
	}, [])

	useEffect(() => {
		if (!userId) {
			setIsShowEditForm(false)
		}
	}, [userId])

	useEffect(() => {
		setReplyTo(isItemFromDB ? authorInfo.displayName : author)
	}, [authorInfo])

	useEffect(() => {
		if (authorId) {
			setIsItemFromDB(true)
		}

		if (isItemFromDB) {
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
		} else {
			setIsMounted(true)
		}
	}, [isItemFromDB, authorId])

	return (
		<CSSTransition
			in={isMounted}
			timeout={500}
			classNames='fade'
			unmountOnExit
		>
			{isLinkToMovie ? (
				<Link
					href='/movie/[id]'
					as={`/movie/${movieId}`}
					className='group'
				>
					{reviewContent}
				</Link>
			) : (
				reviewContent
			)}
		</CSSTransition>
	)
}

export default ReviewCard
