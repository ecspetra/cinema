import React, { FC, useEffect, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getMarkForMovie } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { IMarkFromDB } from '../../../../interfaces'
import classNames from 'classnames'

type PropsType = {
	movieId: number
	movieTitle: string
	className: string
}

const MarkSmall: FC<PropsType> = ({ movieId, movieTitle, className }) => {
	const [markData, setMarkData] = useState<IMarkFromDB | null>(null)
	const { isLoggedIn, userId } = useAuth()

	useEffect(() => {
		if (isLoggedIn) {
			const markData = {
				movieId,
				movieTitle,
			}
			getMarkForMovie(markData, userId).then(data => {
				setMarkData(data)
			})
		}
	}, [])

	if (!markData) return null

	return (
		<div
			className={classNames(
				'flex justify-center items-center bg-black border-2 border-amber-500 rounded-full w-14 h-14 z-10',
				className
			)}
		>
			<FontAwesomeIcon icon={faStar} className='text-amber-400' />
			<span className='ml-1 font-semibold'>{markData?.data.mark}</span>
		</div>
	)
}

export default MarkSmall
