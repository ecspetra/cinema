import { NextPageContext } from 'next'
import { LINK_TO_FETCH_DEFAULT_MOVIE_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import ItemsList from '../components/List/ItemsList'

const Home = ({ items, isMoreDataAvailable }) => {
	const [homePageMovies, setHomePageMovies] = useState([])
	const [isNextResult, setIsNextResult] = useState(false)

	useEffect(() => {
		if (!items) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setHomePageMovies(data.items)
				setIsNextResult(!!data.isMoreDataAvailable)
			})
		}
	}, [])

	useEffect(() => {
		setHomePageMovies(items)
		setIsNextResult(isMoreDataAvailable)
	}, [items, isMoreDataAvailable])

	if (!homePageMovies.length) return <Loader />

	return (
		<ItemsList
			itemsList={homePageMovies}
			listName='movies'
			title='Discover movies'
			isMoreDataAvailable={isNextResult}
			linkToFetchItems={LINK_TO_FETCH_DEFAULT_MOVIE_LIST}
		/>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const results = await getResultsByPage(
			LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
			1
		)

		return {
			props: {
				items: results.items,
				isMoreDataAvailable: !!results.isMoreDataAvailable,
			},
		}
	} catch (error) {
		return {
			props: {
				items: [],
				isMoreDataAvailable: false,
			},
		}
	}
}

export default Home
