import { FC, Dispatch, SetStateAction } from 'react'
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/app/components/UI/Input/InputField'
import SearchList from '@/app/components/UI/Search/SearchList'
import Button from '@/app/components/UI/Button'
import Error from '@/app/components/UI/Error'
import Loader from '@/components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FilterFormData } from '@/hooks/useFilterReducer'
import { UserCollections } from '@/constants/enum'
import useSearchLogic from '@/handlers/useSearchLogic'

type PropsType = {
	name: string
	label: string
	urlToFetch: string
	onSearch:
		| Dispatch<SetStateAction<string>>
		| ((
				field: keyof FilterFormData,
				value: { id: number; name: string }
		  ) => void)
	collectionType?:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.basic
	defaultUrlToFetch?: string
	isSearchApplied?: boolean
	isSearchFieldWrapped?: boolean
}

const Search: FC<PropsType> = ({
	name,
	label,
	urlToFetch,
	onSearch,
	collectionType,
	defaultUrlToFetch,
	isSearchApplied = false,
	isSearchFieldWrapped = false,
}) => {
	const {
		containerRef,
		isLoading,
		urlToFetchWithSearchQuery,
		isShowClearButton,
		isSearchQueryUpdate,
		searchQuery,
		results,
		error,
		isMoreDataAvailable,
		isOpen,
		handleInputChange,
		cancelSearch,
		resetSearch,
		handleSearch,
	} = useSearchLogic({
		onSearch,
		urlToFetch,
		defaultUrlToFetch,
		isSearchApplied,
	})

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
					additionalInputClassName='max-w-[calc(100%-128px)]'
				/>
				{isSearchFieldWrapped && (
					<div className='absolute inset-y-1/2 -translate-y-1/2 right-4 flex justify-end items-center gap-4'>
						<Button type='submit' context='text'>
							{isLoading ? <Loader type='static' /> : 'Submit'}
						</Button>
						{isShowClearButton && (
							<Button context='icon' onClick={cancelSearch}>
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
					collectionType={collectionType}
					itemsList={results}
					isMoreDataAvailable={isMoreDataAvailable}
					urlToFetch={urlToFetchWithSearchQuery}
					onSelectItem={onSearch}
					name={name}
					onClose={resetSearch}
					isSearchQueryUpdate={isSearchQueryUpdate}
				/>
			)}
		</div>
	)

	return (
		<>
			{isSearchFieldWrapped ? (
				<form className='mb-4 bg-gray-950' onSubmit={handleSearch}>
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
