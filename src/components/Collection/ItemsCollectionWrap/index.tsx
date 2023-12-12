import React, { FC } from 'react'
import { IItemCard } from '../../../../interfaces'
import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import ItemCard from '../../List/ItemsListWrap/ItemsList/ItemCard'

type PropsType = {
	items: Array<IItemCard>
	collectionType: string
	isMoreDataAvailable: boolean
}

const ItemsCollectionWrap: FC<PropsType> = ({
	items,
	collectionType,
	isMoreDataAvailable,
}) => {
	const { userId } = useAuth()
	const maxListLength = 4

	return (
		<>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{items.map((item, idx) => {
					if (idx <= maxListLength) {
						return (
							<ItemCard
								item={item}
								collectionType={collectionType}
								isShowButton={false}
								key={idx}
							/>
						)
					}
				})}
			</div>
			{isMoreDataAvailable && (
				<Link
					href={`/collection/[type]?uid=${userId}&type=${collectionType}`}
					as={`/collection/${collectionType}?uid=${userId}&type=${collectionType}`}
					className='w-72 border-2 border-rose-600 duration-300 font-semibold leading-none text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center mx-auto mt-8'
				>
					View all
				</Link>
			)}
		</>
	)
}

export default ItemsCollectionWrap
