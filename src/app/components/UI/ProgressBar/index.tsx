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
			className='h-2 bg-amber-500'
		/>
	)
}

export default ProgressBar
