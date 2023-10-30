import { NextPageContext } from 'next'
import {
	API_KEY,
	LINK_TO_FETCH_SIMILAR_MOVIE_LIST,
} from '@/constants/linksToFetch'
import MoviePersonsList from '../../components/Person/PersonList/MoviePersonList'
import MovieInfo from '@/components/Movie/MovieInfo'
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
		LINK_TO_FETCH_SIMILAR_MOVIE_LIST.replace('{movieId}', router.query.id)
	)

	useEffect(() => {
		const fetchData = async () => {
			setMovie(null)

			setLinkToFetchSimilarMovies(
				LINK_TO_FETCH_SIMILAR_MOVIE_LIST.replace(
					'{movieId}',
					router.query.id
				)
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
					movieResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
					reviewsFromDB,
					similarMoviesResult,
				] = await Promise.all([
					fetchMovieData(router.query.id, ''),
					fetchMovieData(router.query.id, '/credits'),
					fetchMovieData(router.query.id, '/images'),
					fetchMovieData(router.query.id, '/reviews'),
					fetchMovieData(router.query.id, '/videos'),
					getMovieReviews(),
					getResultsByPage(linkToFetchSimilarMovies, 1),
				])

				const reviews = [...reviewsResult.results, ...reviewsFromDB]

				setMovie({
					movieResult,
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
			'movieResult',
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
				movieInfo={movie.movieResult}
				movieImages={movie.imagesResult.backdrops}
				movieReviews={movie.reviews}
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
					listName='movies'
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
		const linkToFetchSimilarMovies =
			LINK_TO_FETCH_SIMILAR_MOVIE_LIST.replace('{movieId}', ctx.query.id)

		const getMovieReviews = async () => {
			const collectionReviews = await getDBReviewsList(
				ctx.query.id,
				'reviews'
			)
			return collectionReviews
		}

		const [
			movieResult,
			creditsResult,
			imagesResult,
			reviewsResult,
			videosResult,
			reviewsFromDB,
			similarMoviesResult,
		] = await Promise.all([
			fetchMovieData(ctx.query.id, ''),
			fetchMovieData(ctx.query.id, '/credits'),
			fetchMovieData(ctx.query.id, '/images'),
			fetchMovieData(ctx.query.id, '/reviews'),
			fetchMovieData(ctx.query.id, '/videos'),
			getMovieReviews(),
			getResultsByPage(linkToFetchSimilarMovies, 1),
		])

		const reviews = [...reviewsResult.results, ...reviewsFromDB]

		return {
			props: {
				movieFromProps: {
					movieResult,
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
