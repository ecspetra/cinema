import { FC } from 'react'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import { IDetailsItem, IPersonImage, IPersonInfo } from '../../../../interfaces'
import Title from '../../../app/components/UI/Title/Title'
import CollectionButton from '../../../app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import { getPersonGender } from '@/handlers/getPersonGender'
import ImagesList from '@/components/Images/ImagesList'
import DetailsList from '@/components/Details/DetailsList'
import { CARD_IMAGE_SRC } from '@/constants/images'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	personInfo: IPersonInfo
	personImages: IPersonImage[]
}

const PersonInfo: FC<PropsType> = ({ personInfo, personImages }) => {
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(personInfo, UserCollections.person)
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

	const imageFullSrc = profile_path
		? CARD_IMAGE_SRC.replace('{imageSrc}', profile_path)
		: ''

	const details: IDetailsItem[] = [
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
		<div className='flex gap-7 py-7 mb-16 flex-wrap md:flex-nowrap'>
			<div className='w-full max-w-[240px] md:max-w-[340px] mx-auto mt-24 md:mt-0'>
				<div className='sticky top-8'>
					<Image
						src={imageFullSrc}
						defaultImage={defaultMovieImage}
					/>
				</div>
			</div>
			<div className='w-full'>
				<Title className='text-3xl md:text-7xl after:hidden pb-0'>
					{name}
				</Title>
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
