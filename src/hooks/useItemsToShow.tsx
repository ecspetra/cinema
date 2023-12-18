import { useEffect, useState } from 'react'
import { IBackdrop, ITVSeasonCard } from '../../interfaces'
import useScrollToTop from '@/hooks/useScrollToTop'

type ItemsType = IBackdrop[] | ITVSeasonCard[]

const useItemsToShow = (
	initialItems: ItemsType,
	initialItemsLength: number,
	scrollHeight: number = 100
) => {
	const [itemsToShow, setItemsToShow] = useState<ItemsType>([])
	const { listRef, scrollToTop } = useScrollToTop(scrollHeight)
	const isAllDataVisible = itemsToShow.length > initialItemsLength
	const isShowMoreButton = initialItems.length > initialItemsLength
	const buttonText = isAllDataVisible ? 'Show less' : 'Show all'

	const getItemsToShow = () => {
		if (isAllDataVisible) scrollToTop()

		const newItems = isAllDataVisible
			? initialItems.slice(0, initialItemsLength)
			: initialItems

		if (isAllDataVisible) {
			setTimeout(() => {
				setItemsToShow(newItems)
			}, 600)
		} else {
			setItemsToShow(newItems)
		}
	}

	useEffect(() => {
		const updatedItems = initialItems.slice(0, initialItemsLength)
		setItemsToShow(updatedItems)
	}, [initialItems])

	return {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	}
}

export default useItemsToShow
