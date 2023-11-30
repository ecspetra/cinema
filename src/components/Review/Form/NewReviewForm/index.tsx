import React, { FC, useEffect, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Title from '../../../../app/components/UI/Title/Title'
import Button from '../../../../app/components/UI/Button'
import { setNewReviewItem } from '@/firebase/config'
import { uuidv4 } from '@firebase/util'
import moment from 'moment'
import { openLoginModal } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReplyCard, IReviewCardFromDB } from '../../../../../interfaces'

type PropsType = {
	movieId: number
	userId: string
	isTVShow: boolean
	reviewId?: string
	replyTo?: string
	isReply?: boolean
	onFormClose?: React.Dispatch<React.SetStateAction<boolean>>
}

const NewReviewForm: FC<PropsType> = ({
	movieId,
	userId,
	isTVShow = false,
	reviewId,
	replyTo,
	isReply = false,
	onFormClose,
}) => {
	const [textareaValue, setTextareaValue] = useState<string>('')
	const [error, setError] = useState<string>('')
	const { showModal } = useModal()
	const buttonText = isReply ? 'Submit reply' : 'Submit review'

	const handleTextareaChange = newValue => {
		setTextareaValue(newValue)
		setError('')
	}

	const handleSubmit = async event => {
		event.preventDefault()

		if (textareaValue.trim() !== '') {
			if (userId) {
				setError('')

				let newItem: IReviewCardFromDB | IReplyCard

				if (isReply) {
					newItem = {
						movieId: movieId,
						replyTo: replyTo,
						reviewId: reviewId,
						id: uuidv4(),
						content: textareaValue,
						created_at: moment().format(),
						authorId: userId,
						isTVShow: isTVShow,
					}
				} else {
					newItem = {
						movieId: movieId,
						id: uuidv4(),
						content: textareaValue,
						created_at: moment().format(),
						authorId: userId,
						isTVShow: isTVShow,
					}
				}

				await setNewReviewItem(
					newItem,
					userId,
					movieId,
					isReply ? 'replies' : 'reviews'
				)
				setTextareaValue('')

				if (isReply) onFormClose(false)
			} else openLoginModal(showModal)
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
		}
	}

	useEffect(() => {
		setTextareaValue('')
		setError('')
	}, [movieId])

	return (
		<>
			{isReply ? (
				<Title variant='h3' className='mt-8'>
					{`Leave your reply to ${replyTo}`}
				</Title>
			) : (
				<Title>Leave your review</Title>
			)}
			<form>
				<Textarea
					onChange={handleTextareaChange}
					value={textareaValue}
					error={error}
				/>
				<span className='mt-8 flex justify-start items-center'>
					<Button onClick={handleSubmit}>{buttonText}</Button>
					{isReply && (
						<Button
							context='filledDark'
							className='ml-2'
							onClick={() => onFormClose(false)}
						>
							Cancel
						</Button>
					)}
				</span>
			</form>
		</>
	)
}

export default NewReviewForm
