import React, { FC } from 'react'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import {
	faCalendarCheck,
	faFlag,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IPersonImage, IPersonInfo } from '../../../../interfaces'
import Title from '../../../app/components/UI/Title/Title'
import { useAuth } from '@/context/AuthProvider'
import CollectionButton from '../../../app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import moment from 'moment/moment'
import { getPersonGender } from '@/handlers/getPersonGender'
import ImagesList from '@/components/Images/ImagesList'

type PropsType = {
	personInfo: IPersonInfo
	personImages: Array<IPersonImage>
}

const PersonInfo: FC<PropsType> = ({ personInfo, personImages }) => {
	const { currentUser } = useAuth()
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		handleRemoveCollectionItem,
	} = useCollectionButton(personInfo, 'persons')
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

	return (
		<div className='flex gap-x-7 py-7 z-10 mb-16'>
			<div className='w-full max-w-[340px]'>
				<div className='sticky top-8'>
					<Image
						src={`https://image.tmdb.org/t/p/w440_and_h660_face${profile_path}`}
						defaultImage={defaultMovieImage}
					/>
				</div>
			</div>
			<div className='w-full'>
				<Title className='text-7xl'>{name}</Title>
				<Title variant='h2' className='text-slate-400'>
					{known_for_department}
				</Title>
				<div className='mb-5'>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
						<span className='mr-1.5'>Place of birth:</span>
						<span>{place_of_birth}</span>
					</div>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5'>Date of birth:</span>
						<span>
							<span>{moment(birthday).format('MM.DD.YYYY')}</span>
							{deathday && (
								<span>
									{' '}
									— Date of death:{' '}
									{moment(deathday).format('MM.DD.YYYY')}
								</span>
							)}
						</span>
					</div>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon className='mr-1.5' icon={faUser} />
						<span className='mr-1.5'>Gender: {genderInString}</span>
					</div>
				</div>
				<p className='mb-6'>{biography}</p>
				<CollectionButton
					className='mb-12'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? () =>
									handleRemoveCollectionItem(
										id,
										currentUser?.uid
									)
							: () => handleSetCollectionItem(personInfo)
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
