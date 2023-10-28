import React, { FC, useEffect, useState } from 'react'
import defaultMovieImage from '../../../../app/assets/images/default-movie-image.svg'
import Link from 'next/link'
import Image from '../../../Images/Image/index'
import { getMoviePoster } from '@/handlers/getMoviePoster'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	movieId: number
	mark?: number
	isLinkToMovie?: boolean
}

const MovieCardSmall: FC<PropsType> = ({
	movieId,
	mark,
	isLinkToMovie = false,
}) => {
	const [moviePoster, setMoviePoster] = useState<string>('')

	useEffect(() => {
		getMoviePoster(movieId).then(data => {
			setMoviePoster(data)
		})
	}, [])

	const movieCard = (
		<>
			<Image
				className='duration-300 mb-4 group-hover:shadow-amber-700/30 group-hover:shadow-2xl'
				src={`https://image.tmdb.org/t/p/w440_and_h660_face${moviePoster}`}
				defaultImage={defaultMovieImage}
			/>
			{mark && (
				<div className='flex justify-center items-center'>
					<FontAwesomeIcon icon={faStar} className='text-amber-400' />
					<span className='ml-1 font-semibold'>{mark}</span>
				</div>
			)}
		</>
	)

	return (
		<div className={classNames(!mark && 'w-24 h-36', 'flex-none')}>
			{isLinkToMovie ? (
				<Link
					href='/movie/[id]'
					as={`/movie/${movieId}`}
					className='group'
				>
					{movieCard}
				</Link>
			) : (
				movieCard
			)}
		</div>
	)
}

export default MovieCardSmall
