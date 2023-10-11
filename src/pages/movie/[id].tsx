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

const Movie = ({ movieFromProps }) => {
	const [movie, setMovie] = useState(movieFromProps)
	const router = useRouter()
	const linkToFetchSimilarMovies =
		movie.movieResult &&
		LINK_TO_FETCH_SIMILAR_MOVIE_LIST.replace(
			'{movieId}',
			movie.movieResult.id
		)

	useEffect(() => {
		const fetchData = async () => {
			setMovie([])

			try {
				const fetchMovieData = async queryParam => {
					const linkToFetch = `https://api.themoviedb.org/3/movie/${router.query.id}${queryParam}?api_key=${API_KEY}`
					const response = await fetch(linkToFetch)
					return response.json()
				}

				const [
					movieResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
					similarMoviesResult,
				] = await Promise.all([
					fetchMovieData(''),
					fetchMovieData('/credits'),
					fetchMovieData('/images'),
					fetchMovieData('/reviews'),
					fetchMovieData('/videos'),
					getResultsByPage(linkToFetchSimilarMovies, 1),
				])

				setMovie({
					movieResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
					similarMoviesResult,
				})
			} catch (error) {
				setMovie([])
			}
		}

		if (router.query.id) {
			fetchData()
		}
	}, [router.query.id])

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
			<TopBanner imageSrc={movie.imagesResult.backdrops[0].file_path} />
			<MovieInfo
				movieInfo={movie.movieResult}
				movieImages={movie.imagesResult.backdrops}
				movieReviews={movie.reviewsResult.results}
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
		const fetchMovieData = async (queryParam: string) => {
			const linkToFetch = `https://api.themoviedb.org/3/movie/${ctx.query.id}${queryParam}?api_key=${API_KEY}`
			const response = await fetch(linkToFetch)
			return response.json()
		}

		const [
			movieResult,
			creditsResult,
			imagesResult,
			reviewsResult,
			videosResult,
			similarMoviesResult,
		] = await Promise.all([
			fetchMovieData(''),
			fetchMovieData('/credits'),
			fetchMovieData('/images'),
			fetchMovieData('/reviews'),
			fetchMovieData('/videos'),
			getResultsByPage(linkToFetchSimilarMovies, 1),
		])

		return {
			props: {
				movieFromProps: {
					movieResult,
					creditsResult,
					imagesResult,
					reviewsResult,
					videosResult,
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
