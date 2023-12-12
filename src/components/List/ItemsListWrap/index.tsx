import { IItemCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import { SortByOption } from '@/constants/enum'
import ItemsListSort from '@/components/List/ItemsListWrap/ItemsList/ItemsListSort'
import ItemsList from '@/components/List/ItemsListWrap/ItemsList'
import { UserCollectionType } from '@/firebase/config'

type PropsType = {
	itemsList: Array<IItemCard>
	collectionType: Extract<
		UserCollectionType,
		'movie' | 'tv' | 'person' | 'basic'
	>
	isMoreDataAvailable: boolean
	title?: string
	urlToFetchItems?: string
	isFilterable?: boolean
	isSortable?: boolean
}

const ItemsListWrap: FC<PropsType> = ({
	itemsList,
	collectionType,
	isMoreDataAvailable,
	title,
	urlToFetchItems,
	isFilterable = false,
	isSortable = false,
}) => {
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
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

		if (!isFirstRender) {
			setIsShowEmptyList(false)
		} else {
			setIsFirstRender(false)
		}
	}, [urlToFetchItems])

	if (isShowEmptyList) {
		return <EmptyList title={title} className='text-center' />
	}

	return (
		<div className='mb-16'>
			<div className='flex justify-between items-start mb-4'>
				{title && <Title className='!mb-0'>{title}</Title>}
				{isSortable && <ItemsListSort onChange={handleSortChange} />}
			</div>
			<ItemsList
				itemsList={itemsList}
				collectionType={collectionType}
				isMoreDataAvailable={isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				isFilterable={isFilterable}
				onEmptyList={setIsShowEmptyList}
			/>
		</div>
	)
}

export default ItemsListWrap
