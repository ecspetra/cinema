import {
	FC,
	useEffect,
	useState,
	MouseEvent,
	SetStateAction,
	Dispatch,
} from 'react'
import ReviewActionButton from '@/components/Review/ReviewList/ReviewCard/ReviewActions/ReviewActionButton'
import { openLoginModal } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { UserCollections } from '@/constants/enum'
import { getReviewOrReplyReactions } from '@/firebase/handlers/reviewAndReplyHandlers/getReviewOrReplyReactions'
import { reviewOrReplyReactionsListener } from '@/firebase/handlers/reactionHandlers/reviewOrReplyReactionsListener'
import { createNewReviewOrReplyReaction } from '@/firebase/handlers/reactionHandlers/createNewReviewOrReplyReaction'
import { removeReviewOrReplyReaction } from '@/firebase/handlers/reactionHandlers/removeReviewOrReplyReaction'
import { IAllReactions, IReaction } from '../../../../../../interfaces'

type PropsType = {
	reviewId: string
	reviewedItemId: number
	userId: string
	onReply: Dispatch<SetStateAction<boolean>> | ((userName: string) => void)
	collectionType: UserCollections.reviews | UserCollections.replies
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
}

const ReviewActions: FC<PropsType> = ({
	reviewId,
	reviewedItemId,
	userId,
	onReply,
	collectionType,
	reviewedItemCollectionType,
}) => {
	const { showModal } = useModal()
	const [reactions, setReactions] = useState<IAllReactions>({
		likes: [],
		dislikes: [],
	})
	const isCurrentUserLike =
		reactions.likes.length > 0 &&
		reactions.likes.some(item => item.key === userId)
	const isCurrentUserDislike =
		reactions.dislikes.length > 0 &&
		reactions.dislikes.some(item => item.key === userId)

	const handleReaction = async (
		event: MouseEvent<HTMLButtonElement>,
		reactionType: 'like' | 'dislike',
		collectionType: UserCollections.reviews | UserCollections.replies
	) => {
		if (userId) {
			if (isCurrentUserReaction(reactionType)) {
				await removeReviewOrReplyReaction(
					userId,
					reviewId,
					reviewedItemId,
					collectionType,
					reactionType,
					reviewedItemCollectionType
				)
			} else {
				await createNewReviewOrReplyReaction(
					userId,
					reviewId,
					reviewedItemId,
					collectionType,
					reactionType,
					reviewedItemCollectionType
				)
			}
		} else openLoginModal(showModal)
	}

	const isCurrentUserReaction = (reactionType: 'like' | 'dislike') => {
		if (reactionType === 'like') {
			return isCurrentUserLike
		} else if (reactionType === 'dislike') {
			return isCurrentUserDislike
		}
		return false
	}

	useEffect(() => {
		getReviewOrReplyReactions(
			reviewId,
			reviewedItemId,
			collectionType,
			reviewedItemCollectionType
		).then(data => {
			setReactions({
				likes: data.likes as IReaction[],
				dislikes: data.dislikes as IReaction[],
			})
		})
	}, [])

	useEffect(() => {
		if (userId) {
			const unsubscribe = reviewOrReplyReactionsListener(
				reviewId,
				reviewedItemId,
				collectionType,
				setReactions,
				reviewedItemCollectionType
			)

			return () => {
				unsubscribe()
			}
		}
	}, [reactions, userId])

	return (
		<span className='flex justify-start items-center mt-auto'>
			<ReviewActionButton
				title='Like'
				action='like'
				onClick={event => handleReaction(event, 'like', collectionType)}
				counter={reactions.likes.length}
				isCurrentUserReaction={isCurrentUserLike}
			/>
			<ReviewActionButton
				title='Dislike'
				action='dislike'
				onClick={event =>
					handleReaction(event, 'dislike', collectionType)
				}
				counter={reactions.dislikes.length}
				isCurrentUserReaction={isCurrentUserDislike}
			/>
			<ReviewActionButton
				title='Reply'
				action='reply'
				onClick={onReply}
			/>
		</span>
	)
}

export default ReviewActions
