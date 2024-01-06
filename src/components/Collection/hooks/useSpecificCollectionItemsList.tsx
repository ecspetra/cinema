import { useEffect, useState } from 'react'
import { IFetchedResult, IItemCard } from '../../../../interfaces'
import { useAuth } from '@/context/AuthProvider'
import { getCollectionItemsList } from '@/firebase/handlers/userCollectionHandlers/getCollectionItemsList'
import { specificCollectionListener } from '@/firebase/handlers/userCollectionHandlers/specificCollectionListener'
import { UserCollections } from '@/constants/enum'

const useSpecificCollectionItemsList = (
	items: IItemCard[],
	collectionConfig: {
		isMoreDataAvailable: boolean
		collectionType:
			| UserCollections.movie
			| UserCollections.tv
			| UserCollections.person
	}
) => {
	const { isMoreDataAvailable, collectionType } = collectionConfig
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [lastItemId, setLastItemId] = useState<string | undefined>(undefined)
	const [itemsToShow, setItemsToShow] = useState<IItemCard[]>([])
	const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(false)
	const { userId } = useAuth()

	const showMore = () => {
		setLastItemId(itemsToShow[itemsToShow.length - 1].id.toString())
	}

	const getMoreCollectionItems = async () => {
		setIsLoading(true)
		const result = (await getCollectionItemsList(
			userId,
			collectionType,
			20,
			lastItemId
		)) as IFetchedResult<IItemCard>
		setItemsToShow(prevState => [...prevState, ...result.items])
		setIsShowMoreButton(result.isMoreDataAvailable)
		setIsLoading(false)
		setLastItemId(undefined)
	}

	useEffect(() => {
		const unsubscribe = specificCollectionListener(
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

	return { isShowMoreButton, isLoading, itemsToShow, showMore }
}

export default useSpecificCollectionItemsList
