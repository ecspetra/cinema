import ItemCard from './ItemCard'
import { IItemCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import { UserCollections } from '@/constants/enum'
import { useModal } from '@/context/ModalProvider'
import { showErrorNotification } from '@/handlers/handleModals'

type PropsType = {
	itemsList: Array<IItemCard>
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.basic
	isMoreDataAvailable: boolean
	urlToFetchItems?: string
	onEmptyList: () => void
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
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsToShow, setItemsToShow] = useState([])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState(isMoreDataAvailable)

	const getMoreItems = page => {
		setIsLoading(true)
		getResultsByPage(urlToFetchItems, page)
			.then(data => {
				let newItems = []
				if (!data.items.length) onEmptyList(true)

				data.items.map(item => {
					const isItemExistsInList = itemsToShow.find(
						existingItem => existingItem.id === item.id
					)

					if (!isItemExistsInList) {
						newItems.push(item)
					}
				})

				if (newItems.length !== 0) {
					setItemsToShow(prevState => [...prevState, ...newItems])
				} else {
					setItemsToShow(prevState => [...prevState, ...itemsToShow])
				}

				setIsShowMoreButton(data.isMoreDataAvailable)
			})
			.catch(() => {
				showErrorNotification(showModal, 'An error has occurred')
				onEmptyList(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const resetItems = () => {
		setItemsToShow([])
		setCurrentPage(1)

		if (isFilterable) {
			setIsShowMoreButton(false)
			getMoreItems(1)
		} else {
			setIsShowMoreButton(isMoreDataAvailable)
			getMoreItems(1)
		}
	}

	useEffect(() => {
		if (currentPage > 1) getMoreItems(currentPage)
	}, [currentPage])

	useEffect(() => {
		resetItems()
	}, [itemsList, urlToFetchItems])

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
				<Button
					className='mx-auto'
					context='empty'
					onClick={() => setCurrentPage(prevState => prevState + 1)}
				>
					Show more
				</Button>
			)}
		</>
	)
}

export default ItemsList
