import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

type PropsType = {
	modalText: string
	type: 'success' | 'error'
}

const Alert: FC<PropsType> = ({ modalText, type }) => {
	const isErrorAlert = type === 'error'

	return (
		<div className='w-screen h-screen fixed top-12 z-50 flex justify-center items-start'>
			<div
				className={`w-full max-w-md relative p-6 ${
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
