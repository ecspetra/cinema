import { FC, useState } from 'react'
import { getDefaultImage } from '@/handlers/getDefaultImage'
import Loader from '../../../components/Loader'
import classNames from 'classnames'
import { IDefaultImage } from '../../../../interfaces'

type PropsType = {
	src: string
	defaultImage: IDefaultImage
	className?: string
	loaderClassName?: string
}

const Image: FC<PropsType> = ({
	src,
	defaultImage,
	className,
	loaderClassName,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	return (
		<span
			className={classNames(
				className,
				'relative block aspect-[2/3] w-full overflow-hidden'
			)}
		>
			<img
				onError={event => getDefaultImage(event, defaultImage)}
				onLoad={() => {
					setIsLoading(false)
				}}
				src={src}
				alt='image'
				className='block object-cover w-full h-full'
			/>
			{isLoading && <Loader className={loaderClassName} />}
		</span>
	)
}

export default Image
