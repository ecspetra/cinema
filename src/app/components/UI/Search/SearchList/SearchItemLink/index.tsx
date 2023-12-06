import React, { FC } from 'react'
import moment from 'moment/moment'
import ItemCardSmall from '@/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall'
import Link from 'next/link'

type PropsType = {
	item: object
	type: string
}

const SearchItemLink: FC<PropsType> = ({ item, type }) => {
	const { id, title, name, release_date, first_air_date } = item
	return (
		<Link
			href={`/${type}/[id]`}
			as={`/${type}/${id}`}
			className='flex justify-start items-center gap-4 w-full hover:bg-rose-600 duration-300 p-2'
		>
			<ItemCardSmall itemId={id} className='!w-16 !h-24' type={type} />
			<span>
				<span className='flex flex-col justify-start items-start'>
					<span className='font-semibold'>
						{title ? title : name}
					</span>
					{(release_date || first_air_date) && (
						<span className='text-xs font-light'>
							(
							{moment(
								release_date ? release_date : first_air_date
							).format('YYYY')}
							)
						</span>
					)}
				</span>
			</span>
		</Link>
	)
}

export default SearchItemLink
