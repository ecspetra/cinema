import { LINK_TO_FETCH_DEFAULT_MOVIE_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import ItemsList from '../../components/List/ItemsList'

const Movies = ({ defaultMovies }) => {
	const [defaultMovieList, setDefaultMovieList] = useState(null)

	useEffect(() => {
		if (!defaultMovies) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setDefaultMovieList(data)
			})
		}
	}, [])

	useEffect(() => {
		setDefaultMovieList(defaultMovies)
	}, [defaultMovies])

	if (!defaultMovieList) return <Loader />

	return (
		<ItemsList
			itemsList={defaultMovieList.items}
			listName='movie'
			title='Movies'
			isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
			linkToFetchItems={LINK_TO_FETCH_DEFAULT_MOVIE_LIST}
		/>
	)
}

export const getServerSideProps = async () => {
	try {
		const defaultMovies = await getResultsByPage(
			LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
			1
		)

		return {
			props: {
				defaultMovies,
			},
		}
	} catch (error) {
		return {
			props: {},
		}
	}
}

export default Movies
