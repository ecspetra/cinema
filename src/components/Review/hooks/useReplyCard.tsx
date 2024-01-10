import { useEffect, useState } from 'react'
import { IReviewAuthorInfo } from '../../../../interfaces'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

const useReplyCard = (authorId: string) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [authorInfo, setAuthorInfo] = useState<IReviewAuthorInfo>({
		userId: '',
		photoURL: '',
		displayName: '',
	})

	useEffect(() => {
		getUserProfileInfo(authorId)
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
	return { isMounted, authorInfo }
}

export default useReplyCard
