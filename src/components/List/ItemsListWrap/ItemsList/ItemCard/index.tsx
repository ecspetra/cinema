import React, { FC } from 'react'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Link from 'next/link'
import Image from '../../../../Images/Image'
import Title from '../../../../../app/components/UI/Title/Title'
import Tag from '../../../../Tag'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import MarkSmall from '@/components/Mark/MarkSmall'
import moment from 'moment'
import { CSSTransition } from 'react-transition-group'
import { IItemCard } from '../../../../../../interfaces'

type PropsType = {
	item: IItemCard
	type: string
	isShowButton?: boolean
	isCollectionListItem?: boolean
	isShowRole?: boolean
}

const ItemCard: FC<PropsType> = ({
	item,
	type,
	isShowButton = true,
	isCollectionListItem = false,
	isShowRole = false,
}) => {
	const {
		id,
		media_type,
		genres,
		poster_path,
		profile_path,
		first_air_date,
		release_date,
		title,
		name,
		job,
		character,
	} = item
	const {
		isMounted,
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(item, media_type ?? type)

	const isShowTags = genres?.length > 0
	const cardType = media_type ?? type
	const isShowMark = cardType === 'movie' || cardType === 'tv'
	const cardCover = poster_path ?? profile_path
	const cardTitle = title ?? name

	const itemCard = (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link
				href={`/${cardType}/${id}`}
				as={`/${cardType}/${id}`}
				className='group relative'
			>
				{isShowMark && (
					<MarkSmall
						itemId={id}
						type={type}
						className='absolute -right-3 -top-3'
					/>
				)}
				<Image
					className='duration-300 mb-4 group-hover:border-rose-600 border-4'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${cardCover}`}
					defaultImage={
						cardType !== 'person'
							? defaultMovieImage
							: defaultUserImage
					}
				/>
				<Title variant='h3'>
					{cardTitle}
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
				{isShowRole && <p className='text-xs'>{character ?? job}</p>}
			</Link>
			{isShowTags && (
				<div className='flex flex-wrap mb-2 relative'>
					{genres.map((item, idx) => {
						return <Tag key={idx} tag={item} />
					})}
				</div>
			)}
			{isShowButton && (
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
			)}
		</div>
	)

	return (
		<>
			{isCollectionListItem ? (
				<CSSTransition
					in={isMounted}
					timeout={500}
					classNames='collection-card'
					unmountOnExit
				>
					{itemCard}
				</CSSTransition>
			) : (
				itemCard
			)}
		</>
	)
}

export default ItemCard