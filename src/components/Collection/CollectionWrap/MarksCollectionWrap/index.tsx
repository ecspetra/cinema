import { FC } from 'react'
import Button from '@/app/components/UI/Button'
import { IMark } from '../../../../../interfaces'
import ItemCardSmall from '@/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall'
import useItemsToShow from '@/hooks/useItemsToShow'

type PropsType = {
	items: IMark[]
}

const MarksCollectionWrap: FC<PropsType> = ({ items }) => {
	const {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	} = useItemsToShow(items, 8, 180)

	return (
		<>
			<div
				ref={listRef}
				className='grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8'
			>
				{(itemsToShow as IMark[]).map((item: IMark, idx) => {
					return (
						<ItemCardSmall
							key={idx}
							itemId={item.itemId}
							mark={item.mark}
							collectionType={item.type}
							isLinkToMovie
						/>
					)
				})}
			</div>
			{isShowMoreButton && (
				<Button
					className='mx-auto mt-8'
					context='empty'
					onClick={getItemsToShow}
				>
					{buttonText}
				</Button>
			)}
		</>
	)
}

export default MarksCollectionWrap
