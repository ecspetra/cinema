import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'
import { IMark } from '../../../../../interfaces'
import MovieCardSmall from '@/components/Movie/MovieCard/MovieCardSmall'
import useItemsToShow from '@/hooks/useItemsToShow'

type PropsType = {
	items: Array<IMark>
}

const MarksCollectionWrap: FC<PropsType> = ({ items }) => {
	const {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	} = useItemsToShow(items, 8, 180)

	return (
		<>
			<div
				ref={listRef}
				className='grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8'
			>
				{itemsToShow.map((item, idx) => {
					return (
						<MovieCardSmall
							key={idx}
							itemId={item.movieId}
							mark={item.mark}
							isTVShow={item.isTVShow}
							isLinkToMovie
						/>
					)
				})}
			</div>
			{isShowMoreButton && (
				<Button
					className='mx-auto mt-8'
					context='empty'
					onClick={getItemsToShow}
				>
					{buttonText}
				</Button>
			)}
		</>
	)
}

export default MarksCollectionWrap
