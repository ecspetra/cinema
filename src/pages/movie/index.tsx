import { LINK_TO_FETCH_DEFAULT_MOVIE_LIST } from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { MOVIE_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import Filter from '@/app/components/Filter'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const Movies = ({ results }) => {
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	const [linkToFetch, setLinkToFetch] = useState(
		LINK_TO_FETCH_DEFAULT_MOVIE_LIST
	)

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
			<Filter
				type='movie'
				onApply={setLinkToFetch}
				fields={[
					'primary_release_year',
					'vote_average',
					'with_people',
					'with_companies',
					'with_origin_country',
					'with_keywords',
					'with_genres',
					'include_adult',
				]}
			/>
			<ItemsListWrap
				itemsList={defaultMovieList.items}
				listName='movie'
				title='Movies'
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				linkToFetchItems={linkToFetch}
				isFilterable
				isSortable
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
