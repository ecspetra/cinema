import { useEffect, useState } from 'react'

const useReplyForm = (authorName: string) => {
	const [isShowReplyForm, setIsShowReplyForm] = useState<boolean>(false)
	const [replyToUser, setReplyToUser] = useState<string>('')

	const showReplyForm = () => {
		setIsShowReplyForm(true)
	}

	const closeReplyForm = () => {
		setReplyToUser(authorName)
		setIsShowReplyForm(false)
	}

	const makeReplyToUser = (userName: string) => {
		setIsShowReplyForm(true)
		setReplyToUser(userName)
	}

	useEffect(() => {
		setReplyToUser(authorName)
	}, [authorName])

	return {
		replyToUser,
		isShowReplyForm,
		showReplyForm,
		closeReplyForm,
		makeReplyToUser,
	}
}

export default useReplyForm
