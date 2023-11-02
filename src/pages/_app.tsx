import React from 'react'
import App from 'next/app'
import { AuthProvider } from '@/context/AuthProvider'
import MainLayout from '../components/MainLayout/index'
import { ModalProvider } from '@/context/ModalProvider'
import Modal from '@/app/components/UI/Modal'
import PageLoader from '@/app/components/PageLoader'
import Alert from '@/app/components/UI/Alert'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<PageLoader>
				<AuthProvider>
					<ModalProvider>
						<MainLayout>
							<Component {...pageProps} />
						</MainLayout>
						<Modal />
					</ModalProvider>
				</AuthProvider>
			</PageLoader>
		)
	}
}

export default MyApp
