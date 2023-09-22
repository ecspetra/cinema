import React from 'react'
import App from 'next/app'
import { AuthProvider } from '@/context/AuthProvider'
import MainLayout from '../components/MainLayout/index'
import { ModalProvider, useModal } from '@/context/ModalProvider'
import Modal from '@/app/components/UI/Modal'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<AuthProvider>
				<ModalProvider>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
					<Modal />
				</ModalProvider>
			</AuthProvider>
		)
	}
}

export default MyApp
