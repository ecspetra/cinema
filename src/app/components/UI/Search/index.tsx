import React, { FC, useEffect, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/app/components/UI/Input/InputField'
import { LINK_TO_SEARCH } from '@/constants/linksToFetch'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import SearchList from '@/app/components/UI/Search/SearchList'

type PropsType = {
	name: string
	label: string
	onSearch: () => void
}

const Search: FC<PropsType> = ({ name, label, onSearch }) => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [results, setResults] = useState([])
	const [isMoreDataAvailable, setIsMoreDataAvailable] =
		useState<boolean>(false)
	const linkToFetch = LINK_TO_SEARCH.replace(
		'{fieldName}',
		label.toLowerCase()
	).replace('{searchQuery}', searchQuery)

	useEffect(() => {
		setResults([])
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
				id={name}
				label={label}
				value={searchQuery}
				onChange={event => setSearchQuery(event.target.value)}
				icon={faMagnifyingGlass}
				placeholder='Search'
			/>
			{searchQuery.length > 0 && (
				<SearchList
					itemsList={results}
					isMoreDataAvailable={isMoreDataAvailable}
					linkToFetch={linkToFetch}
					onSearch={onSearch}
					name={name}
				/>
			)}
		</div>
	)
}

export default Search
