import { LINK_TO_FETCH_TV_SHOWS_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import ItemsList from '../../components/List/ItemsList'

const TVShows = ({ tvShows }) => {
	const [tvShowsList, setTvShowsList] = useState(null)

	useEffect(() => {
		if (!tvShows) {
			getResultsByPage(LINK_TO_FETCH_TV_SHOWS_LIST, 1).then(data => {
				setTvShowsList(data)
			})
		}
	}, [])

	useEffect(() => {
		setTvShowsList(tvShows)
	}, [tvShows])

	if (!tvShowsList) return <Loader />

	return (
		<ItemsList
			itemsList={tvShowsList.items}
			listName='tv'
			title='TV shows'
			isMoreDataAvailable={tvShowsList.isMoreDataAvailable}
			linkToFetchItems={LINK_TO_FETCH_TV_SHOWS_LIST}
		/>
	)
}

export const getServerSideProps = async () => {
	try {
		const tvShows = await getResultsByPage(LINK_TO_FETCH_TV_SHOWS_LIST, 1)

		return {
			props: {
				tvShows,
			},
		}
	} catch (error) {
		return {
			props: {},
		}
	}
}

export default TVShows
