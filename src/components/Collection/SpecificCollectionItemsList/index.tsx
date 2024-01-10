import ItemCard from '../../List/ItemsListWrap/ItemsList/ItemCard'
import { IFetchedResult, IItemCard } from '../../../../interfaces'
import { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'
import Loader from '@/components/Loader'
import EmptyList from '@/components/List/EmptyList'
import { UserCollections } from '@/constants/enum'
import { specificCollectionListener } from '@/firebase/handlers/userCollectionHandlers/specificCollectionListener'
import { getCollectionItemsList } from '@/firebase/handlers/userCollectionHandlers/getCollectionItemsList'
import useSpecificCollectionItemsList from '@/components/Collection/hooks/useSpecificCollectionItemsList'

type PropsType = {
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
	items: IItemCard[]
	isMoreDataAvailable: boolean
	title: string
}

const SpecificCollectionItemsList: FC<PropsType> = ({
	collectionType,
	items,
	isMoreDataAvailable,
	title,
}) => {
	const collectionConfig = { isMoreDataAvailable, collectionType }
	const { isShowMoreButton, isLoading, itemsToShow, showMore } =
		useSpecificCollectionItemsList(items, collectionConfig)

	if (!itemsToShow.length) {
		return <EmptyList title={title} />
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{itemsToShow.map((item: IItemCard) => {
					return (
						<ItemCard
							key={item.id}
							item={item}
							collectionType={collectionType}
							isCollectionListItem
						/>
					)
				})}
			</div>
			{isLoading && <Loader type='static' />}
			{itemsToShow.length > 0 && isShowMoreButton && (
				<Button className='mx-auto' context='empty' onClick={showMore}>
					Show more
				</Button>
			)}
		</div>
	)
}

export default SpecificCollectionItemsList
