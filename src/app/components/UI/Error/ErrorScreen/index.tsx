import { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'

type PropsType = {
	title: string
	text: string
}

const ErrorScreen: FC<PropsType> = ({ title, text }) => {
	return (
		<div className='w-full h-full flex flex-col justify-center items-center flex-1 text-center'>
			<FontAwesomeIcon
				icon={faBug}
				className='text-rose-600 text-2xl mb-4'
			/>
			<Title variant='h3'>{title}</Title>
			<p className='text-sm text-gray-500'>{text}</p>
		</div>
	)
}

export default ErrorScreen
