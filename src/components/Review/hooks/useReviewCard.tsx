import { useEffect, useState } from 'react'
import { IReviewAuthorInfo, IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { removeReviewOrReply } from '@/firebase/handlers/reviewAndReplyHandlers/removeReviewOrReply'
import { getReplyListFromStorage } from '@/firebase/handlers/reviewAndReplyHandlers/getReplyListFromStorage'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

type CollectionInfo = {
	id: string
	authorId?: string
	reviewedItemId?: number
	collectionType?: UserCollections.movie | UserCollections.tv
}

const useReviewCard = (collectionInfo: CollectionInfo, userId: string) => {
	const [replies, setReplies] = useState<IReviewItemCard[]>([])
	const [authorInfo, setAuthorInfo] = useState<IReviewAuthorInfo>({
		userId: '',
		photoURL: '',
		displayName: '',
	})
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const { id, authorId, reviewedItemId, collectionType } = collectionInfo
	const isItemFromDB = !!authorId

	const removeReviewCard = () => {
		setIsMounted(false)

		setTimeout(() => {
			removeReviewOrReply(
				id,
				reviewedItemId!,
				userId,
				UserCollections.reviews,
				collectionType!
			)
		}, 500)
	}

	useEffect(() => {
		getReplyListFromStorage(reviewedItemId!, id, collectionType!).then(
			data => {
				setReplies(data)
			}
		)
	}, [])

	useEffect(() => {
		if (isItemFromDB) {
			getUserProfileInfo(authorId!)
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
	}, [isItemFromDB])

	return { isMounted, replies, isItemFromDB, authorInfo, removeReviewCard }
}

export default useReviewCard
