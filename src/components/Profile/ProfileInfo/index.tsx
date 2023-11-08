import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAt,
	faBarsStaggered,
	faFlag,
	faPen,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const ProfileInfo = ({ userInfo, onOpenEditForm }) => {
	const basicInfo = [
		{ ['Email']: userInfo?.email, icon: faAt },
		{
			['Date of birth']: userInfo?.dateOfBirth
				? userInfo?.dateOfBirth
				: 'no info',
			icon: faFlag,
		},
		{
			['Favorite genres']: userInfo?.favoriteGenres
				? userInfo?.favoriteGenres
				: 'no info',
			icon: faBarsStaggered,
		},
	]

	return (
		<div className='flex justify-start items-start z-10 gap-7'>
			<Image
				className='!w-[232px] h-[232px] rounded-full'
				src={userInfo.photoURL}
				defaultImage={defaultUserImage}
			/>
			<div>
				<div className='flex justify-start items-center gap-4 mb-4'>
					<Title className='after:hidden !pb-0 mb-0'>
						{userInfo.displayName}
					</Title>
					<Button context='icon' onClick={() => onOpenEditForm(true)}>
						<FontAwesomeIcon icon={faPen} />
					</Button>
				</div>
				<div className='mb-5'>
					{basicInfo.map((item, idx) => {
						return (
							<div
								key={idx}
								className='flex items-center text-sm'
							>
								<FontAwesomeIcon
									className='mr-1.5'
									icon={Object.values(item)[1]}
								/>
								<span className='mr-1.5'>
									{Object.keys(item)[0]}:{' '}
									{Object.values(item)[0]}
								</span>
							</div>
						)
					})}
				</div>
				<div className='mb-5'>
					<Title variant='h3'>Friends</Title>
					{userInfo.friends ? userInfo.friends : 'no info'}
				</div>
				<div className='mb-5'>
					<Title variant='h3'>Biography</Title>
					{userInfo.biography ? userInfo.biography : 'no info'}
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
