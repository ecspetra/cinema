import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

type PropsType = {
	modalText: string
	type: 'success' | 'error'
}

const Alert: FC<PropsType> = ({ modalText, type }) => {
	const isErrorAlert = type === 'error'

	return (
		<div className='w-screen h-screen fixed top-0 pt-12 z-50 flex justify-center items-start'>
			<div
				className={`w-full text-sm md:text-base max-w-72 md:max-w-md relative p-2 md:p-6 ${
					isErrorAlert ? 'bg-red-600' : 'bg-green-600'
				} flex justify-start items-center font-semibold`}
			>
				<FontAwesomeIcon
					icon={isErrorAlert ? faXmark : faCircleCheck}
					className='text-2xl mr-4'
				/>
				{modalText}
			</div>
		</div>
	)
}

export default Alert
