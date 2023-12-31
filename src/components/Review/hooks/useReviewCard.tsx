import { useEffect, useState } from 'react'
import { IReviewAuthorInfo, IReviewCard } from '../../../../interfaces'
import {
	getDBRepliesList,
	getUserInfo,
	removeReviewItem,
} from '@/firebase/config'
import { UserCollections } from '@/constants/enum'

type CollectionInfo = {
	id: string
	authorId?: string
	reviewedItemId?: number
	collectionType?: UserCollections.movie | UserCollections.tv
}

const useReviewCard = (collectionInfo: CollectionInfo, userId: string) => {
	const [replies, setReplies] = useState<IReviewCard[]>([])
	const [authorInfo, setAuthorInfo] = useState<IReviewAuthorInfo>({
		userId: '',
		photoURL: '',
		displayName: '',
	})
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const { id, authorId, reviewedItemId, collectionType } = collectionInfo
	const isItemFromDB = !!authorId

	const removeReview = () => {
		setIsMounted(false)

		setTimeout(() => {
			removeReviewItem(
				id,
				reviewedItemId!,
				userId,
				UserCollections.reviews,
				collectionType!
			)
		}, 500)
	}

	useEffect(() => {
		getDBRepliesList(reviewedItemId!, id, collectionType!).then(data => {
			setReplies(data)
		})
	}, [])

	useEffect(() => {
		if (isItemFromDB) {
			getUserInfo(authorId!)
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

	return { isMounted, replies, isItemFromDB, authorInfo, removeReview }
}

export default useReviewCard
