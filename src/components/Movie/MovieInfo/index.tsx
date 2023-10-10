import React, { FC } from 'react'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import {
	faBolt,
	faCalendarCheck,
	faFlag,
} from '@fortawesome/free-solid-svg-icons'
import Genre from '../../../components/Genre'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IBackdrop, IMovieInfo, IReviewCard } from '../../../../interfaces'
import ImagesList from '../../../components/Images/ImagesList'
import Rating from '../../../components/Rating'
import Mark from '../../../components/Mark'
import ReviewsList from '../../Review/ReviewsList'
import NewReviewForm from '../../Review/NewReviewForm'
import Title from '../../../app/components/UI/Title/Title'
import { useAuth } from '@/context/AuthProvider'
import CollectionButton from '../../../app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'

type PropsType = {
	movieInfo: IMovieInfo
	movieImages: Array<IBackdrop>
	movieReviews: Array<IReviewCard>
}

const MovieInfo: FC<PropsType> = ({ movieInfo, movieImages, movieReviews }) => {
	const { currentUser } = useAuth()
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		handleRemoveCollectionItem,
	} = useCollectionButton(movieInfo, 'movies')

	const {
		title,
		id,
		genres,
		overview,
		production_companies,
		adult,
		tagline,
		poster_path,
		production_countries,
		release_date,
		vote_count,
		vote_average,
	} = movieInfo

	return (
		<div className='flex gap-x-7 py-7 z-10 mb-16'>
			<div className='w-full max-w-[340px]'>
				<div className='sticky top-28'>
					<Image
						src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`}
						defaultImage={defaultMovieImage}
					/>
				</div>
			</div>
			<div className='w-full'>
				<Title className='text-7xl'>{title}</Title>
				{tagline && (
					<Title variant='h2' className='text-slate-400'>
						{tagline}
					</Title>
				)}
				{adult && <span>18+</span>}
				<div className='flex mb-5'>
					{genres.map((item, idx) => {
						return <Genre key={idx} genre={item} />
					})}
				</div>
				<div className='mb-5'>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5'>Release date:</span>
						{new Intl.DateTimeFormat('en-GB', {
							month: 'long',
							day: '2-digit',
							year: 'numeric',
						}).format(new Date(release_date))}
					</div>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
						<span className='mr-1.5'>Production countries:</span>
						{production_countries.map((item, idx) => {
							return (
								<span className='mr-1' key={item.name}>
									{idx === production_countries.length - 1
										? item.name
										: item.name + ','}
								</span>
							)
						})}
					</div>
					<div className='flex items-center text-sm flex-wrap'>
						<FontAwesomeIcon className='mr-1.5' icon={faBolt} />
						<span className='mr-1.5'>Production companies:</span>
						{production_companies.map((item, idx) => {
							return (
								<span className='mr-1' key={item.name}>
									{idx === production_companies.length - 1
										? item.name
										: item.name + ','}
								</span>
							)
						})}
					</div>
				</div>
				<Rating rating={vote_average} voteCount={vote_count} />
				<Mark movieId={id} />
				<p className='mb-6'>{overview}</p>
				<CollectionButton
					className='mb-12'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? () =>
									handleRemoveCollectionItem(
										id,
										currentUser?.uid
									)
							: () => handleSetCollectionItem(movieInfo)
					}
				/>
				<ImagesList images={movieImages} />
				<ReviewsList reviews={movieReviews} />
				<NewReviewForm />
			</div>
		</div>
	)
}

export default MovieInfo
