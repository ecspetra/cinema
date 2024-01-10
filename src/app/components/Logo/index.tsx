import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

type PropsType = {
	className?: string
}

const Logo: FC<PropsType> = ({ className }) => {
	return (
		<Link
			href={`/`}
			as={`/`}
			className={classNames(
				'flex justify-center items-center min-h-[34px]',
				className
			)}
		>
			<span className='font-black'>
				<span className='text-rose-600 pl-2 py-1 border-b-2 border-t-2 border-l-2 border-rose-600'>
					CINEMA&nbsp;
				</span>
				<span className='border-r-2 border-t-2 border-rose-600 pr-2 py-1'>
					Street
				</span>
			</span>
		</Link>
	)
}

export default Logo
