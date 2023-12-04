import React, { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import { USER_COLLECTIONS } from '@/firebase/config'
import {
	IMark,
	IMovieCard,
	IPersonCard,
	IReviewCardFromDB,
} from '../../../../interfaces'
import EmptyList from '@/components/List/EmptyList'
import ReviewList from '@/components/Review/ReviewList'
import MarksCollectionWrap from '@/components/Collection/CollectionWrap/MarksCollectionWrap'
import ItemsCollectionWrap from '@/components/Collection/ItemsCollectionWrap'

type PropsType = {
	title: string
	type: (typeof USER_COLLECTIONS)[number]
	items:
		| Array<IMovieCard>
		| Array<IPersonCard>
		| Array<IReviewCardFromDB>
		| Array<IMark>
	isMoreDataAvailable: boolean
	isCurrentUserCollection: boolean
}

const CollectionWrap: FC<PropsType> = ({
	title,
	type,
	items,
	isMoreDataAvailable,
	isCurrentUserCollection,
}) => {
	const getItemsList = () => {
		switch (type) {
			case 'reviews':
				return (
					<ReviewList
						reviews={items}
						isShowTitle={false}
						className='!mb-0'
						isCollectionList
					/>
				)
			case 'marks':
				return <MarksCollectionWrap items={items} />
			case 'movie':
				return (
					<ItemsCollectionWrap
						items={items}
						type={type}
						isMoreDataAvailable={isMoreDataAvailable}
					/>
				)
			case 'person':
				return (
					<ItemsCollectionWrap
						items={items}
						type={type}
						isMoreDataAvailable={isMoreDataAvailable}
						isPersonList
					/>
				)
		}
	}

	const getEmptyCollectionText = () => {
		switch (type) {
			case 'movie':
			case 'person':
				return `Please add some ${type} to your collection before you can see it here`
			case 'tv':
				return `Please add some TV show to your collection before you can see it here`
			case 'marks':
				return `Please rate something before you can see it here`
			case 'reviews':
			case 'replies':
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
		<div className='mb-16 last:mb-0'>
			<Title>{title}</Title>
			{getItemsList()}
		</div>
	)
}

export default CollectionWrap
