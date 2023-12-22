import { FC, useRef, Dispatch, SetStateAction } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import Loader from '@/components/Loader'
import SearchItemBasic from '@/app/components/UI/Search/SearchList/SearchItemBasic'
import SearchItemLink from '@/app/components/UI/Search/SearchList/SearchItemLink'
import { IItemCard } from '../../../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { FilterFormData } from '@/hooks/useFilterReducer'

type PropsType = {
	itemsList: Array<IItemCard>
	isMoreDataAvailable: boolean
	isSearchQueryUpdate: boolean
	urlToFetch: string
	onSelectItem:
		| Dispatch<SetStateAction<string>>
		| ((field: keyof FilterFormData, value: object) => void)
	onClose: () => void
	name: string
	collectionType?:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.basic
}

const SearchList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	isSearchQueryUpdate,
	urlToFetch,
	onSelectItem,
	onClose,
	name,
	collectionType = 'basic',
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { isLoading, items } = useInfiniteScroll(
		containerRef,
		itemsList,
		isMoreDataAvailable,
		urlToFetch
	)

	const handleSelectBasicListItem = (fieldName, { id, name }) => {
		onSelectItem(fieldName, { id, name })
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
						switch (collectionType) {
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
							case 'person':
								return (
									<SearchItemLink
										key={item.id}
										item={item}
										collectionType={collectionType}
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
