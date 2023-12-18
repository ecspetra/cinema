import { NextPageContext } from 'next'
import MovieOrTVShowPersonList from '../../components/Person/PersonList/MovieOrTVShowPersonList'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import { UserCollections } from '@/constants/enum'
import MovieOrTVShowBasicInfo from '@/components/Movie/MovieOrTVShowBasicInfo'
import { IMovieOrTVShowData } from '../../../interfaces'
import { getMovieOrTvShowPageData } from '@/handlers/getMovieOrTvShowPageData'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'
import useMovieOrTVShowFetch from '@/hooks/useMovieOrTVShowFetch'
import { useRouter } from 'next/router'

const TVShowPage = ({
	tvShowFromProps,
}: {
	tvShowFromProps: IMovieOrTVShowData
}) => {
	const router = useRouter()
	const itemId = router.query.id as string
	const {
		data: tvShow,
		isLoading,
		urlToFetchSimilarItems,
	} = useMovieOrTVShowFetch(tvShowFromProps, itemId, UserCollections.tv)

	const tvShowTeaser =
		tvShow?.video && tvShow.video.length > 0
			? tvShow.video.find(
					item =>
						(item.type === 'Teaser' || item.type === 'Trailer') &&
						item.site === 'YouTube'
			  )
			: null
	const tvShowTeaserKey = tvShowTeaser?.key || ''

	if (!tvShow) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
	}

	return (
		<>
			<TopBanner imageSrc={tvShow?.images[0]?.file_path} />
			<MovieOrTVShowBasicInfo
				basicInfo={tvShow?.basicInfo}
				movieImages={tvShow?.images}
				movieReviews={tvShow?.reviewsFromAPIAndStorage}
				movieVideo={tvShowTeaserKey}
				collectionType={UserCollections.movie}
			/>
			<div>
				<MovieOrTVShowPersonList
					itemsList={tvShow?.credits.cast}
					title='Cast'
				/>
				<MovieOrTVShowPersonList
					itemsList={tvShow?.credits.crew}
					title='Crew'
				/>
				<ItemsListWrap
					itemsList={tvShow?.similarItemsList.items}
					collectionType={UserCollections.movie}
					isMoreDataAvailable={
						tvShow?.similarItemsList.isMoreDataAvailable
					}
					urlToFetchItems={urlToFetchSimilarItems}
					title='Similar movies'
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const tvShowId = ctx.query.id as string
	return getMovieOrTvShowPageData(tvShowId, UserCollections.tv)
		.then(data => {
			return {
				props: {
					tvShowPageProps: data,
				},
			}
		})
		.catch(() => {
			return {
				props: {
					tvShowPageProps: null,
				},
			}
		})
}

export default TVShowPage
