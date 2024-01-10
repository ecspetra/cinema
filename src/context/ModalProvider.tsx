import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'
import { IModalContent } from '../../interfaces'
import { useRouter } from 'next/router'

type ModalContextType = {
	showModal: (content: IModalContent) => void
	hideModal: (modalId: string) => void
	currentModal: IModalContent | null
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
	const [modalQueue, setModalQueue] = useState<IModalContent[]>([])
	const [currentModal, setCurrentModal] = useState<IModalContent | null>(null)
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const router = useRouter()

	const showModal = (modalData: IModalContent) => {
		setModalQueue(prevState => [...prevState, modalData])
	}

	const hideModal = (modalId: string) => {
		setIsMounted(false)

		setTimeout(() => {
			setModalQueue(prevState =>
				prevState.filter(item => item.id !== modalId)
			)
			setCurrentModal(null)
		}, 300)
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

	useEffect(() => {
		const handleRouteChange = () => {
			modalQueue.forEach(modal => hideModal(modal.id))
		}

		router.events.on('beforeHistoryChange', handleRouteChange)

		return () => {
			router.events.off('beforeHistoryChange', handleRouteChange)
		}
	}, [modalQueue, hideModal, router])

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
