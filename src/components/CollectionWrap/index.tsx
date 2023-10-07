import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import { USER_COLLECTIONS } from '@/firebase/config'
import { IMovieCard, IPersonCard } from '../../../interfaces'
import MovieCard from '@/components/Movie/MovieCard'
import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'

type PropsType = {
	title: string
	type: (typeof USER_COLLECTIONS)[number]
	collection: Array<IMovieCard> | Array<IPersonCard>
	isShowMoreButton: boolean
}

const CollectionWrap: FC<PropsType> = ({
	title,
	type,
	collection,
	isShowMoreButton,
}) => {
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

	if (!collection.length) {
		return (
			<div className='mb-16'>
				<Title>{title}</Title>
				<p>
					This collection is empty. Please add some items in this
					collection
				</p>
			</div>
		)
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			<div>
				<>
					{collection.map((item, idx) => {
						return <MovieCard movie={item} key={idx} />
					})}
					{isShowMoreButton && (
						<Link
							href={`/collection/${type}?uid=${userId}`}
							as={`/collection/${type}?uid=${userId}`}
						>
							<span>View all</span>
						</Link>
					)}
				</>
			</div>
		</div>
	)
}

export default CollectionWrap
