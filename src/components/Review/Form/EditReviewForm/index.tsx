import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Button from '../../../../app/components/UI/Button'
import { updateReviewItem } from '@/firebase/config'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReviewCard } from '../../../../../interfaces'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	item: IReviewCard
	reviewedItemId: number
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	onFormClose: () => void
	isReplyItem?: boolean
}

const EditReviewForm: FC<PropsType> = ({
	item,
	reviewedItemId,
	reviewedItemCollectionType,
	onFormClose,
	isReplyItem = false,
}) => {
	const [textareaValue, setTextareaValue] = useState<string>(item.content)
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

			let updatedItem: IReviewCard

			updatedItem = {
				...item,
				content: textareaValue,
			}

			await updateReviewItem(
				updatedItem,
				item.authorId!,
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
