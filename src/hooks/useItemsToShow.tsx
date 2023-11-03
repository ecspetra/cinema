import { useEffect, useState } from 'react'
import { IBackdrop } from '../../interfaces'
import useScrollToTop from '@/hooks/useScrollToTop'

const useItemsToShow = (
	initialItems,
	initialItemsLength,
	scrollHeight = 100
) => {
	const [itemsToShow, setItemsToShow] = useState<Array<IBackdrop>>([])
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
