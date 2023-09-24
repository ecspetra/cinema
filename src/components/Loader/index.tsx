import { FC } from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	className?: string
	isShowText?: boolean
}

const Loader: FC<PropsType> = ({ className, isShowText = false }) => {
	return (
		<span
			className={classNames(
				'w-full h-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 flex justify-center items-center',
				className
			)}
		>
			{isShowText && <span className='mr-2'>Loading</span>}
			<FontAwesomeIcon
				className='w-4 h-4 animate-spin'
				icon={faCircleNotch}
			/>
		</span>
	)
}

export default Loader
