import { NextPageContext } from 'next'
import { URL_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import MoviePersonsList from '../../components/Person/PersonList/MoviePersonList'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import { UserCollections } from '@/constants/enum'
import { getMovieOrTvShowData } from '@/handlers/getMovieOrTvShowData'
import {
	IBackdrop,
	IFetchedResult,
	IItemCard,
	IMovieOrTVShowBasicInfo,
	IReviewCard,
	IVideoData,
} from '../../../interfaces'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'
import MovieOrTVShowBasicInfo from '@/components/Movie/MovieOrTVShowBasicInfo'

interface IMoviePageProps {
	basicInfo: IMovieOrTVShowBasicInfo
	credits: { cast: IItemCard[]; crew: IItemCard[] }
	images: IBackdrop[]
	video: IVideoData[]
	reviewsFromAPIAndStorage: IReviewCard[]
	similarItemsList: IFetchedResult<IItemCard>
}

const MoviePage = ({ moviePageProps }: { moviePageProps: IMoviePageProps }) => {
	const { showModal } = useModal()
	const router = useRouter()
	const movieId = router.query.id as string
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [movie, setMovie] = useState<IMoviePageProps | null>(null)
	const [urlToFetchSimilarMovies, setUrlToFetchSimilarMovies] =
		useState<string>(
			URL_TO_FETCH_SIMILAR_LIST.replace('{itemId}', movieId).replace(
				'{collectionType}',
				UserCollections.movie
			)
		)
	const movieTeaser =
		movie?.video && movie.video.length > 0
			? movie.video.find(
					item =>
						(item.type === 'Teaser' || item.type === 'Trailer') &&
						item.site === 'YouTube'
			  )
			: null
	const movieTeaserKey = movieTeaser?.key || ''

	useEffect(() => {
		const getMovieData = async () => {
			const movieId = router.query.id as string

			setIsLoading(true)
			setMovie(null)

			setUrlToFetchSimilarMovies(
				URL_TO_FETCH_SIMILAR_LIST.replace('{itemId}', movieId).replace(
					'{collectionType}',
					UserCollections.movie
				)
			)

			getMovieOrTvShowData(movieId, UserCollections.movie)
				.then(data => {
					setMovie(data)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoading(false)
				})
		}

		if (!moviePageProps) {
			getMovieData()
		} else setMovie(moviePageProps)
	}, [router.query.id])

	if (!movie) {
		if (isLoading) {
			return <Loader className='bg-transparent' />
		} else {
			return (
				<ErrorScreen
					title='Something went wrong'
					text='No data found'
				/>
			)
		}
	}

	return (
		<>
			<TopBanner imageSrc={movie?.images[0]?.file_path} />
			<MovieOrTVShowBasicInfo
				basicInfo={movie?.basicInfo}
				movieImages={movie?.images}
				movieReviews={movie?.reviewsFromAPIAndStorage}
				movieVideo={movieTeaserKey}
				collectionType={UserCollections.movie}
			/>
			<div>
				<MoviePersonsList
					itemsList={movie?.credits.cast}
					title='Cast'
				/>
				<MoviePersonsList
					itemsList={movie?.credits.crew}
					title='Crew'
				/>
				<ItemsListWrap
					itemsList={movie?.similarItemsList.items}
					collectionType={UserCollections.movie}
					isMoreDataAvailable={
						movie?.similarItemsList.isMoreDataAvailable
					}
					urlToFetchItems={urlToFetchSimilarMovies}
					title='Similar movies'
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const movieId = ctx.query.id as string
	return getMovieOrTvShowData(movieId, UserCollections.movie)
		.then(data => {
			return {
				props: {
					moviePageProps: data,
				},
			}
		})
		.catch(() => {
			return {
				props: {
					moviePageProps: null,
				},
			}
		})
}

export default MoviePage
