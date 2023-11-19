import CollectionWrap from '@/components/Collection/CollectionWrap'
import {
	IMark,
	IMovieCard,
	IPersonCard,
	IReviewCardFromDB,
} from '../../../interfaces'
import React, { FC } from 'react'

type PropsType = {
	movies: object
	persons: object
	marks: object
	reviews: object
	isCurrentUserCollection?: boolean
}

const UserCollection: FC<PropsType> = ({
	movies,
	persons,
	marks,
	reviews,
	isCurrentUserCollection = true,
}) => {
	return (
		<div className='relative z-10'>
			<CollectionWrap
				title='Movies'
				type='movie'
				items={movies ? movies.items : []}
				isMoreDataAvailable={
					movies ? movies.isMoreDataAvailable : false
				}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Persons'
				type='person'
				items={persons ? persons.items : []}
				isMoreDataAvailable={
					persons ? persons.isMoreDataAvailable : false
				}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Marks'
				type='marks'
				items={marks ? marks : []}
				isMoreDataAvailable={false}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Reviews'
				type='reviews'
				items={reviews ? reviews : []}
				isMoreDataAvailable={false}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
		</div>
	)
}

export default UserCollection
