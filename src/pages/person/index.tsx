import {
	URL_TO_FETCH_PERSON_LIST,
	URL_TO_SEARCH,
} from '@/constants/linksToFetch'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import { PERSON_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import Title from '@/app/components/UI/Title/Title'
import { UserCollections } from '@/constants/enum'
import useGeneralListPageFetch from '@/hooks/useGeneralListPageFetch'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'
import { IFetchedResult, IItemCard } from '../../../interfaces'

const GeneralPersonListPage = ({
	personListFromProps,
}: {
	personListFromProps: IFetchedResult<IItemCard>
}) => {
	const defaultUrlToSearch = URL_TO_SEARCH.replace(
		'{fieldName}',
		UserCollections.person
	)

	const [urlToFetch, setUrlToFetch] = useState<string>(
		URL_TO_FETCH_PERSON_LIST
	)
	const isDefaultListPresented = urlToFetch.includes(URL_TO_FETCH_PERSON_LIST)

	const { items, isLoading } = useGeneralListPageFetch(
		personListFromProps,
		urlToFetch
	)

	if (!items) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
	}

	return (
		<>
			<TopBanner imageSrc={PERSON_LIST_TOP_BANNER_IMAGE} />
			<Title className='text-3xl md:text-7xl after:hidden pb-0'>
				Persons
			</Title>
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
				itemsList={items.items}
				collectionType={UserCollections.person}
				isMoreDataAvailable={items.isMoreDataAvailable}
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
