import CollectionWrap from '@/components/Collection/CollectionWrap'
import React, { FC } from 'react'

type PropsType = {
	movies: object
	tvShows: object
	persons: object
	marks: object
	reviews: object
	isCurrentUserCollection?: boolean
}

const UserCollection: FC<PropsType> = ({
	movies,
	tvShows,
	persons,
	marks,
	reviews,
	isCurrentUserCollection = true,
}) => {
	return (
		<div>
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
				title='TV shows'
				type='tv'
				items={tvShows ? tvShows.items : []}
				isMoreDataAvailable={
					tvShows ? tvShows.isMoreDataAvailable : false
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
