import MainLayout from "../components/MainLayout"
import MoviesListDefault from "../components/Movie/MoviesList/MoviesListDefault"
import { NextPageContext } from 'next'
import {LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE} from "@/constants/links"
import {useEffect, useState} from "react"
import Title from "@/app/components/UI/Title/Title";
import {AuthProvider} from "../context/AuthProvider";

const Home = ({ moviesFromProps }) => {
	const [homePageMovies, setHomePageMovies] = useState(moviesFromProps)

	useEffect(() => {
		const fetchHomePageMovies = async () => {
			try {
				const response = await fetch(LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE)
				const result = await response.json()
				setHomePageMovies(result.results)
			} catch (error) {
				setHomePageMovies([])
			}
		}

		if (!moviesFromProps) fetchHomePageMovies()
	}, [])

	if (!homePageMovies.length) return <div>Loading</div>

	return (
		<>
			<Title className="text-7xl">Discover movies</Title>
			<MoviesListDefault moviesFromProps={homePageMovies} />
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const response = await fetch(LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE)
		const result = await response.json()
		return {
			props: {
				moviesFromProps: result.results,
			},
		}
	} catch (error) {
		return {
			props: {
				moviesFromProps: [],
			},
		}
	}
}

export default Home
