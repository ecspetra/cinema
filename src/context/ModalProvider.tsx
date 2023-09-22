import React, { createContext, useContext, useState, ReactNode } from 'react'

type ModalContentType = {
	modalTitle: string
	modalText: string
	modalClassName: string
	modalContent: JSX.Element | null
}

type ModalContextType = {
	showModal: (content: ModalContentType) => void
	hideModal: () => void
	isModalVisible: boolean
	content: ModalContentType
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
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [content, setContent] = useState<ModalContentType>({
		modalTitle: '',
		modalText: '',
		modalClassName: '',
		modalContent: null,
	})

	const showModal = (modalContent: ModalContentType) => {
		setContent(modalContent)
		setIsModalVisible(true)
	}

	const hideModal = () => {
		setIsModalVisible(false)
		setContent({
			modalTitle: '',
			modalText: '',
			modalClassName: '',
			modalContent: null,
		})
	}

	return (
		<ModalContext.Provider
			value={{ showModal, hideModal, isModalVisible, content }}
		>
			{children}
		</ModalContext.Provider>
	)
}
