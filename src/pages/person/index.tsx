import {
	URL_TO_FETCH_PERSON_LIST,
	URL_TO_SEARCH,
} from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import { PERSON_LIST_TOP_BANNER_IMAGE } from '@/constants/images'

const Persons = ({ results }) => {
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'person')
	const [defaultPersonList, setDefaultPersonList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(URL_TO_FETCH_PERSON_LIST)

	useEffect(() => {
		if (!results) {
			getResultsByPage(urlToFetch, 1).then(data => {
				setDefaultPersonList(data)
			})
		}
	}, [])

	useEffect(() => {
		setDefaultPersonList(results)
	}, [results])

	if (!defaultPersonList) return <Loader />

	return (
		<>
			<TopBanner imageSrc={PERSON_LIST_TOP_BANNER_IMAGE} />
			<Search
				type='person'
				name='personSearch'
				label='Search person'
				urlToFetch={defaultUrlToSearch}
				onSearch={setUrlToFetch}
				isWrapped
			/>
			<ItemsListWrap
				itemsList={defaultPersonList.items}
				type='person'
				isMoreDataAvailable={defaultPersonList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				title='Persons'
				isFilterable
			/>
		</>
	)
}

export const getServerSideProps = async () => {
	try {
		const defaultPersons = await getResultsByPage(
			URL_TO_FETCH_PERSON_LIST,
			1
		)

		return {
			props: {
				results: defaultPersons,
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

export default Persons
