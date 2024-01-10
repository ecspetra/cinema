import { useEffect, useState } from 'react'

const useReplyEditForm = (userId: string) => {
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)

	const showEditReviewForm = () => {
		setIsShowEditForm(true)
	}

	const closeEditReviewForm = () => {
		setIsShowEditForm(false)
	}

	useEffect(() => {
		if (!userId) {
			setIsShowEditForm(false)
		}
	}, [userId])

	return { isShowEditForm, showEditReviewForm, closeEditReviewForm }
}
export default useReplyEditForm
