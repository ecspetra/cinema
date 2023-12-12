import React, { FC } from 'react'
import moment from 'moment/moment'
import ItemCardSmall from '@/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall'
import Link from 'next/link'

type PropsType = {
	item: object
	collectionType: string
}

const SearchItemLink: FC<PropsType> = ({ item, collectionType }) => {
	const { id, title, name, release_date, first_air_date, media_type } = item
	const itemType = media_type ?? collectionType

	return (
		<Link
			href={`/${itemType}/[id]`}
			as={`/${itemType}/${id}`}
			className='flex justify-start items-center gap-4 w-full hover:bg-rose-600 duration-300 p-2'
		>
			<ItemCardSmall
				itemId={id}
				className='!w-16 !h-24'
				type={itemType}
			/>
			<span>
				<span className='flex flex-col justify-start items-start'>
					<span className='font-semibold'>{title ?? name}</span>
					{(release_date || first_air_date) && (
						<span className='text-xs font-light'>
							(
							{moment(release_date ?? first_air_date).format(
								'YYYY'
							)}
							)
						</span>
					)}
				</span>
			</span>
		</Link>
	)
}

export default SearchItemLink
