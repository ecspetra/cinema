import React, { FC, useEffect, useRef, useState } from 'react'
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/app/components/UI/Input/InputField'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import SearchList from '@/app/components/UI/Search/SearchList'
import { useClickOutsideContainer } from '@/hooks/useClickOutsideContainer'
import Button from '@/app/components/UI/Button'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import Error from '@/app/components/UI/Error'
import Loader from '@/components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
	name: string
	type: string
	label: string
	urlToFetch: string
	onSearch: () => void
	isWrapped?: boolean
}

const Search: FC<PropsType> = ({
	name,
	type,
	label,
	urlToFetch,
	onSearch,
	isWrapped = false,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [isSearchQueryUpdate, setIsSearchQueryUpdate] =
		useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [results, setResults] = useState([])
	const [error, setError] = useState<string>('')
	const [isMoreDataAvailable, setIsMoreDataAvailable] =
		useState<boolean>(false)
	const { isOpen, onOpenContainer, onCloseContainer } =
		useClickOutsideContainer(containerRef, searchQuery.length > 0)
	const isShowClearButton = searchQuery.length > 0

	const urlToFetchWithSearchQuery = urlToFetch.replace(
		'{searchQuery}',
		searchQuery
	)

	const handleInputChange = event => {
		setSearchQuery(event.target.value)

		if (!isTouched) setIsTouched(true)
	}

	const resetSearch = () => {
		onCloseContainer()
		setResults([])
		setSearchQuery('')
	}

	const handleSearch = async (event: React.FormEvent) => {
		event.preventDefault()

		const isFormValid = searchQuery.length > 0

		if (isFormValid && isTouched) {
			onSearch(urlToFetchWithSearchQuery)
			resetSearch()
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const abortController = new AbortController()
			const signal = abortController.signal

			setResults([])
			setError('')
			setIsSearchQueryUpdate(true)

			try {
				const data = await getResultsByPage(
					urlToFetchWithSearchQuery,
					1,
					signal
				)

				setResults(data.items)
				setIsMoreDataAvailable(data.isMoreDataAvailable)
				setIsSearchQueryUpdate(false)
			} catch (error) {
				setError('Error fetching data.')
			} finally {
				abortController.abort()
			}
		}

		if (searchQuery.length > 0) {
			if (!isOpen) onOpenContainer()

			const timeoutId = setTimeout(fetchData, 500)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [searchQuery, urlToFetchWithSearchQuery])

	const search = (
		<div ref={containerRef} className='relative h-16'>
			<div className='relative h-full'>
				<InputField
					id={name}
					label={label}
					value={searchQuery}
					onChange={handleInputChange}
					icon={faMagnifyingGlass}
					placeholder='Search'
				/>
				{isWrapped && (
					<div className='absolute inset-y-1/2 -translate-y-1/2 right-4 flex justify-end items-center gap-4'>
						<Button type='submit' context='text'>
							{isLoading ? <Loader type='static' /> : 'Submit'}
						</Button>
						{isShowClearButton && (
							<Button context='icon' onClick={resetSearch}>
								<FontAwesomeIcon
									icon={faXmark}
									className='w-6 h-6'
								/>
							</Button>
						)}
					</div>
				)}
			</div>
			{isOpen && (
				<SearchList
					type={type}
					itemsList={results}
					isMoreDataAvailable={isMoreDataAvailable}
					urlToFetch={urlToFetchWithSearchQuery}
					onSearch={onSearch}
					name={name}
					onClose={resetSearch}
					isSearchQueryUpdate={isSearchQueryUpdate}
				/>
			)}
		</div>
	)

	return (
		<>
			{isWrapped ? (
				<form className='mb-4 bg-gray-950 p-4' onSubmit={handleSearch}>
					{search}
					{error && (
						<Error
							className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
							error={error}
						/>
					)}
				</form>
			) : (
				search
			)}
		</>
	)
}

export default Search