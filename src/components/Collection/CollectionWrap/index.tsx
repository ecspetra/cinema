import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import { USER_COLLECTIONS } from '@/firebase/config'
import {
	IMark,
	IMovieCard,
	IPersonCard,
	IReviewCardFromDB,
} from '../../../../interfaces'
import MovieCard from '@/components/Movie/MovieCard'
import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import PersonCard from '../../Person/PersonList/PersonCard'
import EmptyList from '@/components/List/EmptyList'
import ReviewList from '@/components/Review/ReviewList'
import MovieCardSmall from '@/components/Movie/MovieCard/MovieCardSmall'
import ReviewsCollectionWrap from '@/components/Collection/CollectionWrap/ReviewsCollectionWrap'
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
}

const CollectionWrap: FC<PropsType> = ({
	title,
	type,
	items,
	isMoreDataAvailable,
}) => {
	const getItemsList = () => {
		switch (type) {
			case 'reviews':
				return (
					<ReviewsCollectionWrap
						type={type}
						items={items}
						isMoreDataAvailable={isMoreDataAvailable}
					/>
				)
			case 'marks':
				return <MarksCollectionWrap items={items} />
			case 'movies':
				return (
					<ItemsCollectionWrap
						items={items}
						type={type}
						isMoreDataAvailable={isMoreDataAvailable}
					/>
				)
			case 'persons':
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
				text='This collection is empty. Please add some items in this
					collection before you can see it here'
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
