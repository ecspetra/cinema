import { LINK_TO_FETCH_DEFAULT_MOVIE_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import ItemsList from '../../components/List/ItemsList'
import TopBanner from '@/components/TopBanner'
import { MOVIE_LIST_TOP_BANNER_IMAGE } from '@/constants/images'

const Movies = ({ results }) => {
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	useEffect(() => {
		if (!results) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setDefaultMovieList(data)
			})
		}
	}, [])

	useEffect(() => {
		setDefaultMovieList(results)
	}, [results])

	if (!defaultMovieList) return <Loader />

	return (
		<>
			<TopBanner imageSrc={MOVIE_LIST_TOP_BANNER_IMAGE} />
			<ItemsList
				itemsList={defaultMovieList.items}
				listName='movie'
				title='Movies'
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				linkToFetchItems={LINK_TO_FETCH_DEFAULT_MOVIE_LIST}
			/>
		</>
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
				results: defaultMovies,
			},
		}
	} catch (error) {
		return {
			props: {
				results: null,
			},
		}
	}
}

export default Movies
