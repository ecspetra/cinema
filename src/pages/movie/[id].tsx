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

const Movie = ({ movieFromProps }) => {
	const router = useRouter()
	const [movie, setMovie] = useState(null)
	const [urlToFetchSimilarMovies, setUrlToFetchSimilarMovies] = useState(
		URL_TO_FETCH_SIMILAR_LIST.replace('{itemId}', router.query.id).replace(
			'{collectionType}',
			'movie'
		)
	)
	const movieTeaser =
		movie &&
		movie.videosResult.results.find(
			item =>
				(item.type === 'Teaser' || item.type === 'Trailer') &&
				item.site === 'YouTube'
		)

	useEffect(() => {
		const fetchData = async () => {
			setMovie(null)

			setUrlToFetchSimilarMovies(
				URL_TO_FETCH_SIMILAR_LIST.replace(
					'{itemId}',
					router.query.id
				).replace('{collectionType}', 'movie')
			)

			try {
				const collectionTypeToFetch = 'movie'
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
					fetchItemData(collectionTypeToFetch, router.query.id, ''),
					fetchItemData(
						collectionTypeToFetch,
						router.query.id,
						'/credits'
					),
					fetchItemData(
						collectionTypeToFetch,
						router.query.id,
						'/images'
					),
					fetchItemData(
						collectionTypeToFetch,
						router.query.id,
						'/reviews'
					),
					fetchItemData(
						collectionTypeToFetch,
						router.query.id,
						'/videos'
					),
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

		if (!movieFromProps) {
			fetchData()
		}
	}, [router.query.id])

	useEffect(() => {
		setMovie(movieFromProps)
	}, [movieFromProps])

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
				collectionType='movie'
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
					collectionType='movie'
					isMoreDataAvailable={
						movie.similarMoviesResult.isMoreDataAvailable
					}
					urlToFetchItems={urlToFetchSimilarMovies}
					title='Similar movies'
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const collectionTypeToFetch = 'movie'
		const urlToFetchSimilarMovies = URL_TO_FETCH_SIMILAR_LIST.replace(
			'{itemId}',
			ctx.query.id
		).replace('{collectionType}', 'movie')

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
			fetchItemData(collectionTypeToFetch, ctx.query.id, ''),
			fetchItemData(collectionTypeToFetch, ctx.query.id, '/credits'),
			fetchItemData(collectionTypeToFetch, ctx.query.id, '/images'),
			fetchItemData(collectionTypeToFetch, ctx.query.id, '/reviews'),
			fetchItemData(collectionTypeToFetch, ctx.query.id, '/videos'),
			getMovieReviews(),
			getResultsByPage(urlToFetchSimilarMovies, 1),
		])

		const reviews = [...reviewsResult.results, ...reviewsFromDB]

		return {
			props: {
				movieFromProps: {
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
				movieFromProps: null,
			},
		}
	}
}

export default Movie
