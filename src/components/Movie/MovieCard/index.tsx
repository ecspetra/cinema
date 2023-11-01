import { IMovieCard, ITVShowCard } from '../../../../interfaces'
import React, { FC } from 'react'
import defaultMovieImage from '../../../app/assets/images/default-movie-image.svg'
import Link from 'next/link'
import Image from '../../Images/Image/index'
import Title from '../../../app/components/UI/Title/Title'
import Genre from '../../Genre/index'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import { useAuth } from '@/context/AuthProvider'
import MarkSmall from '@/components/Mark/MarkSmall'
import moment from 'moment'

type PropsType = {
	item: IMovieCard | ITVShowCard
	isShowButton?: boolean
	isTVShow?: boolean
}

const MovieCard: FC<PropsType> = ({
	item,
	isShowButton = true,
	isTVShow = false,
}) => {
	const { userId } = useAuth()
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		handleRemoveCollectionItem,
	} = useCollectionButton(item, 'movie')

	const {
		id,
		genres,
		poster_path,
		first_air_date,
		name,
		release_date,
		title,
	} = item
	const isShowGenres = genres?.length > 0

	return (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link
				href={isTVShow ? '/tv/[id]' : '/movie/[id]'}
				as={isTVShow ? `/tv/${id}` : `/movie/${id}`}
				className='group relative'
			>
				<MarkSmall
					movieId={id}
					movieTitle={title ? title : name}
					className='absolute -right-3 -top-3'
				/>
				<Image
					className='duration-300 mb-4 group-hover:shadow-amber-700/30 group-hover:shadow-2xl'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`}
					defaultImage={defaultMovieImage}
				/>
				<Title className='relative z-10' variant='h3'>
					{title ? title : name}
					{(release_date || first_air_date) && (
						<span className='ml-1'>
							(
							{moment(
								release_date ? release_date : first_air_date
							).format('YYYY')}
							)
						</span>
					)}
				</Title>
			</Link>
			{isShowGenres && (
				<div className='flex flex-wrap mb-2 relative z-10'>
					{genres.map((item, idx) => {
						return <Genre key={idx} genre={item} />
					})}
				</div>
			)}
			{isShowButton && (
				<CollectionButton
					className='mt-auto w-full'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? () => handleRemoveCollectionItem(item.id, userId)
							: () => handleSetCollectionItem(item)
					}
				/>
			)}
		</div>
	)
}

export default MovieCard
