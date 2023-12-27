import { IItemCard } from '../../../../../interfaces'
import { FC } from 'react'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import useItemsToShow from '@/hooks/useItemsToShow'
import ItemCard from '@/components/List/ItemsListWrap/ItemsList/ItemCard'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	itemsList: IItemCard[]
	title: string
}

const MovieOrTVShowPersonList: FC<PropsType> = ({ itemsList, title }) => {
	const {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	} = useItemsToShow(itemsList, 8)

	if (!itemsToShow.length) {
		return <EmptyList title={title} />
	}

	return (
		<div ref={listRef} className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8'>
				{(itemsToShow as IItemCard[]).map((item: IItemCard, idx) => {
					return (
						<ItemCard
							key={idx}
							item={item}
							isShowButton={false}
							collectionType={UserCollections.person}
							isShowRole
						/>
					)
				})}
			</div>
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={getItemsToShow}
				>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default MovieOrTVShowPersonList
