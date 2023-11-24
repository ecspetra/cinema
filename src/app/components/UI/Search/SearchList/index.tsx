import React, { FC, useEffect, useRef, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { IMovieCard } from '../../../../../../interfaces'
import Loader from '@/components/Loader'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	linkToFetch: string
	onSearch: () => void
	formFieldName: string
}

const SearchList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	linkToFetch,
	onSearch,
	formFieldName,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)

	const { isLoading, items } = useInfiniteScroll(
		containerRef,
		itemsList,
		isMoreDataAvailable,
		linkToFetch
	)

	return (
		<div
			ref={containerRef}
			className='absolute top-full flex flex-col flex-none w-80 h-80 overflow-y-auto scrollbar-hide bg-gray-950'
		>
			{items.map(item => {
				return (
					<Button
						key={item.id}
						onClick={() => onSearch(formFieldName, item.name)}
						className='z-10'
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
