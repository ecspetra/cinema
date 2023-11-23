import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import { SortByOption } from '@/constants/enum'
import ItemsListSort from '@/components/List/ItemsListWrap/ItemsList/ItemsListSort'
import ItemsList from '@/components/List/ItemsListWrap/ItemsList'

type PropsType = {
	itemsList: Array<IMovieCard> | Array<IPersonCard>
	listName: 'movie' | 'person' | 'tv'
	title: string
	isMoreDataAvailable: boolean
	linkToFetchItems?: string
	isFilterable?: boolean
	isSortable?: boolean
}

const ItemsListWrap: FC<PropsType> = ({
	itemsList,
	listName,
	title,
	isMoreDataAvailable,
	linkToFetchItems,
	isFilterable = false,
	isSortable = false,
}) => {
	const [linkToFetch, setLinkToFetch] = useState<string>(linkToFetchItems)

	const handleSortChange = (value: SortByOption) => {
		const updatedLinkToFetch = linkToFetch.replace(
			/(sort_by=)[^&]*/,
			`$1${value}`
		)
		setLinkToFetch(updatedLinkToFetch)
	}

	if (!itemsList.length) {
		return <EmptyList title={title} />
	}

	return (
		<div className='mb-16'>
			<div className='flex justify-between items-start'>
				<Title>{title}</Title>
				{isSortable && <ItemsListSort onChange={handleSortChange} />}
			</div>
			<ItemsList
				itemsList={itemsList}
				listName={listName}
				isMoreDataAvailable={isMoreDataAvailable}
				linkToFetchItems={linkToFetch}
				isFilterable={isFilterable}
			/>
		</div>
	)
}

export default ItemsListWrap
