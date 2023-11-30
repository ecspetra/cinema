import { NextPageContext } from 'next'
import { URL_TO_FETCH_PERSON_LIST } from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import ItemsList from '../../components/List/ItemsListWrap/ItemsList'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const Persons = ({ items, isMoreDataAvailable }) => {
	const [persons, setPersons] = useState([])
	const [isNextResult, setIsNextResult] = useState(false)

	useEffect(() => {
		if (!items) {
			getResultsByPage(URL_TO_FETCH_PERSON_LIST, 1).then(data => {
				setPersons(data.items)
				setIsNextResult(data.isMoreDataAvailable)
			})
		}
	}, [])

	useEffect(() => {
		setPersons(items)
		setIsNextResult(isMoreDataAvailable)
	}, [items, isMoreDataAvailable])

	if (!persons.length) return <Loader />

	return (
		<>
			<TopBanner />
			<ItemsListWrap
				itemsList={persons}
				listName='person'
				isMoreDataAvailable={isNextResult}
				urlToFetchItems={URL_TO_FETCH_PERSON_LIST}
				title='Discover persons'
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const results = await getResultsByPage(URL_TO_FETCH_PERSON_LIST, 1)

		return {
			props: {
				items: results.items,
				isMoreDataAvailable: results.isMoreDataAvailable,
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

export default Persons
