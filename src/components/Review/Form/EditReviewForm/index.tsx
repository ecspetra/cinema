import React, { FC, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { updateReviewItem } from '@/firebase/config'
import { useModal } from '@/context/ModalProvider'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReplyCard, IReviewCardFromDB } from '../../../../../interfaces'

type PropsType = {
	item: IReviewCardFromDB | IReplyCard
	movieId: number
	onFormClose: React.Dispatch<React.SetStateAction<boolean>>
	isReply?: boolean
}

const EditReviewForm: FC<PropsType> = ({
	item,
	movieId,
	onFormClose,
	isReply = false,
}) => {
	const [textareaValue, setTextareaValue] = useState<string>(item.content)
	const [error, setError] = useState<string>('')
	const { showModal } = useModal()
	const buttonText = isReply ? 'Update reply' : 'Update review'

	const handleTextareaChange = newValue => {
		setTextareaValue(newValue)
		setError('')
	}

	const handleSubmit = async event => {
		event.preventDefault()

		if (textareaValue.trim() !== '') {
			setError('')

			let newItem: IReviewCardFromDB | IReplyCard

			if (isReply) {
				newItem = {
					movieId: movieId,
					replyTo: item.replyTo,
					reviewId: item.reviewId,
					id: item.id,
					content: textareaValue,
					created_at: item.created_at,
					authorId: item.authorId,
				}
			} else {
				newItem = {
					movieId: movieId,
					id: item.id,
					content: textareaValue,
					created_at: item.created_at,
					authorId: item.authorId,
				}
			}

			await updateReviewItem(
				newItem,
				item.authorId,
				movieId,
				isReply ? 'replies' : 'reviews'
			)
			setTextareaValue('')

			onFormClose(false)
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Textarea
				onChange={handleTextareaChange}
				value={textareaValue}
				error={error}
				className='border-slate-600'
			/>
			<div className='mt-8 flex justify-start items-center'>
				<Button type='submit'>{buttonText}</Button>
				<Button
					context='filledDark'
					className='ml-2'
					onClick={() => onFormClose(false)}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default EditReviewForm
