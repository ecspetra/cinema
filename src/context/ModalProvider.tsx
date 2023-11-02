import React, { createContext, useContext, useState, ReactNode } from 'react'

type ModalContentType = {
	modalTitle: string
	modalText: string
	modalClassName: string
	modalContent: JSX.Element | null
	alertInfo: {
		isAlert: boolean
		type: 'success' | 'error' | ''
	} | null
}

type ModalContextType = {
	showModal: (content: ModalContentType) => void
	hideModal: () => void
	isModalVisible: boolean
	isMounted: boolean
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
	const [isMounted, setIsMounted] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [content, setContent] = useState<ModalContentType>({
		modalTitle: '',
		modalText: '',
		modalClassName: '',
		modalContent: null,
		alertInfo: null,
	})

	const showModal = (modalContent: ModalContentType) => {
		setContent(modalContent)
		setIsModalVisible(true)
		setIsMounted(true)
	}

	const hideModal = () => {
		setIsMounted(false)

		setTimeout(() => {
			setIsModalVisible(false)
			setContent({
				modalTitle: '',
				modalText: '',
				modalClassName: '',
				modalContent: null,
				alertInfo: null,
			})
		}, 300)
	}

	return (
		<ModalContext.Provider
			value={{ showModal, hideModal, isModalVisible, isMounted, content }}
		>
			{children}
		</ModalContext.Provider>
	)
}
