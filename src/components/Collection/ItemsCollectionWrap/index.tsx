import React, { FC } from 'react'
import PersonCard from '@/components/Person/PersonList/PersonCard'
import { IMovieCard, IPersonCard } from '../../../../interfaces'
import Link from 'next/link'
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
		<>
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
							<MovieCard
								item={item}
								isShowButton={false}
								key={idx}
							/>
						)
					}
				})}
			</div>
			{isMoreDataAvailable && (
				<Link
					href={`/collection/[type]?uid=${userId}&type=${type}`}
					as={`/collection/${type}?uid=${userId}&type=${type}`}
					className='w-72 border-2 border-rose-600 duration-300 font-semibold leading-none text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center mx-auto mt-8'
				>
					View all
				</Link>
			)}
		</>
	)
}

export default ItemsCollectionWrap
