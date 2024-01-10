import { FC } from 'react'
import { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthProvider'
import MainLayout from '../components/MainLayout/index'
import { ModalProvider } from '@/context/ModalProvider'
import Modal from '@/app/components/UI/Modal'
import PageLoader from '@/app/components/PageLoader'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
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

export default MyApp
