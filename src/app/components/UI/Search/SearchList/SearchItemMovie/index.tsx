import React, { FC } from 'react'
import moment from 'moment/moment'
import MovieCardSmall from '@/components/Movie/MovieCard/MovieCardSmall'
import Link from 'next/link'

type PropsType = {
	item: object
	type: string
}

const SearchItemMovie: FC<PropsType> = ({ item, type }) => {
	return (
		<Link
			href={`/${type}/[id]`}
			as={`/${type}/${item.id}`}
			className='flex justify-start items-center gap-4 w-full hover:bg-rose-600 duration-300 p-2'
		>
			<MovieCardSmall
				itemId={item.id}
				className='!w-16 !h-24'
				type={type}
			/>
			<span>
				<span className='flex flex-col justify-start items-start'>
					<span className='font-semibold'>{item.title}</span>
					{(item.release_date || item.first_air_date) && (
						<span className='text-xs font-light'>
							(
							{moment(
								item.release_date
									? item.release_date
									: item.first_air_date
							).format('YYYY')}
							)
						</span>
					)}
				</span>
			</span>
		</Link>
	)
}

export default SearchItemMovie
