import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import { USER_COLLECTIONS } from '@/firebase/config'
import {
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

type PropsType = {
	title: string
	type: (typeof USER_COLLECTIONS)[number]
	items: Array<IMovieCard> | Array<IPersonCard> | Array<IReviewCardFromDB>
	isMoreDataAvailable: boolean
}

const CollectionWrap: FC<PropsType> = ({
	title,
	type,
	items,
	isMoreDataAvailable,
}) => {
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

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
			{type === 'reviews' ? (
				<ReviewList
					reviews={items}
					isShowTitle={false}
					isCollectionList
				/>
			) : (
				<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
					{items.map((item, idx) => {
						if (idx <= 4) {
							return type === 'movies' ? (
								<MovieCard
									movie={item}
									isShowButton={false}
									key={idx}
								/>
							) : (
								<PersonCard
									person={item}
									key={idx}
									isShowButton={false}
								/>
							)
						}
					})}
				</div>
			)}

			{isMoreDataAvailable && (
				<Link
					href={`/collection/${type}?uid=${userId}`}
					as={`/collection/${type}?uid=${userId}`}
					className='flex justify-center items-center'
				>
					<Button context='empty'>View all</Button>
				</Link>
			)}
		</div>
	)
}

export default CollectionWrap
