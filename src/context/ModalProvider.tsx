import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'
import { IModalContent } from '../../interfaces'

type ModalContextType = {
	showModal: (content: IModalContent) => void
	hideModal: () => void
	currentModal: IModalContent
	isMounted: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

type ModalProviderProps = {
	children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [modalQueue, setModalQueue] = useState<ModalContextType[]>([])
	const [currentModal, setCurrentModal] = useState<IModalContent | null>(null)
	const [isMounted, setIsMounted] = useState(false)

	const showModal = (modalData: IModalContent) => {
		setModalQueue(prevState => [...prevState, modalData])
	}

	const hideModal = (modalId: string) => {
		setIsMounted(false)
		setModalQueue(prevState =>
			prevState.filter(item => item.id !== modalId)
		)
		setCurrentModal(null)
	}

	useEffect(() => {
		if (modalQueue.length > 0 && !currentModal) {
			setCurrentModal(modalQueue[modalQueue.length - 1])
		}
	}, [modalQueue, currentModal])

	useEffect(() => {
		if (currentModal) {
			setIsMounted(true)
		}
	}, [currentModal])

	const contextValue = {
		showModal,
		hideModal,
		isMounted,
		currentModal,
	}

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	)
}
