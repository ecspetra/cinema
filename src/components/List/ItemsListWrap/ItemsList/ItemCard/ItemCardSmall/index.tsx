import React, { FC, useEffect, useState } from 'react'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Link from 'next/link'
import Image from '../../../../../Images/Image'
import { getCover } from '@/handlers/getCover'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	itemId: number
	type: 'movie' | 'tv' | 'person'
	mark?: number
	isLinkToMovie?: boolean
	className?: string
}

const ItemCardSmall: FC<PropsType> = ({
	itemId,
	type,
	mark,
	isLinkToMovie = false,
	className = false,
}) => {
	const [itemCover, setItemCover] = useState<string>('')

	useEffect(() => {
		getCover(itemId, type).then(data => {
			setItemCover(data)
		})
	}, [])

	const itemCard = (
		<>
			<Image
				className='duration-300 mb-4 border-4'
				src={`https://image.tmdb.org/t/p/w440_and_h660_face${itemCover}`}
				defaultImage={
					type !== 'person' ? defaultMovieImage : defaultUserImage
				}
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
					{itemCard}
				</Link>
			) : (
				itemCard
			)}
		</span>
	)
}

export default ItemCardSmall
