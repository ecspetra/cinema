import React, { FC, useEffect, useState } from 'react'
import defaultMovieImage from '../../../../app/assets/images/default-movie-image.svg'
import Link from 'next/link'
import Image from '../../../Images/Image/index'
import { getMoviePoster } from '@/handlers/getMoviePoster'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	itemId: number
	type: 'movie' | 'tv'
	mark?: number
	isLinkToMovie?: boolean
	className?: string
}

const MovieCardSmall: FC<PropsType> = ({
	itemId,
	type,
	mark,
	isLinkToMovie = false,
	className = false,
}) => {
	const [moviePoster, setMoviePoster] = useState<string>('')

	useEffect(() => {
		getMoviePoster(itemId, type).then(data => {
			setMoviePoster(data)
		})
	}, [])

	const movieCard = (
		<>
			<Image
				className='duration-300 mb-4 border-4'
				src={`https://image.tmdb.org/t/p/w440_and_h660_face${moviePoster}`}
				defaultImage={defaultMovieImage}
			/>
			{mark && (
				<span className='flex justify-center items-center'>
					<FontAwesomeIcon icon={faStar} className='text-rose-500' />
					<span className='ml-1 font-semibold'>{mark}</span>
				</span>
			)}
		</>
	)

	return (
		<span
			className={classNames(!mark && 'w-24 h-36', 'flex-none', className)}
		>
			{isLinkToMovie ? (
				<Link href={`/${type}/[id]`} as={`/${type}/${itemId}`}>
					{movieCard}
				</Link>
			) : (
				movieCard
			)}
		</span>
	)
}

export default MovieCardSmall
