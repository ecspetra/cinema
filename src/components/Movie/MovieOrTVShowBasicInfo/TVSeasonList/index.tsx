import React, { FC } from 'react'
import { ITVSeasonCard } from '../../../../../interfaces'
import TVSeasonCard from './TVSeasonCard'
import Title from '@/app/components/UI/Title/Title'
import useItemsToShow from '@/hooks/useItemsToShow'
import Button from '@/app/components/UI/Button'
import EmptyList from '@/components/List/EmptyList'

type PropsType = {
	seasonsList: ITVSeasonCard[]
}

const TVSeasonsList: FC<PropsType> = ({ seasonsList }) => {
	const {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	} = useItemsToShow(seasonsList, 2)

	if (!seasonsList.length) {
		return <EmptyList title='Seasons' />
	}

	return (
		<div ref={listRef} className='mb-16'>
			<Title>Seasons</Title>
			<div>
				{itemsToShow.map((item, idx) => (
					<TVSeasonCard key={item.id} season={item} />
				))}
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
		</div>
	)
}

export default TVSeasonsList
