import React, { FC, useRef } from 'react'
import Button from '@/app/components/UI/Button'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { IMovieCard } from '../../../../../../interfaces'
import Loader from '@/components/Loader'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	linkToFetch: string
}

const SearchList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	linkToFetch,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { isLoading, itemsToShow } = useInfiniteScroll(
		containerRef,
		itemsList,
		isMoreDataAvailable,
		linkToFetch
	)

	return (
		<div
			ref={containerRef}
			className='absolute top-full flex flex-col flex-shrink-0 w-80 max-h-80 overflow-y-auto'
		>
			{itemsToShow.map(item => {
				return (
					<Button key={item.id} onClick={() => {}}>
						{item.name}
					</Button>
				)
			})}
			{isLoading && <Loader type='static' className='mb-4' />}
		</div>
	)
}

export default SearchList
