import { FC, useMemo } from 'react'
import { IReviewItemCard } from '../../../../../interfaces'
import Button from '../../../../app/components/UI/Button'
import moment from 'moment'
import classNames from 'classnames'
import ReviewActions from '@/components/Review/ReviewList/ReviewCard/ReviewActions'
import EditReviewForm from '@/components/Review/Form/EditReviewForm'
import Dropdown from '@/app/components/UI/Dropdown'
import DropdownItem from '@/app/components/UI/Dropdown/DropdownItem'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'
import { UserCollections } from '@/constants/enum'
import { formatReviewTextWithHtmlTags } from '@/components/Review/handlers/formatReviewTextWithHtmlTags'
import useReviewCardContentLength from '@/components/Review/hooks/useReviewCardContentLength'
import useReviewEditForm from '@/components/Review/hooks/useReviewEditForm'
import useReplyCard from '@/components/Review/hooks/useReplyCard'
import { removeReviewOrReply } from '@/firebase/handlers/reviewAndReplyHandlers/removeReviewOrReply'

type PropsType = {
	reviewedItemId: number
	userId: string
	reply: IReviewItemCard
	collectionType: UserCollections.movie | UserCollections.tv
	onReply: (userName: string) => void
	isCollectionItem?: boolean
}

const ReplyCard: FC<PropsType> = ({
	reviewedItemId,
	userId,
	reply,
	collectionType,
	onReply,
	isCollectionItem,
}) => {
	const { content, id, created_at, authorId, replyToUser } = reply
	const formattedDate = useMemo(
		() => moment(created_at).format('MMM Do YY'),
		[created_at]
	)
	const isCurrentUserItem = userId === authorId

	const { isMounted, authorInfo } = useReplyCard(authorId!)

	const { isShowEditForm, showEditReviewForm, closeEditReviewForm } =
		useReviewEditForm(userId)

	const {
		isContentOpen,
		contentHeight,
		contentRef,
		isShowTruncateDots,
		isLongReviewContent,
		toggleReviewContentLength,
	} = useReviewCardContentLength(content)

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
							onClick={showEditReviewForm}
						/>
						<DropdownItem
							label='Delete'
							icon={faTrash}
							onClick={() =>
								removeReviewOrReply(
									id,
									reviewedItemId,
									userId,
									UserCollections.replies,
									collectionType
								)
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
							reviewedItemId={reviewedItemId}
							reviewedItemCollectionType={collectionType}
							onFormClose={closeEditReviewForm}
							isReplyItem
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
										<span className='mr-1 font-semibold'>{`${replyToUser},`}</span>
										<span
											dangerouslySetInnerHTML={{
												__html: formatReviewTextWithHtmlTags(
													content
												),
											}}
											className={classNames(
												isShowTruncateDots &&
													'line-clamp-2'
											)}
										></span>
									</span>
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
								reviewedItemId={reviewedItemId}
								userId={userId}
								collectionType={UserCollections.replies}
								onReply={() => onReply(authorInfo.displayName)}
								reviewedItemCollectionType={collectionType}
							/>
						</>
					)}
				</span>
			</span>
		</CSSTransition>
	)
}

export default ReplyCard
