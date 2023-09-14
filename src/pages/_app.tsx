import React from 'react'
import App from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import MainLayout from '../components/MainLayout/index'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<AuthProvider>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</AuthProvider>
		)
	}
}

export default MyApp
