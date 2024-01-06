import { FC, useEffect, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '@/context/AuthProvider'
import { IMarkFromDB } from '../../../../interfaces'
import classNames from 'classnames'
import { getMarkForMovieOrTVShow } from '@/firebase/handlers/markHandlers/getMarkForMovieOrTVShow'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	markedItemId: number
	collectionType: UserCollections.movie | UserCollections.tv
	className: string
}

const MarkSmall: FC<PropsType> = ({
	markedItemId,
	collectionType,
	className,
}) => {
	const [markData, setMarkData] = useState<IMarkFromDB | null>(null)
	const { isLoggedIn, userId } = useAuth()

	useEffect(() => {
		if (isLoggedIn) {
			getMarkForMovieOrTVShow(markedItemId, userId, collectionType).then(
				data => {
					if (data) setMarkData(data)
				}
			)
		}
	}, [])

	if (!markData) return null

	return (
		<div
			className={classNames(
				'flex justify-center items-center bg-white rounded-full w-14 h-14 z-10 text-rose-500',
				className
			)}
		>
			<FontAwesomeIcon icon={faStar} />
			<span className='ml-1 font-semibold'>
				{markData?.data.markValue}
			</span>
		</div>
	)
}

export default MarkSmall
