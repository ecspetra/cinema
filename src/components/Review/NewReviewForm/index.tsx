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

type PropsType = {
	movieId: number
	userId: string
}

const NewReviewForm: FC<PropsType> = ({ movieId, userId }) => {
	const [textareaValue, setTextareaValue] = useState<string>('')
	const [error, setError] = useState<string>('')
	const { showModal } = useModal()

	const handleTextareaChange = newValue => {
		setTextareaValue(newValue)
		setError('')
	}

	const handleSubmit = async event => {
		event.preventDefault()

		if (textareaValue.trim() !== '') {
			if (userId) {
				setError('')

				const newItem = {
					userId: userId,
					id: uuidv4(),
					content: textareaValue,
					created_at: moment().format(),
				}

				try {
					await setNewReviewItem(newItem, userId, movieId)
					setTextareaValue('')
				} catch (error) {
					setError(error.toString)
				}
			} else openLoginModal(showModal)
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
		}
	}

	return (
		<>
			<Title>Leave your review</Title>
			<form onSubmit={handleSubmit}>
				<Textarea
					onChange={handleTextareaChange}
					value={textareaValue}
					error={error}
				/>
				<Button type='submit' className='mt-8'>
					Submit review
				</Button>
			</form>
		</>
	)
}

export default NewReviewForm
