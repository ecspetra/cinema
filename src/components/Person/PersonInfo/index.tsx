import React, { FC } from 'react'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import { IPersonImage, IPersonInfo } from '../../../../interfaces'
import Title from '../../../app/components/UI/Title/Title'
import CollectionButton from '../../../app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import { getPersonGender } from '@/handlers/getPersonGender'
import ImagesList from '@/components/Images/ImagesList'
import DetailsList from '@/components/Details/DetailsList'

type PropsType = {
	personInfo: IPersonInfo
	personImages: Array<IPersonImage>
}

const PersonInfo: FC<PropsType> = ({ personInfo, personImages }) => {
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(personInfo, 'person')
	const {
		profile_path,
		name,
		biography,
		known_for_department,
		place_of_birth,
		birthday,
		deathday,
		gender,
		id,
	} = personInfo

	const genderInString = getPersonGender(gender)

	const details = [
		{
			type: 'place_of_birth',
			title: 'Place of birth:',
			text: place_of_birth,
		},
		{
			type: 'birthday',
			title: { birthday: 'Date of birth:', deathday: 'Date of death:' },
			text: { birthday, deathday },
		},
		{
			type: 'gender',
			title: 'Gender:',
			text: genderInString,
		},
	]

	return (
		<div className='flex gap-7 py-7 mb-16'>
			<div className='w-full max-w-[340px]'>
				<div className='sticky top-8'>
					<Image
						src={`https://image.tmdb.org/t/p/w440_and_h660_face${profile_path}`}
						defaultImage={defaultMovieImage}
					/>
				</div>
			</div>
			<div className='w-full'>
				<Title className='text-7xl after:hidden pb-0'>{name}</Title>
				<Title variant='h2' className='text-gray-400'>
					{known_for_department}
				</Title>
				<DetailsList itemsList={details} />
				<p className='mb-6'>{biography}</p>
				<CollectionButton
					className='mb-12'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? openConfirmationPopup
							: handleSetCollectionItem
					}
				/>
				<ImagesList
					images={personImages}
					isPersonImages
					className='!mb-0'
				/>
			</div>
		</div>
	)
}

export default PersonInfo
