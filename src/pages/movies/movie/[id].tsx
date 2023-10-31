import { NextPageContext } from 'next'
import { LINK_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import MoviePersonsList from '../../../components/Person/PersonList/MoviePersonList'
import MovieInfo from '../../../components/Movie/MovieInfo'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import ItemsList from '@/components/List/ItemsList'
import { getDBReviewsList } from '@/firebase/config'
import { fetchMovieData } from '@/handlers/fetchMovieData'

const Movie = ({ movieFromProps }) => {
	const router = useRouter()
	const [movie, setMovie] = useState(null)
	const [linkToFetchSimilarMovies, setLinkToFetchSimilarMovies] = useState(
		LINK_TO_FETCH_SIMILAR_LIST.replace('{itemId}', router.query.id).replace(
			'{listName}',
			'movie'
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

			setLinkToFetchSimilarMovies(
				LINK_TO_FETCH_SIMILAR_LIST.replace(
					'{itemId}',
					router.query.id
				).replace('{listName}', 'movie')
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
					fetchMovieData('movie', router.query.id, ''),
					fetchMovieData('movie', router.query.id, '/credits'),
					fetchMovieData('movie', router.query.id, '/images'),
					fetchMovieData('movie', router.query.id, '/reviews'),
					fetchMovieData('movie', router.query.id, '/videos'),
					getMovieReviews(),
					getResultsByPage(linkToFetchSimilarMovies, 1),
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
				<ItemsList
					itemsList={movie.similarMoviesResult.items}
					listName='movie'
					title='Similar movies'
					isMoreDataAvailable={
						movie.similarMoviesResult.isMoreDataAvailable
					}
					linkToFetchItems={linkToFetchSimilarMovies}
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const linkToFetchSimilarMovies = LINK_TO_FETCH_SIMILAR_LIST.replace(
			'{itemId}',
			ctx.query.id
		).replace('{listName}', 'movie')

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
			fetchMovieData('movie', ctx.query.id, ''),
			fetchMovieData('movie', ctx.query.id, '/credits'),
			fetchMovieData('movie', ctx.query.id, '/images'),
			fetchMovieData('movie', ctx.query.id, '/reviews'),
			fetchMovieData('movie', ctx.query.id, '/videos'),
			getMovieReviews(),
			getResultsByPage(linkToFetchSimilarMovies, 1),
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
				movieFromProps: {},
			},
		}
	}
}

export default Movie
