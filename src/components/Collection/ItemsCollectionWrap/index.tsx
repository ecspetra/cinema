import React, { FC } from 'react'
import PersonCard from '@/components/Person/PersonList/PersonCard'
import { IMovieCard, IPersonCard } from '../../../../interfaces'
import Link from 'next/link'
import Button from '@/app/components/UI/Button'
import { useAuth } from '@/context/AuthProvider'
import MovieCard from '@/components/Movie/MovieCard'

type PropsType = {
	items: Array<IPersonCard | IMovieCard>
	type: string
	isMoreDataAvailable: boolean
	isPersonList?: boolean
}

const ItemsCollectionWrap: FC<PropsType> = ({
	items,
	type,
	isMoreDataAvailable,
	isPersonList = false,
}) => {
	const { userId } = useAuth()
	const maxListLength = 4

	return (
		<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
			{items.map((item, idx) => {
				if (idx <= maxListLength) {
					return isPersonList ? (
						<PersonCard
							item={item}
							key={idx}
							isShowButton={false}
						/>
					) : (
						<MovieCard item={item} isShowButton={false} key={idx} />
					)
				}
			})}
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

export default ItemsCollectionWrap
