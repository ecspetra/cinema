import MainLayout from "../components/MainLayout";
import MoviesListDefault from "../components/MoviesList/MoviesListDefault";
import { NextPageContext } from 'next'
// import {useState} from "react";

export const getServerSideProps = async (ctx: NextPageContext) => {
	const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
	const movies = await res.json()
	console.log('test', movies)

	return { props: { movies } }
}

export default function Index({movies}) {
	// const [movies, setMovies] = useState()
	return (
		<MainLayout>
			<MoviesListDefault />
		</MainLayout>
	)
}
