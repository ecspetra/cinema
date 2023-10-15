import React, { FC, useEffect, useState } from 'react'
import ReviewActionButton from '@/components/Review/ReviewsList/ReviewCard/ReviewActions/ReviewActionButton'
import {
	getReviewReactions,
	removeReviewReaction,
	reviewReactionsListener,
	setNewReviewReaction,
} from '@/firebase/config'
import { openLoginModal } from '@/handlers/openLoginModal'
import { useModal } from '@/context/ModalProvider'

type PropsType = {
	reviewId: string
	movieId: number
	userId: string
	onReply:
		| React.Dispatch<React.SetStateAction<boolean>>
		| ((userName: string) => void)
	collectionName: 'reviews' | 'replies'
}

const ReviewActions: FC<PropsType> = ({
	reviewId,
	movieId,
	userId,
	onReply,
	collectionName,
}) => {
	const { showModal } = useModal()
	const [reactions, setReactions] = useState({
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
		reactionType: 'like' | 'dislike',
		collectionName: 'reviews' | 'replies'
	) => {
		if (userId) {
			if (isCurrentUserReaction(reactionType)) {
				await removeReviewReaction(
					userId,
					reviewId,
					movieId,
					collectionName,
					reactionType
				)
			} else {
				await setNewReviewReaction(
					userId,
					reviewId,
					movieId,
					collectionName,
					reactionType
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
		getReviewReactions(reviewId, movieId, collectionName).then(data => {
			setReactions({
				likes: data.likes,
				dislikes: data.dislikes,
			})
		})
	}, [])

	useEffect(() => {
		if (userId) {
			const unsubscribe = reviewReactionsListener(
				reviewId,
				movieId,
				collectionName,
				setReactions
			)

			return () => {
				unsubscribe()
			}
		}
	}, [reactions, userId])

	return (
		<div className='border-t border-slate-600 pt-4 flex justify-start items-center'>
			<ReviewActionButton
				title='Like'
				action='like'
				onClick={() => handleReaction('like', collectionName)}
				counter={reactions.likes.length}
				isCurrentUserReaction={isCurrentUserLike}
			/>
			<ReviewActionButton
				title='Dislike'
				action='dislike'
				onClick={() => handleReaction('dislike', collectionName)}
				counter={reactions.dislikes.length}
				isCurrentUserReaction={isCurrentUserDislike}
			/>
			<ReviewActionButton
				title='Reply'
				action='reply'
				onClick={onReply}
			/>
		</div>
	)
}

export default ReviewActions
