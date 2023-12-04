import AuthForm from '@/app/components/Auth/AuthForm'
import React from 'react'
import Button from '@/app/components/UI/Button'
import { uuidv4 } from '@firebase/util'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'

export const openLoginModal = showModal => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalClassName: '',
		modalContent: <AuthForm />,
		alertInfo: null,
	})
}

export const openFriendsModal = (showModal, itemsList, onRemove) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalTitle: 'Friends',
		modalClassName: '',
		modalContent: (
			<>
				{itemsList.map(item => {
					return (
						<div
							key={item.info.id}
							className='flex justify-between items-center gap-4 w-full mb-4 last:mb-0'
						>
							<div className='flex justify-between items-center'>
								<ProfileIconSmall
									userId={item.info.id}
									photoURL={item.info.photoURL}
									isLinkToProfile
								/>
								<span className='font-semibold'>
									{item.info.displayName}
								</span>
							</div>
							<Button
								context='icon-text'
								onClick={() => onRemove(item.info, modalId)}
							>
								Remove
							</Button>
						</div>
					)
				})}
			</>
		),
		alertInfo: null,
	})
}

export const openRemoveFriendModal = (
	showModal,
	onClose,
	onRemove,
	itemName,
	itemId
) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalTitle: `Are you sure you want to remove ${itemName} from your friends?`,
		modalText: '',
		modalClassName: '',
		modalContent: (
			<div className='flex justify-between items-center gap-4'>
				<Button onClick={() => onRemove(itemId, modalId)}>
					Confirm
				</Button>
				<Button context='filledDark' onClick={() => onClose(modalId)}>
					Cancel
				</Button>
			</div>
		),
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
	const modalId = uuidv4()
	showModal({
		id: modalId,
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
	const modalId = uuidv4()
	showModal({
		id: modalId,
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
