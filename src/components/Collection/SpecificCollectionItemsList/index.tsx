import ItemCard from '../../List/ItemsListWrap/ItemsList/ItemCard'
import { IItemCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { collectionListener, getCollectionItemsList } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'
import Loader from '@/components/Loader'
import EmptyList from '@/components/List/EmptyList'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
	items: Array<IItemCard>
	isMoreDataAvailable: boolean
	title: string
}

const SpecificCollectionItemsList: FC<PropsType> = ({
	collectionType,
	items,
	isMoreDataAvailable,
	title,
}) => {
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [lastItemId, setLastItemId] = useState<string | undefined>(undefined)
	const [itemsToShow, setItemsToShow] = useState<Array<IItemCard>>([])
	const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(false)
	const { userId } = useAuth()

	const getMoreCollectionItems = async () => {
		setIsLoading(true)
		const result = await getCollectionItemsList(
			userId,
			collectionType,
			20,
			lastItemId
		)
		setItemsToShow(prevState => [...prevState, ...result.items])
		setIsShowMoreButton(result.isMoreDataAvailable)
		setIsLoading(false)
		setLastItemId(undefined)
	}

	useEffect(() => {
		const unsubscribe = collectionListener(
			userId,
			collectionType,
			itemsToShow,
			setItemsToShow,
			setIsShowMoreButton
		)

		return () => {
			unsubscribe()
		}
	}, [itemsToShow])

	useEffect(() => {
		if (
			lastItemId ||
			(!itemsToShow.length && isShowMoreButton && !isFirstRender)
		) {
			getMoreCollectionItems()
		}
	}, [lastItemId, itemsToShow, isShowMoreButton])

	useEffect(() => {
		setItemsToShow(items)
		setTimeout(() => {
			setIsShowMoreButton(isMoreDataAvailable)
		}, 1500)
		setIsFirstRender(false)
	}, [items])

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
				<Button
					className='mx-auto'
					context='empty'
					onClick={() =>
						setLastItemId(
							itemsToShow[itemsToShow.length - 1].id.toString()
						)
					}
				>
					Show more
				</Button>
			)}
		</div>
	)
}

export default SpecificCollectionItemsList
