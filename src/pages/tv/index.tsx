import { URL_TO_FETCH_TV_SHOWS_LIST } from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { TV_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import ItemsList from '../../components/List/ItemsListWrap/ItemsList'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const TVShows = ({ tvShows }) => {
	const [tvShowsList, setTvShowsList] = useState(null)

	useEffect(() => {
		if (!tvShows) {
			getResultsByPage(URL_TO_FETCH_TV_SHOWS_LIST, 1).then(data => {
				setTvShowsList(data)
			})
		}
	}, [])

	useEffect(() => {
		setTvShowsList(tvShows)
	}, [tvShows])

	if (!tvShowsList) return <Loader />

	return (
		<>
			<TopBanner imageSrc={TV_LIST_TOP_BANNER_IMAGE} />
			<ItemsListWrap
				itemsList={tvShowsList.items}
				listName='tv'
				isMoreDataAvailable={tvShowsList.isMoreDataAvailable}
				urlToFetchItems={URL_TO_FETCH_TV_SHOWS_LIST}
				title='TV shows'
			/>
		</>
	)
}

export const getServerSideProps = async () => {
	try {
		const tvShows = await getResultsByPage(URL_TO_FETCH_TV_SHOWS_LIST, 1)

		return {
			props: {
				tvShows,
			},
		}
	} catch (error) {
		return {
			props: null,
		}
	}
}

export default TVShows
