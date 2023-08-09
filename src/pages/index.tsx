import MainLayout from "../components/MainLayout";
import MoviesListDefault from "../components/MoviesList/MoviesListDefault";
import { NextPageContext } from 'next'
import {useEffect, useState} from "react";
import {LINK_TO_FETCH_DEFAULT_MOVIES, LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE} from "@/constants/links";
import {IMovieCard} from "../../interfaces";

const Index = ({moviesFromProps}) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [defaultMovies, setDefaultMovies] = useState<Array<IMovieCard>>([])

	const getMoreDefaultMovies = async () => {
		const response = await fetch(LINK_TO_FETCH_DEFAULT_MOVIES + currentPage)
		const result = await response.json()
		setDefaultMovies(prevState => [...prevState, ...result.results])
	}

	useEffect(() => {
		setDefaultMovies([...moviesFromProps])
	}, [])

	useEffect(() => {
		if (currentPage > 1) getMoreDefaultMovies()
	}, [currentPage])

	return (
		<MainLayout>
			<MoviesListDefault defaultMovies={defaultMovies} />
			<button onClick={() => setCurrentPage(prevState => prevState + 1)}>More</button>
		</MainLayout>
	)
}

Index.getInitialProps = async (ctx: NextPageContext) => {
	const response = await fetch(LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE)
	const result = await response.json()
	return { moviesFromProps: result.results }
}

export default Index
