import React, { FC, useEffect, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/app/components/UI/Input/InputField'
import { LINK_TO_SEARCH } from '@/constants/linksToFetch'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import SearchList from '@/app/components/UI/Search/SearchList'

type PropsType = {
	formFieldName: string
}

const Search: FC<PropsType> = ({ formFieldName }) => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [results, setResults] = useState([])
	const [isMoreDataAvailable, setIsMoreDataAvailable] =
		useState<boolean>(false)

	const linkToFetch = LINK_TO_SEARCH.replace(
		'{fieldName}',
		formFieldName
	).replace('{searchQuery}', searchQuery)

	useEffect(() => {
		if (searchQuery.length > 0) {
			setTimeout(() => {
				getResultsByPage(linkToFetch, 1).then(data => {
					setResults(data.items)
					setIsMoreDataAvailable(data.isMoreDataAvailable)
				})
			}, 500)
		}
	}, [searchQuery])

	return (
		<div className='relative h-fit'>
			<InputField
				id={formFieldName}
				label={
					formFieldName.charAt(0).toUpperCase() +
					formFieldName.slice(1)
				}
				value={searchQuery}
				onChange={event => setSearchQuery(event.target.value)}
				icon={faMagnifyingGlass}
				placeholder='Search'
			/>
			<SearchList
				itemsList={results}
				isMoreDataAvailable={isMoreDataAvailable}
				linkToFetch={linkToFetch}
			/>
		</div>
	)
}

export default Search
