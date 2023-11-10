import AuthForm from '@/app/components/Auth/AuthForm'
import React from 'react'
import Button from '@/app/components/UI/Button'
import { uuidv4 } from '@firebase/util'

export const openLoginModal = showModal => {
	showModal({
		id: uuidv4(),
		modalClassName: '',
		modalContent: <AuthForm />,
		alertInfo: null,
	})
}

export const openRemoveModal = (showModal, onClose, onRemove, itemName) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalTitle: `Are you sure you want to remove ${itemName} from your collection?`,
		modalText: '',
		modalClassName: '',
		modalContent: (
			<div className='flex justify-between items-center gap-4'>
				<Button onClick={() => onRemove(modalId)}>Confirm</Button>
				<Button context='filledDark' onClick={() => onClose(modalId)}>
					Cancel
				</Button>
			</div>
		),
		alertInfo: null,
	})
}

export const showSuccessNotification = (showModal, text) => {
	showModal({
		id: uuidv4(),
		modalTitle: ``,
		modalText: text,
		modalClassName: '',
		modalContent: null,
		alertInfo: {
			isAlert: true,
			type: 'success',
		},
	})
}

export const showErrorNotification = (showModal, text) => {
	showModal({
		id: uuidv4(),
		modalTitle: ``,
		modalText: text,
		modalClassName: '',
		modalContent: null,
		alertInfo: {
			isAlert: true,
			type: 'error',
		},
	})
}
