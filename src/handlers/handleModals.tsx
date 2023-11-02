import AuthForm from '@/app/components/Auth/AuthForm'
import React from 'react'
import Button from '@/app/components/UI/Button'

export const openLoginModal = showModal => {
	showModal({
		modalTitle: '',
		modalText: '',
		modalClassName: '',
		modalContent: <AuthForm />,
		alertInfo: null,
	})
}

export const openRemoveModal = (showModal, onClose, onRemove, itemName) => {
	showModal({
		modalTitle: `Are you sure you want to remove ${itemName} from your collection?`,
		modalText: '',
		modalClassName: '',
		modalContent: (
			<div className='flex justify-between items-center gap-4'>
				<Button onClick={onRemove}>Confirm</Button>
				<Button context='filledDark' onClick={onClose}>
					Cancel
				</Button>
			</div>
		),
		alertInfo: null,
	})
}

export const showSuccessNotification = (showModal, text) => {
	showModal({
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
