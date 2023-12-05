import React, { FC } from 'react'
import defaultPersonImage from '../../../../../app/assets/images/default-person-image.svg'
import defaultMovieImage from '../../../../../app/assets/images/default-movie-image.svg'
import Link from 'next/link'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import moment from 'moment'
import { ISearchCard } from '../../../../../../interfaces'
import Image from '@/components/Images/Image'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	item: ISearchCard
}

const SearchCard: FC<PropsType> = ({ item }) => {
	const {
		id,
		media_type,
		poster_path,
		profile_path,
		title,
		name,
		release_date,
		first_air_date,
	} = item
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(item, media_type)

	return (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link
				href={`/${media_type}/[id]`}
				as={`/${media_type}/${id}`}
				className='group relative'
			>
				<Image
					className='duration-300 mb-4 group-hover:border-rose-600 border-4'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${
						poster_path ? poster_path : profile_path
					}`}
					defaultImage={
						media_type === 'person'
							? defaultPersonImage
							: defaultMovieImage
					}
				/>
				<Title variant='h3'>
					{title ? title : name}
					{(release_date || first_air_date) && (
						<span className='ml-1'>
							(
							{moment(
								release_date ? release_date : first_air_date
							).format('YYYY')}
							)
						</span>
					)}
				</Title>
			</Link>
			<CollectionButton
				className='mt-auto w-full'
				isLoadingCollection={isLoadingCollection}
				isCollectionItem={isCollectionItem}
				onClick={
					isCollectionItem
						? openConfirmationPopup
						: handleSetCollectionItem
				}
			/>
		</div>
	)
}

export default SearchCard
