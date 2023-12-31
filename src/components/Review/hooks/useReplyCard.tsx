import { useEffect, useState } from 'react'
import { getUserInfo } from '@/firebase/config'
import { IReviewAuthorInfo } from '../../../../interfaces'

const useReplyCard = (authorId: string) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [authorInfo, setAuthorInfo] = useState<IReviewAuthorInfo>({
		userId: '',
		photoURL: '',
		displayName: '',
	})

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
	return { isMounted, authorInfo }
}

export default useReplyCard
