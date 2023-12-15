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
import Title from '@/app/components/UI/Title/Title'
import { UserCollections } from '@/constants/enum'

const GeneralPersonListPage = ({ results }) => {
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'person')
	const [defaultPersonList, setDefaultPersonList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(URL_TO_FETCH_PERSON_LIST)
	const isDefaultListPresented = urlToFetch.includes(URL_TO_FETCH_PERSON_LIST)

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
			<Title className='text-7xl after:hidden pb-0'>Persons</Title>
			<Search
				collectionType={UserCollections.person}
				name='personSearch'
				label='Search person'
				urlToFetch={defaultUrlToSearch}
				defaultUrlToFetch={URL_TO_FETCH_PERSON_LIST}
				onSearch={setUrlToFetch}
				isSearchApplied={!isDefaultListPresented}
				isSearchFieldWrapped
			/>
			<ItemsListWrap
				itemsList={defaultPersonList.items}
				collectionType={UserCollections.person}
				isMoreDataAvailable={defaultPersonList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
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

export default GeneralPersonListPage
