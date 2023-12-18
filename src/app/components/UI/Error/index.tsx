import { FC } from 'react'
import classNames from 'classnames'

type PropsType = {
	error: string
	className?: string
}

const Error: FC<PropsType> = ({ error, className }) => {
	return (
		<span
			className={classNames(
				'w-full text-sm text-rose-600 font-semibold block mt-2',
				className
			)}
		>
			{error}
		</span>
	)
}

export default Error
