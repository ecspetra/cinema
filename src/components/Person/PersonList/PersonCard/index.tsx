import { IPersonCard } from '../../../../../interfaces'
import React, { FC } from 'react'
import defaultPersonImage from '../../../../app/assets/images/default-person-image.svg'
import Image from '../../../Images/Image'
import Link from 'next/link'
import Title from '../../../../app/components/UI/Title/Title'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useAuth } from '@/context/AuthProvider'
import { useCollectionButton } from '@/hooks/useCollectionButton'

type PropsType = {
	item: IPersonCard
	isShowButton?: boolean
	isShowRole?: boolean
}

const PersonCard: FC<PropsType> = ({
	item,
	isShowButton = true,
	isShowRole = false,
}) => {
	const { userId } = useAuth()
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(item, 'person')

	const { id, job, name, character, profile_path } = item

	return (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link
				href={`/person/[id]`}
				as={`/person/${id}`}
				className='group text-sm'
			>
				<Image
					className='duration-300 mb-4 group-hover:shadow-amber-700/30 group-hover:shadow-2xl'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${profile_path}`}
					defaultImage={defaultPersonImage}
				/>
				<Title className='relative z-10' variant='h3'>
					{name}
				</Title>
				{isShowRole && (
					<p className='relative z-10 text-xs'>{character ?? job}</p>
				)}
			</Link>
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
}

export default PersonCard
