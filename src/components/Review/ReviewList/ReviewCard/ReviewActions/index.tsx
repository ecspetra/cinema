import {
	FC,
	useEffect,
	useState,
	MouseEvent,
	SetStateAction,
	Dispatch,
} from 'react'
import ReviewActionButton from '@/components/Review/ReviewList/ReviewCard/ReviewActions/ReviewActionButton'
import {
	getReviewReactions,
	removeReviewReaction,
	reviewReactionsListener,
	setNewReviewOrReplyReaction,
} from '@/firebase/config'
import { openLoginModal } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	reviewId: string
	reviewedItemId: number
	userId: string
	onReply: Dispatch<SetStateAction<boolean>> | ((userName: string) => void)
	collectionType: UserCollections.reviews | UserCollections.replies
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
}

type Reaction = { key: string; data: string }

type ReactionsType = {
	likes: Reaction[]
	dislikes: Reaction[]
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
	const [reactions, setReactions] = useState<ReactionsType>({
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
				await removeReviewReaction(
					userId,
					reviewId,
					reviewedItemId,
					collectionType,
					reactionType,
					reviewedItemCollectionType
				)
			} else {
				await setNewReviewOrReplyReaction(
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
		getReviewReactions(
			reviewId,
			reviewedItemId,
			collectionType,
			reviewedItemCollectionType
		).then(data => {
			setReactions({
				likes: data.likes as Reaction[],
				dislikes: data.dislikes as Reaction[],
			})
		})
	}, [])

	useEffect(() => {
		if (userId) {
			const unsubscribe = reviewReactionsListener(
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
