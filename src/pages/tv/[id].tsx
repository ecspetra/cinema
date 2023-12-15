import { NextPageContext } from 'next'
import { URL_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import MoviePersonsList from '../../components/Person/PersonList/MoviePersonList'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import { UserCollections } from '@/constants/enum'
import MovieOrTVShowBasicInfo from '@/components/Movie/MovieOrTVShowBasicInfo'
import {
	IBackdrop,
	IFetchedResult,
	IItemCard,
	IMovieOrTVShowBasicInfo,
	IReviewCard,
	IVideoData,
} from '../../../interfaces'
import { getMovieOrTvShowData } from '@/handlers/getMovieOrTvShowData'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'

interface ITVShowPageProps {
	basicInfo: IMovieOrTVShowBasicInfo
	credits: { cast: IItemCard[]; crew: IItemCard[] }
	images: IBackdrop[]
	video: IVideoData[]
	reviewsFromAPIAndStorage: IReviewCard[]
	similarItemsList: IFetchedResult<IItemCard>
}

const TVShowPage = ({
	tvShowFromProps,
}: {
	tvShowFromProps: ITVShowPageProps
}) => {
	const { showModal } = useModal()
	const router = useRouter()
	const tvShowId = router.query.id as string
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [tvShow, setTVShow] = useState<ITVShowPageProps | null>(null)
	const [urlToFetchSimilarMovies, setUrlToFetchSimilarMovies] =
		useState<string>(
			URL_TO_FETCH_SIMILAR_LIST.replace('{itemId}', tvShowId).replace(
				'{collectionType}',
				UserCollections.tv
			)
		)
	const tvShowTeaser =
		tvShow?.video && tvShow.video.length > 0
			? tvShow.video.find(
					item =>
						(item.type === 'Teaser' || item.type === 'Trailer') &&
						item.site === 'YouTube'
			  )
			: null
	const tvShowTeaserKey = tvShowTeaser?.key || ''

	useEffect(() => {
		const getTVShowData = async () => {
			const tvShowId = router.query.id as string

			setIsLoading(true)
			setTVShow(null)

			setUrlToFetchSimilarMovies(
				URL_TO_FETCH_SIMILAR_LIST.replace('{itemId}', tvShowId).replace(
					'{collectionType}',
					UserCollections.tv
				)
			)

			getMovieOrTvShowData(tvShowId, UserCollections.movie)
				.then(data => {
					setTVShow(data)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoading(false)
				})
		}

		if (!tvShowFromProps) {
			getTVShowData()
		} else setTVShow(tvShowFromProps)
	}, [router.query.id])

	if (!tvShow) {
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
			<TopBanner imageSrc={tvShow?.images[0]?.file_path} />
			<MovieOrTVShowBasicInfo
				basicInfo={tvShow?.basicInfo}
				movieImages={tvShow?.images}
				movieReviews={tvShow?.reviewsFromAPIAndStorage}
				movieVideo={tvShowTeaserKey}
				collectionType={UserCollections.movie}
			/>
			<div>
				<MoviePersonsList
					itemsList={tvShow?.credits.cast}
					title='Cast'
				/>
				<MoviePersonsList
					itemsList={tvShow?.credits.crew}
					title='Crew'
				/>
				<ItemsListWrap
					itemsList={tvShow?.similarItemsList.items}
					collectionType={UserCollections.movie}
					isMoreDataAvailable={
						tvShow?.similarItemsList.isMoreDataAvailable
					}
					urlToFetchItems={urlToFetchSimilarMovies}
					title='Similar movies'
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const tvShowId = ctx.query.id as string
	return getMovieOrTvShowData(tvShowId, UserCollections.tv)
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
