import '@/app/globals.css'
import {FC} from 'react'
import Header from "@/app/components/Header";

type PropsType = {
	children: JSX.Element | JSX.Element[];
}

const MainLayout: FC<PropsType> = ({ children }) => {
	return (
		<div className="container w-full max-w-screen-xl mx-auto p-5">
			<Header />
			{children}
		</div>
	)
}

export default MainLayout
