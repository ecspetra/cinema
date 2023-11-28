import { NextPageContext } from 'next'
import { URL_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import MoviePersonsList from '../../components/Person/PersonList/MoviePersonList'
import MovieInfo from '../../components/Movie/MovieInfo'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { getDBReviewsList } from '@/firebase/config'
import { fetchItemData } from '@/handlers/fetchItemData'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const TVShow = ({ tvShowFromProps }) => {
	const router = useRouter()
	const [movie, setMovie] = useState(null)
	const [urlToFetchSimilarMovies, setUrlToFetchSimilarMovies] = useState(
		URL_TO_FETCH_SIMILAR_LIST.replace('{itemId}', router.query.id).replace(
			'{listName}',
			'tv'
		)
	)
	const movieTeaser =
		movie &&
		movie.videosResult.results.find(
			item => item.type === 'Teaser' || item.type === 'Trailer'
		)

	useEffect(() => {
		const fetchData = async () => {
			setMovie(null)

			setUrlToFetchSimilarMovies(
				URL_TO_FETCH_SIMILAR_LIST.replace(
					'{itemId}',
					router.query.id
				).replace('{listName}', 'tv')
			)

			try {
				const getMovieReviews = async () => {
					const collectionReviews = await getDBReviewsList(
						router.query.id,
						'reviews'
					)

					return collectionReviews
				}

				const [
					basicInfoResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
					reviewsFromDB,
					similarMoviesResult,
				] = await Promise.all([
					fetchItemData('tv', router.query.id, ''),
					fetchItemData('tv', router.query.id, '/credits'),
					fetchItemData('tv', router.query.id, '/images'),
					fetchItemData('tv', router.query.id, '/reviews'),
					fetchItemData('tv', router.query.id, '/videos'),
					getMovieReviews(),
					getResultsByPage(urlToFetchSimilarMovies, 1),
				])

				const reviews = [...reviewsResult.results, ...reviewsFromDB]

				setMovie({
					basicInfoResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
					reviews,
					similarMoviesResult,
				})
			} catch (error) {
				setMovie(null)
			}
		}

		if (!tvShowFromProps) {
			fetchData()
		}
	}, [router.query.id])

	useEffect(() => {
		setMovie(tvShowFromProps)
	}, [tvShowFromProps])

	if (
		!movie ||
		![
			'basicInfoResult',
			'creditsResult',
			'imagesResult',
			'reviewsResult',
			'videosResult',
			'similarMoviesResult',
		].every(prop => movie[prop])
	) {
		return <Loader className='bg-transparent' />
	}

	return (
		<>
			<TopBanner imageSrc={movie.imagesResult.backdrops[0]?.file_path} />
			<MovieInfo
				basicInfo={movie.basicInfoResult}
				movieImages={movie.imagesResult.backdrops}
				movieReviews={movie.reviews}
				movieVideo={movieTeaser?.key}
			/>
			<div>
				<MoviePersonsList
					personsFromProps={movie.creditsResult.cast}
					title='Cast'
				/>
				<MoviePersonsList
					personsFromProps={movie.creditsResult.crew}
					title='Crew'
				/>
				<ItemsListWrap
					itemsList={movie.similarMoviesResult.items}
					listName='tv'
					title='Similar movies'
					isMoreDataAvailable={
						movie.similarMoviesResult.isMoreDataAvailable
					}
					urlToFetchItems={urlToFetchSimilarMovies}
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const urlToFetchSimilarShows = URL_TO_FETCH_SIMILAR_LIST.replace(
			'{itemId}',
			ctx.query.id
		).replace('{listName}', 'tv')

		const getMovieReviews = async () => {
			const collectionReviews = await getDBReviewsList(
				ctx.query.id,
				'reviews'
			)
			return collectionReviews
		}

		const [
			basicInfoResult,
			creditsResult,
			imagesResult,
			reviewsResult,
			videosResult,
			reviewsFromDB,
			similarMoviesResult,
		] = await Promise.all([
			fetchItemData('tv', ctx.query.id, ''),
			fetchItemData('tv', ctx.query.id, '/credits'),
			fetchItemData('tv', ctx.query.id, '/images'),
			fetchItemData('tv', ctx.query.id, '/reviews'),
			fetchItemData('tv', ctx.query.id, '/videos'),
			getMovieReviews(),
			getResultsByPage(urlToFetchSimilarShows, 1),
		])

		const reviews = [...reviewsResult.results, ...reviewsFromDB]

		return {
			props: {
				tvShowFromProps: {
					basicInfoResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
					reviews,
					similarMoviesResult,
				},
			},
		}
	} catch (error) {
		return {
			props: {
				tvShowFromProps: null,
			},
		}
	}
}

export default TVShow
