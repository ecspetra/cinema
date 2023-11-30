import { IMovieCard } from '../../../../interfaces'
import React, { FC, useEffect, useRef, useState } from 'react'
import Loader from '@/components/Loader'
import Button from '@/app/components/UI/Button'
import moment from 'moment'
import classNames from 'classnames'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { URL_TO_FETCH_UPCOMING_MOVIE_LIST } from '@/constants/linksToFetch'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	selectedItemId: number
	onSelectItem: React.Dispatch<React.SetStateAction<IMovieCard>>
}

const HomePageSliderItemsList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	selectedItemId,
	onSelectItem,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)

	const { isLoading, items } = useInfiniteScroll(
		containerRef,
		itemsList,
		isMoreDataAvailable,
		URL_TO_FETCH_UPCOMING_MOVIE_LIST
	)

	const defaultItemClassNames =
		'bg-gray-800 group-hover:bg-white group-hover:text-gray-950'
	const selectedItemClassNames = 'bg-white text-gray-950'

	return (
		<div
			ref={containerRef}
			className='overflow-auto flex flex-col flex-none max-w-sm w-full scrollbar-hide bg-gray-950'
		>
			{items.map((item: IMovieCard, idx: number) => {
				return (
					<Button
						key={idx}
						context='listItem'
						onClick={() => onSelectItem(item)}
						className={classNames(
							'group !p-0',
							selectedItemId === item.id && 'bg-rose-600'
						)}
					>
						<span
							className={classNames(
								'w-20 h-full p-2 font-black mr-4 flex justify-center items-center flex-none duration-300',
								selectedItemId === item.id
									? selectedItemClassNames
									: defaultItemClassNames
							)}
						>
							{moment(item.release_date).format('D MMM')}
						</span>
						<span className='text-left py-2'>{item.title}</span>
					</Button>
				)
			})}
			{isLoading && <Loader type='static' className='mb-4' />}
		</div>
	)
}

export default HomePageSliderItemsList
