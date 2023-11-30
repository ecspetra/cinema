import React, { FC, useRef } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { IMovieCard } from '../../../../../../interfaces'
import Loader from '@/components/Loader'
import SearchItemBasic from '@/app/components/UI/Search/SearchList/SearchItemBasic'
import SearchItemMovie from '@/app/components/UI/Search/SearchList/SearchItemMovie'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	isSearchQueryUpdate: boolean
	urlToFetch: string
	onSearch: () => void
	onClose: () => void
	name: string
	type?: 'basic' | 'movie' | 'tv' | 'person'
}

const SearchList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	isSearchQueryUpdate,
	urlToFetch,
	onSearch,
	onClose,
	name,
	type = 'basic',
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { isLoading, items } = useInfiniteScroll(
		containerRef,
		itemsList,
		isMoreDataAvailable,
		urlToFetch
	)

	const handleSelectBasicListItem = (fieldName, { id, name }) => {
		onSearch(fieldName, { id, name })
		onClose()
	}

	return (
		<div
			ref={containerRef}
			className='w-full absolute top-full flex flex-col items-start flex-none h-60 box-content border border-gray-500 overflow-y-auto scrollbar-hide bg-gray-950 shadow-[0_35px_60px_15px_rgba(3,7,18,1)] z-20'
		>
			{isSearchQueryUpdate ? (
				<Loader type='static' className='mb-4' />
			) : (
				<>
					{!items.length && (
						<span className='mt-4 mx-auto'>No results found</span>
					)}
					{items.map(item => {
						switch (type) {
							case 'basic':
								return (
									<SearchItemBasic
										key={item.id}
										item={item}
										fieldName={name}
										onSelect={handleSelectBasicListItem}
									/>
								)
							case 'movie':
							case 'tv':
								return (
									<SearchItemMovie
										key={item.id}
										item={item}
										type={type}
										fieldName={name}
										onSelect={handleSelectBasicListItem}
									/>
								)
						}
					})}
					{isLoading && <Loader type='static' className='mb-4' />}
				</>
			)}
		</div>
	)
}

export default SearchList
