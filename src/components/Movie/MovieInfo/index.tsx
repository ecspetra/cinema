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
import {
	IBackdrop,
	IMovieInfo,
	IReviewCard,
	IReviewCardFromDB,
	ITVShowInfo,
} from '../../../../interfaces'
import ImagesList from '../../../components/Images/ImagesList'
import Rating from '../../../components/Rating'
import Mark from '../../../components/Mark'
import ReviewsList from '../../Review/ReviewList'
import NewReviewForm from '../../Review/Form/NewReviewForm'
import Title from '../../../app/components/UI/Title/Title'
import { useAuth } from '@/context/AuthProvider'
import CollectionButton from '../../../app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import ReactPlayer from 'react-player'
import TVSeasonsList from '@/components/Movie/MovieInfo/TVSeasonsList'
import moment from 'moment'
import GenreList from '@/components/Genre/GenreList'

type PropsType = {
	basicInfo: IMovieInfo | ITVShowInfo
	movieImages: Array<IBackdrop>
	movieReviews: Array<IReviewCard | IReviewCardFromDB>
	movieVideo: string
}

const MovieInfo: FC<PropsType> = ({
	basicInfo,
	movieImages,
	movieReviews,
	movieVideo,
}) => {
	const { userId } = useAuth()

	const {
		title,
		name,
		id,
		genres,
		overview,
		production_companies,
		adult,
		tagline,
		poster_path,
		production_countries,
		release_date,
		first_air_date,
		vote_count,
		vote_average,
		seasons,
	} = basicInfo

	const isTVShowItem = !!(first_air_date && name)

	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(basicInfo, isTVShowItem ? 'tv' : 'movie')

	return (
		<div className='flex gap-7 py-7 z-10 mb-16'>
			<div className='w-full max-w-[340px]'>
				<div className='sticky top-28'>
					<Image
						src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`}
						defaultImage={defaultMovieImage}
					/>
				</div>
			</div>
			<div className='w-full'>
				<Title className='text-7xl after:hidden pb-0'>
					{title ? title : name}
				</Title>
				{tagline && (
					<Title variant='h2' className='text-gray-400'>
						{tagline}
					</Title>
				)}
				<GenreList genres={genres} />
				{adult && (
					<span className='bg-red-600 p-2 mb-4 font-semibold inline-block rounded-full'>
						18+
					</span>
				)}
				<div className='mb-5'>
					{(release_date || first_air_date) && (
						<div className='flex items-center text-sm'>
							<FontAwesomeIcon
								className='mr-1.5'
								icon={faCalendarCheck}
							/>
							<span className='mr-1.5'>
								{release_date
									? 'Release date:'
									: 'First air date:'}
							</span>
							{moment(
								release_date ? release_date : first_air_date
							).format('Do MMM YYYY')}
						</div>
					)}
					{production_countries.length > 0 && (
						<div className='flex items-center text-sm'>
							<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
							<span className='mr-1.5'>
								Production countries:
							</span>
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
					)}
					{production_companies.length > 0 && (
						<div className='flex items-center text-sm flex-wrap'>
							<FontAwesomeIcon className='mr-1.5' icon={faBolt} />
							<span className='mr-1.5'>
								Production companies:
							</span>
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
					)}
				</div>
				<Rating rating={vote_average} voteCount={vote_count} />
				<Mark
					movieId={id}
					movieTitle={title ? title : name}
					isTVShow={isTVShowItem}
				/>
				<p className='mb-6'>{overview}</p>
				<CollectionButton
					className='mb-12'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? openConfirmationPopup
							: handleSetCollectionItem
					}
				/>
				{isTVShowItem && <TVSeasonsList seasonsList={seasons} />}
				<ImagesList images={movieImages} />
				<ReviewsList movieId={id} reviews={movieReviews} />
				<NewReviewForm
					movieId={id}
					userId={userId}
					isTVShow={isTVShowItem}
				/>
				{movieVideo && (
					<div className='mt-16'>
						<Title>Trailer</Title>
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${movieVideo}`}
							controls={true}
							width={'100%'}
							style={{ minHeight: `500px` }}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default MovieInfo
