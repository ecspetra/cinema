import '@/app/globals.css'
import { FC } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

type PropsType = {
	children: JSX.Element | JSX.Element[]
}

const MainLayout: FC<PropsType> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='container w-full max-w-screen-xl mx-auto pt-[68px] px-2 md:px-5 pb-16 relative font-light min-h-screen flex flex-col text-base'>
				{children}
			</main>
			<Footer />
		</>
	)
}

export default MainLayout
