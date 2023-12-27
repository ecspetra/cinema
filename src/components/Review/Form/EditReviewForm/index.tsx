import { FC, useState, Dispatch, SetStateAction } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { updateReviewItem } from '@/firebase/config'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReviewCard } from '../../../../../interfaces'

type PropsType = {
	item: IReviewCard
	movieId: number
	onFormClose: Dispatch<SetStateAction<boolean>>
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
	const buttonText = isReply ? 'Update reply' : 'Update review'

	const handleTextareaChange = newValue => {
		setTextareaValue(newValue)
		setError('')
	}

	const handleSubmit = async event => {
		event.preventDefault()

		if (textareaValue.trim() !== '') {
			setError('')

			let updatedItem: IReviewCard

			if (isReply) {
				updatedItem = {
					movieId: movieId,
					replyTo: item.replyTo,
					reviewId: item.reviewId,
					id: item.id,
					content: textareaValue,
					created_at: item.created_at,
					authorId: item.authorId,
					isTVShow: item.isTVShow,
				}
			} else {
				updatedItem = {
					movieId: movieId,
					id: item.id,
					content: textareaValue,
					created_at: item.created_at,
					authorId: item.authorId,
					isTVShow: item.isTVShow,
				}
			}

			await updateReviewItem(
				updatedItem,
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
		<form>
			<Textarea
				onChange={handleTextareaChange}
				value={textareaValue}
				error={error}
			/>
			<span className='mt-8 flex justify-start items-center'>
				<Button onClick={handleSubmit}>{buttonText}</Button>
				<Button
					context='filledDark'
					className='ml-2'
					onClick={() => onFormClose(false)}
				>
					Cancel
				</Button>
			</span>
		</form>
	)
}

export default EditReviewForm
