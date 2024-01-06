import { FC, FormEvent, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReviewItemCard } from '../../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { updateReviewOrReply } from '@/firebase/handlers/reviewAndReplyHandlers/updateReviewOrReply'

type PropsType = {
	editedItem: IReviewItemCard
	reviewedItemId: number
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	onFormClose: () => void
	isReplyItem?: boolean
}

const EditReviewForm: FC<PropsType> = ({
	editedItem,
	reviewedItemId,
	reviewedItemCollectionType,
	onFormClose,
	isReplyItem = false,
}) => {
	const [textareaValue, setTextareaValue] = useState<string>(
		editedItem.content
	)
	const [error, setError] = useState<string>('')
	const buttonText = isReplyItem ? 'Update reply' : 'Update review'

	const handleTextareaChange = (newValue: string) => {
		setTextareaValue(newValue)
		setError('')
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		if (textareaValue.trim() !== '') {
			setError('')

			let updatedItem: IReviewItemCard

			updatedItem = {
				...editedItem,
				content: textareaValue,
			}

			await updateReviewOrReply(
				updatedItem,
				editedItem.authorId!,
				reviewedItemId,
				isReplyItem ? UserCollections.replies : UserCollections.reviews,
				reviewedItemCollectionType
			)
			setTextareaValue('')

			onFormClose()
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
					onClick={onFormClose}
				>
					Cancel
				</Button>
			</span>
		</form>
	)
}

export default EditReviewForm
