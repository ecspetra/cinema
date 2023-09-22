import AuthForm from '@/app/components/Auth/AuthForm'
import React from 'react'

export const openLoginModal = showModal => {
	showModal({
		modalTitle: '',
		modalText: '',
		modalClassName: '',
		modalContent: <AuthForm />,
	})
}
