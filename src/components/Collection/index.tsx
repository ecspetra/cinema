import CollectionWrap from '@/components/Collection/CollectionWrap'
import React, { FC } from 'react'
import {
	IFetchedResult,
	IItemCard,
	IMark,
	IReviewItemCard,
} from '../../../interfaces'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	movies: IFetchedResult<IItemCard>['items'] | null
	tvShows: IFetchedResult<IItemCard>['items'] | null
	persons: IFetchedResult<IItemCard>['items'] | null
	marks: IFetchedResult<IMark>['items']
	reviews: IFetchedResult<IReviewItemCard>['items']
	isCurrentUserCollection?: boolean
	collectionOwnerId?: string
}

const GeneralUserCollection: FC<PropsType> = ({
	movies,
	tvShows,
	persons,
	marks,
	reviews,
	isCurrentUserCollection = true,
	collectionOwnerId,
}) => {
	return (
		<div>
			<CollectionWrap
				title='Movies'
				collectionType={UserCollections.movie}
				items={movies ?? []}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='TV shows'
				collectionType={UserCollections.tv}
				items={tvShows ?? []}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Persons'
				collectionType={UserCollections.person}
				items={persons ?? []}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Marks'
				collectionType={UserCollections.marks}
				items={marks ?? []}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Reviews'
				collectionType={UserCollections.reviews}
				items={reviews ?? []}
				isCurrentUserCollection={isCurrentUserCollection}
				collectionOwnerId={collectionOwnerId}
			/>
		</div>
	)
}

export default GeneralUserCollection
