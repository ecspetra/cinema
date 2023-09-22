import { NextPageContext } from 'next'
import { API_KEY } from '@/constants/links'
import Title from '@/app/components/UI/Title/Title'
import MoviePersonsList from '@/components/PersonsList/MoviePersonsList'
import MovieInfo from '@/components/Movie/MovieInfo'
import MoviesListDefault from '@/components/Movie/MoviesList/MoviesListDefault'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Movie = ({ movieFromProps }) => {
	const [movie, setMovie] = useState(movieFromProps)
	const router = useRouter()
	const linkToFetchSimilarMovies =
		movie.movieResult &&
		`https://api.themoviedb.org/3/movie/${movie.movieResult.id}/similar?api_key=${API_KEY}&page=`

	useEffect(() => {
		const fetchData = async () => {
			setMovie([])

			const fetchMovieData = async queryParam => {
				const linkToFetch = `https://api.themoviedb.org/3/movie/${router.query.id}${queryParam}?api_key=${API_KEY}`
				const response = await fetch(linkToFetch)
				return await response.json()
			}

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
					fetchMovieData('/similar'),
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
		return <div>Loading...</div>
	}

	return (
		<>
			<MovieInfo
				movieInfo={movie.movieResult}
				movieImages={movie.imagesResult.backdrops}
				movieReviews={movie.reviewsResult.results}
			/>
			<div>
				<Title>Cast</Title>
				<MoviePersonsList personsFromProps={movie.creditsResult.cast} />
				<Title>Crew</Title>
				<MoviePersonsList personsFromProps={movie.creditsResult.crew} />
				<Title>Similar movies</Title>
				<MoviesListDefault
					moviesFromProps={movie.similarMoviesResult.results}
					linkToFetchMovies={linkToFetchSimilarMovies}
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const fetchMovieData = async queryParam => {
			const linkToFetch = `https://api.themoviedb.org/3/movie/${ctx.query.id}${queryParam}?api_key=${API_KEY}`
			const response = await fetch(linkToFetch)
			return response.json()
		}

		const fetchMovieMark = async () => {}

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
			fetchMovieData('/similar'),
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
				movieFromProps: [],
			},
		}
	}
}

export default Movie
