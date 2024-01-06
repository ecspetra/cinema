import ItemCard from './ItemCard'
import { IItemCard } from '../../../../../interfaces'
import { FC, Dispatch, SetStateAction } from 'react'
import Button from '@/app/components/UI/Button'
import Loader from '@/components/Loader'
import { UserCollections } from '@/constants/enum'
import useItemsList from '@/components/List/hooks/useItemsList'

type PropsType = {
	itemsList: IItemCard[]
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.basic
	isMoreDataAvailable: boolean
	urlToFetchItems: string
	onEmptyList: Dispatch<SetStateAction<boolean>>
	isFilterable?: boolean
}

const ItemsList: FC<PropsType> = ({
	itemsList,
	collectionType,
	isMoreDataAvailable,
	urlToFetchItems,
	onEmptyList,
	isFilterable = false,
}) => {
	const itemsListConfig = {
		onEmptyList,
		urlToFetchItems,
		isMoreDataAvailable,
		isFilterable,
	}
	const { itemsToShow, isLoading, isShowMoreButton, showMore } = useItemsList(
		itemsList,
		itemsListConfig
	)

	return (
		<>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{itemsToShow.map((item: IItemCard) => {
					return (
						<ItemCard
							key={item.id}
							item={item}
							collectionType={collectionType}
						/>
					)
				})}
			</div>
			{isLoading && <Loader type='static' className='mb-4' />}
			{isShowMoreButton && (
				<Button className='mx-auto' context='empty' onClick={showMore}>
					Show more
				</Button>
			)}
		</>
	)
}

export default ItemsList
