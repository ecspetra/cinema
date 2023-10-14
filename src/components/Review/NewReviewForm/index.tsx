import React, { FC, useState } from 'react'
import Textarea from '../../../app/components/UI/Input/Textarea/index'
import Title from '../../../app/components/UI/Title/Title'
import Button from '../../../app/components/UI/Button/index'
import { setNewReviewItem } from '@/firebase/config'
import { uuidv4 } from '@firebase/util'
import moment from 'moment'
import { openLoginModal } from '@/handlers/openLoginModal'
import { useModal } from '@/context/ModalProvider'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReplyCard, IReviewCardFromDB } from '../../../../interfaces'

type PropsType = {
	movieId: number
	userId: string
	reviewId?: string
	replyTo?: string
	isReply?: boolean
	onClose?: React.Dispatch<React.SetStateAction<boolean>>
}

const NewReviewForm: FC<PropsType> = ({
	movieId,
	userId,
	reviewId,
	replyTo,
	isReply = false,
	onClose,
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
						replyTo: replyTo,
						reviewId: reviewId,
						id: uuidv4(),
						content: textareaValue,
						created_at: moment().format(),
						authorId: userId,
					}
				} else {
					newItem = {
						id: uuidv4(),
						content: textareaValue,
						created_at: moment().format(),
						authorId: userId,
					}
				}

				await setNewReviewItem(
					newItem,
					userId,
					movieId,
					isReply ? 'replies' : 'reviews'
				)
				setTextareaValue('')

				if (isReply) onClose(false)
			} else openLoginModal(showModal)
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
		}
	}

	return (
		<>
			{isReply ? (
				<Title variant='h3' className='mt-8'>
					Leave your reply
				</Title>
			) : (
				<Title>Leave your review</Title>
			)}
			<form onSubmit={handleSubmit}>
				<Textarea
					onChange={handleTextareaChange}
					value={textareaValue}
					error={error}
				/>
				<div className='mt-8 flex justify-start items-center'>
					<Button type='submit'>{buttonText}</Button>
					{isReply && (
						<Button
							context='filledDark'
							className='ml-2'
							onClick={() => onClose(false)}
						>
							Cancel
						</Button>
					)}
				</div>
			</form>
		</>
	)
}

export default NewReviewForm
