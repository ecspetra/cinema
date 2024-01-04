import { FC, useMemo } from 'react'
import { IReviewItemCard } from '../../../../../interfaces'
import Button from '../../../../app/components/UI/Button'
import moment from 'moment'
import classNames from 'classnames'
import ReviewActions from '@/components/Review/ReviewList/ReviewCard/ReviewActions'
import NewReviewForm from '../../Form/NewReviewForm'
import ReplyList from '../../ReplyList'
import EditReviewForm from '@/components/Review/Form/EditReviewForm'
import Dropdown from '@/app/components/UI/Dropdown'
import DropdownItem from '@/app/components/UI/Dropdown/DropdownItem'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import { useAuth } from '@/context/AuthProvider'
import Link from 'next/link'
import ItemCardSmall from '@/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'
import { UserCollections } from '@/constants/enum'
import { formatReviewTextWithHtmlTags } from '@/components/Review/handlers/formatReviewTextWithHtmlTags'
import { ORIGINAL_IMAGE_SRC } from '@/constants/images'
import useReviewCard from '@/components/Review/hooks/useReviewCard'
import useReviewCardContentLength from '@/components/Review/hooks/useReviewCardContentLength'
import useReviewEditForm from '@/components/Review/hooks/useReviewEditForm'
import useReviewReplyForm from '@/components/Review/hooks/useReviewReplyForm'

type PropsType = {
	collectionType: UserCollections.movie | UserCollections.tv
	review: IReviewItemCard
	defaultCardReviewedId?: number
	isLinkToMovie?: boolean
	isCollectionItem?: boolean
}

const ReviewCard: FC<PropsType> = ({
	collectionType,
	review,
	defaultCardReviewedId,
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
		reviewedItemId,
	} = review
	const collectionInfo = { id, authorId, reviewedItemId, collectionType }
	const { isMounted, replies, isItemFromDB, authorInfo, removeReviewCard } =
		useReviewCard(collectionInfo, userId)
	const { isShowEditForm, showEditReviewForm, closeEditReviewForm } =
		useReviewEditForm(userId)
	const {
		replyToUser,
		isShowReplyForm,
		showReplyForm,
		closeReplyForm,
		makeReplyToUser,
	} = useReviewReplyForm(isItemFromDB ? authorInfo.displayName : author!)
	const isCurrentUserItem = userId === authorId && isItemFromDB
	const formattedDate = useMemo(
		() => moment(created_at).format('MMM Do YY'),
		[created_at]
	)

	const {
		isContentOpen,
		contentHeight,
		contentRef,
		isShowTruncateDots,
		isLongReviewContent,
		toggleReviewContentLength,
	} = useReviewCardContentLength(content)

	const reviewContent = (
		<span className=' p-4 gap-4 bg-gray-900 relative duration-300 flex'>
			{isCurrentUserItem && (
				<Dropdown>
					<DropdownItem
						label='Edit'
						icon={faPenToSquare}
						onClick={showEditReviewForm}
					/>
					<DropdownItem
						label='Delete'
						icon={faTrash}
						onClick={removeReviewCard}
					/>
				</Dropdown>
			)}
			{isLinkToMovie && (
				<ItemCardSmall
					itemId={reviewedItemId!}
					collectionType={collectionType}
				/>
			)}
			<span className='w-full'>
				<span className='flex mb-2 max-w-[calc(100%-54px)]'>
					<span className='flex items-center'>
						<ProfileIconSmall
							userId={
								isItemFromDB ? authorInfo.userId : undefined
							}
							photoURL={
								isItemFromDB
									? authorInfo.photoURL
									: ORIGINAL_IMAGE_SRC.replace(
											'{imageSrc}',
											avatar_path!
									  )
							}
							isLinkToProfile={isItemFromDB && !isLinkToMovie}
						/>
						<span>
							<span className='mb-1 min-h-[22.5px] text-lg font-semibold leading-tight block'>
								{isItemFromDB ? authorInfo.displayName : author}
							</span>
							<span className='text-xs block'>
								{formattedDate}
							</span>
						</span>
					</span>
				</span>
				<span className='flex flex-col h-[calc(100%-50.5px)]'>
					{isShowEditForm ? (
						<EditReviewForm
							item={review}
							reviewedItemId={
								defaultCardReviewedId ?? reviewedItemId!
							}
							reviewedItemCollectionType={collectionType}
							onFormClose={closeEditReviewForm}
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
									className='overflow-hidden transition-[max-height] duration-500 block'
								>
									<span
										dangerouslySetInnerHTML={{
											__html: formatReviewTextWithHtmlTags(
												content
											),
										}}
										className={classNames(
											isShowTruncateDots && 'line-clamp-2'
										)}
									></span>
								</span>
								{isLongReviewContent && (
									<Button
										context='text'
										onClick={toggleReviewContentLength}
									>
										{isContentOpen ? 'Hide' : 'Show more'}
									</Button>
								)}
							</span>
							<ReviewActions
								reviewId={id}
								reviewedItemId={
									defaultCardReviewedId ?? reviewedItemId!
								}
								userId={userId}
								onReply={showReplyForm}
								collectionType={UserCollections.reviews}
								reviewedItemCollectionType={collectionType}
							/>
							<ReplyList
								reviewedItemId={
									defaultCardReviewedId ?? reviewedItemId!
								}
								userId={userId}
								reviewId={id}
								replies={replies}
								onReply={makeReplyToUser}
								collectionType={collectionType}
								isCollectionList={isCollectionItem}
							/>
							{isShowReplyForm && (
								<NewReviewForm
									reviewAuthorId={review.authorId}
									reviewedItemId={
										defaultCardReviewedId ?? reviewedItemId!
									}
									reviewedItemCollectionType={collectionType}
									userId={userId}
									reviewId={id}
									replyToUser={replyToUser}
									onFormClose={closeReplyForm}
									isReplyItem
								/>
							)}
						</>
					)}
				</span>
			</span>
		</span>
	)

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
					as={`/movie/${reviewedItemId}`}
					className='mb-4 block last:mb-0'
				>
					{reviewContent}
				</Link>
			) : (
				<span className='mb-4 block last:mb-0'>{reviewContent}</span>
			)}
		</CSSTransition>
	)
}

export default ReviewCard
