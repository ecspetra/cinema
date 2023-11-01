import MovieCard from '../../Movie/MovieCard'
import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { collectionListener, getCollectionItemsList } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'
import Loader from '@/components/Loader'
import PersonCard from '../../Person/PersonList/PersonCard'
import EmptyList from '@/components/List/EmptyList'

type PropsType = {
	collectionName: 'movie' | 'person'
	items: Array<IMovieCard>
	isMoreDataAvailable: boolean
	title: string
}

const CollectionItemsList: FC<PropsType> = ({
	collectionName,
	items,
	isMoreDataAvailable,
	title,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [lastItemId, setLastItemId] = useState<string | undefined>(undefined)
	const [itemsToShow, setItemsToShow] = useState<
		Array<IMovieCard | IPersonCard>
	>([...items])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState<boolean>(isMoreDataAvailable)
	const { userId } = useAuth()

	const getMoreCollectionItems = async () => {
		setIsLoading(true)
		const result = await getCollectionItemsList(
			userId,
			collectionName,
			20,
			lastItemId
		)
		result.items.map(item => {
			setItemsToShow(prevState => [...prevState, item])
		})
		setIsShowMoreButton(result.isMoreDataAvailable)
		setIsLoading(false)
	}

	useEffect(() => {
		const unsubscribe = collectionListener(
			userId,
			collectionName,
			itemsToShow,
			setItemsToShow,
			setIsShowMoreButton
		)

		return () => {
			unsubscribe()
		}
	}, [itemsToShow])

	useEffect(() => {
		if (lastItemId) getMoreCollectionItems()
	}, [lastItemId])

	if (!itemsToShow.length) {
		return <EmptyList title={title} />
	}

	return (
		<div className='mb-16 z-10'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{itemsToShow.map((item: IMovieCard | IPersonCard) => {
					if (collectionName === 'movie') {
						return <MovieCard key={item.id} item={item} />
					} else return <PersonCard key={item.id} item={item} />
				})}
			</div>
			{isLoading && <Loader type='static' />}
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={() =>
						setLastItemId(
							itemsToShow[itemsToShow.length - 1].id.toString()
						)
					}
				>
					Show more
				</Button>
			)}
		</div>
	)
}

export default CollectionItemsList
