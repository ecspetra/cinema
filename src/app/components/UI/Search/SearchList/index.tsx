import React, { FC, useEffect, useRef } from 'react'
import Button from '@/app/components/UI/Button'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { IMovieCard } from '../../../../../../interfaces'
import Loader from '@/components/Loader'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	urlToFetch: string
	onSearch: () => void
	onClose: () => void
	name: string
}

const SearchList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	urlToFetch,
	onSearch,
	onClose,
	name,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)

	const { isLoading, items } = useInfiniteScroll(
		containerRef,
		itemsList,
		isMoreDataAvailable,
		urlToFetch
	)

	const handleSelectListItem = (fieldName, { id, name }) => {
		onSearch(fieldName, { id, name })
		onClose()
	}

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				onClose()
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [containerRef])

	return (
		<div
			ref={containerRef}
			className='w-full absolute top-full flex flex-col items-center flex-none h-80 overflow-y-auto scrollbar-hide bg-gray-700 z-10'
		>
			{items.map(item => {
				return (
					<Button
						key={item.id}
						onClick={() =>
							handleSelectListItem(name, {
								id: item.id,
								name: item.name,
							})
						}
						context='listItem'
						className='w-full z-10'
					>
						{item.name}
					</Button>
				)
			})}
			{isLoading && <Loader type='static' className='mb-4' />}
		</div>
	)
}

export default SearchList
