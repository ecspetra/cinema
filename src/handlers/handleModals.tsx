import AuthForm from '@/app/components/Auth/AuthForm'
import Button from '@/app/components/UI/Button'
import { uuidv4 } from '@firebase/util'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'
import { IFullUserInfo, IModalContent, IUser } from '../../interfaces'

type ShowModalFunction = (options: IModalContent) => void
type CloseModalFunction = (modalId: string) => void

export const openLoginModal = (showModal: ShowModalFunction): void => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalContent: <AuthForm />,
	})
}

export const openFriendsModal = (
	showModal: ShowModalFunction,
	itemsList: IFullUserInfo[],
	onRemove: (info: IUser, modalId: string) => void
) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalTitle: 'Friends',
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
	})
}

export const openRemoveFriendModal = (
	showModal: ShowModalFunction,
	onClose: CloseModalFunction,
	onRemove: (itemId: string, modalId: string) => void,
	itemName: string,
	itemId: string
) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalTitle: `Are you sure you want to remove ${itemName} from your friends?`,
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
	})
}

export const openRemoveModal = (
	showModal: ShowModalFunction,
	onClose: CloseModalFunction,
	onRemove: (modalId: string) => void,
	itemName: string
) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalTitle: `Are you sure you want to remove ${itemName} from your collection?`,
		modalContent: (
			<div className='flex justify-between items-center gap-4'>
				<Button onClick={() => onRemove(modalId)}>Confirm</Button>
				<Button context='filledDark' onClick={() => onClose(modalId)}>
					Cancel
				</Button>
			</div>
		),
	})
}

export const showSuccessNotification = (
	showModal: ShowModalFunction,
	text: string
) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalText: text,
		alertInfo: {
			isAlert: true,
			type: 'success',
		},
	})
}

export const showErrorNotification = (
	showModal: ShowModalFunction,
	text: string
) => {
	const modalId = uuidv4()
	showModal({
		id: modalId,
		modalText: text,
		alertInfo: {
			isAlert: true,
			type: 'error',
		},
	})
}
