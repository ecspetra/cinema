import { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import { IItemCard, IMark, IReviewItemCard } from '../../../../interfaces'
import EmptyList from '@/components/List/EmptyList'
import ReviewList from '@/components/Review/ReviewList'
import MarksCollectionWrap from '@/components/Collection/CollectionWrap/MarksCollectionWrap'
import ItemsCollectionWrap from '@/components/Collection/ItemsCollectionWrap'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	title: string
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.reviews
		| UserCollections.marks
	items: IItemCard[] | IReviewItemCard[] | IMark[]
	isCurrentUserCollection: boolean
	collectionOwnerId?: string
}

const CollectionWrap: FC<PropsType> = ({
	title,
	collectionType,
	items,
	isCurrentUserCollection,
	collectionOwnerId,
}) => {
	const isShowTitle = collectionType !== UserCollections.reviews
	const getItemsList = () => {
		switch (collectionType) {
			case 'reviews':
				return (
					<ReviewList
						reviews={items as IReviewItemCard[]}
						className='!mb-0'
						collectionOwnerId={collectionOwnerId}
						isCollectionList
					/>
				)
			case 'marks':
				return <MarksCollectionWrap items={items as IMark[]} />
			case 'movie':
			case 'tv':
			case 'person':
				return (
					<ItemsCollectionWrap
						items={items as IItemCard[]}
						collectionType={collectionType}
					/>
				)
		}
	}

	const getEmptyCollectionText = () => {
		switch (collectionType) {
			case 'movie':
			case 'person':
				return `Please add some ${collectionType} to your collection before you can see it here`
			case 'tv':
				return `Please add some TV show to your collection before you can see it here`
			case 'marks':
				return `Please rate something before you can see it here`
			case 'reviews':
				return `Please write a review before you can see it here`
		}
	}

	if (!items.length) {
		return (
			<EmptyList
				title={title}
				text={
					isCurrentUserCollection
						? getEmptyCollectionText()
						: undefined
				}
				className='border border-gray-500 mb-4 p-4 last:mb-0'
			/>
		)
	}

	return (
		<div className='my-16 first:mt-0 last:mb-0'>
			{isShowTitle && <Title>{title}</Title>}
			{getItemsList()}
		</div>
	)
}

export default CollectionWrap
