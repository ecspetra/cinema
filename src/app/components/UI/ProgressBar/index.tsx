import { FC } from 'react'

type PropsType = {
	progress: number
}

const ProgressBar: FC<PropsType> = ({ progress }) => {
	return (
		<div
			style={{
				width: `${progress}%`,
			}}
			className='h-1 bg-rose-600 mt-2'
		/>
	)
}

export default ProgressBar
