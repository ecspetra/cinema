import { NextPageContext } from 'next'
import MovieOrTVShowPersonList from '../../components/Person/PersonList/MovieOrTVShowPersonList'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import { UserCollections } from '@/constants/enum'
import { getMovieOrTvShowPageData } from '@/handlers/getMovieOrTvShowPageData'
import { IMovieOrTVShowData } from '../../../interfaces'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'
import MovieOrTVShowBasicInfo from '@/components/Movie/MovieOrTVShowBasicInfo'
import useMovieOrTVShowFetch from '@/hooks/useMovieOrTVShowFetch'
import { useRouter } from 'next/router'

const MoviePage = ({
	moviePageProps,
}: {
	moviePageProps: IMovieOrTVShowData
}) => {
	const router = useRouter()
	const movieId = router.query.id as string
	const {
		data: movie,
		isLoading,
		urlToFetchSimilarItems,
	} = useMovieOrTVShowFetch(moviePageProps, movieId, UserCollections.movie)

	const movieTeaser =
		movie?.video && movie.video.length > 0
			? movie.video.find(
					item =>
						(item.type === 'Teaser' || item.type === 'Trailer') &&
						item.site === 'YouTube'
			  )
			: null
	const movieTeaserKey = movieTeaser?.key || ''

	if (!movie) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
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
				<MovieOrTVShowPersonList
					itemsList={movie?.credits.cast}
					title='Cast'
				/>
				<MovieOrTVShowPersonList
					itemsList={movie?.credits.crew}
					title='Crew'
				/>
				<ItemsListWrap
					itemsList={movie?.similarItemsList.items}
					collectionType={UserCollections.movie}
					isMoreDataAvailable={
						movie?.similarItemsList.isMoreDataAvailable
					}
					urlToFetchItems={urlToFetchSimilarItems}
					title='Similar movies'
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const movieId = ctx.query.id as string
	return getMovieOrTvShowPageData(movieId, UserCollections.movie)
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
