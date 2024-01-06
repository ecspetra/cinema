import { IItemCard } from '../../../../interfaces'
import { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import { UserCollections } from '@/constants/enum'
import ItemsListSort from '@/components/List/ItemsListWrap/ItemsList/ItemsListSort'
import ItemsList from '@/components/List/ItemsListWrap/ItemsList'
import useItemsListWrap from '@/components/List/hooks/useItemsListWrap'

type PropsType = {
	itemsList: IItemCard[]
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.basic
	isMoreDataAvailable: boolean
	urlToFetchItems: string
	title?: string
	isFilterable?: boolean
	isSortable?: boolean
}

const ItemsListWrap: FC<PropsType> = ({
	itemsList,
	collectionType,
	isMoreDataAvailable,
	urlToFetchItems,
	title,
	isFilterable = false,
	isSortable = false,
}) => {
	const itemsListConfig = { urlToFetchItems, isSortable }
	const {
		defaultSortValue,
		urlToFetch,
		isShowEmptyList,
		handleSortChange,
		setIsShowEmptyList,
	} = useItemsListWrap(itemsList, itemsListConfig)

	if (isShowEmptyList) {
		return <EmptyList title={title} />
	}

	return (
		<div className='mb-16'>
			<div className='flex justify-between items-start mb-4'>
				{title && <Title className='!mb-0'>{title}</Title>}
				{isSortable && (
					<ItemsListSort
						onChange={handleSortChange}
						defaultSortValue={defaultSortValue!}
					/>
				)}
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
