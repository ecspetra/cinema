import { IMovieCard } from '../../../../interfaces'
import React, { FC } from 'react'
import defaultMovieImage from '../../../app/assets/images/default-movie-image.svg'
import Link from 'next/link'
import Image from '../../Images/Image/index'
import Title from '../../../app/components/UI/Title/Title'
import Genre from '../../Genre/index'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import { useAuth } from '@/context/AuthProvider'

type PropsType = {
	movie: IMovieCard
	isShowButton?: boolean
}

const MovieCard: FC<PropsType> = ({ movie, isShowButton = true }) => {
	const { currentUser } = useAuth()
	const userId = currentUser?.uid
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		handleRemoveCollectionItem,
	} = useCollectionButton(movie, 'movies')

	const { id, genres, poster_path, release_date, title } = movie
	const isShowGenres = genres?.length > 0

	return (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link href='/movie/[id]' as={`/movie/${id}`} className='group'>
				<Image
					className='duration-300 mb-4 group-hover:shadow-red-700/70 group-hover:shadow-2xl'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`}
					defaultImage={defaultMovieImage}
				/>
				<Title
					className='relative z-10'
					variant='h3'
				>{`${title} (${new Date(release_date)
					.getFullYear()
					.toString()})`}</Title>
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
							? () => handleRemoveCollectionItem(movie.id, userId)
							: () => handleSetCollectionItem(movie)
					}
				/>
			)}
		</div>
	)
}

export default MovieCard
