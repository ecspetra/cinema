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

	if (!items.length) {
		return (
			<EmptyList
				title={title}
				text={`This collection is empty. ${
					isCurrentUserCollection
						? `Please add some items in this
				collection before you can see it here`
						: ''
				}`}
			/>
		)
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			{getItemsList()}
		</div>
	)
}

export default CollectionWrap
