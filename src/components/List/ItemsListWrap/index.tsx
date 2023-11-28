import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
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
	text?: string
	urlToFetchItems?: string
	isFilterable?: boolean
	isSortable?: boolean
}

const ItemsListWrap: FC<PropsType> = ({
	itemsList,
	listName,
	title,
	isMoreDataAvailable,
	text,
	urlToFetchItems,
	isFilterable = false,
	isSortable = false,
}) => {
	const [urlToFetch, setUrlToFetch] = useState<string>(urlToFetchItems)
	const [isShowEmptyList, setIsShowEmptyList] = useState<boolean>(
		!itemsList.length
	)

	const handleSortChange = (value: SortByOption) => {
		const updatedLinkToFetch = urlToFetch.replace(
			/(sort_by=)[^&]*/,
			`$1${value}`
		)
		setUrlToFetch(updatedLinkToFetch)
	}

	useEffect(() => {
		setUrlToFetch(urlToFetchItems)
		setIsShowEmptyList(false)
	}, [urlToFetchItems])

	if (isShowEmptyList) {
		return <EmptyList title={title} text={text} />
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
				urlToFetchItems={urlToFetch}
				isFilterable={isFilterable}
				onEmptyList={setIsShowEmptyList}
			/>
		</div>
	)
}

export default ItemsListWrap
