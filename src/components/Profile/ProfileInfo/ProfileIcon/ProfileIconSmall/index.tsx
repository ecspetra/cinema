import { FC } from 'react'
import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Link from 'next/link'
import { PROFILE_PAGE } from '@/constants/paths'

type PropsType = {
	userId: string
	photoURL: string
}

const ProfileIconSmall: FC<PropsType> = ({ userId, photoURL }) => {
	const isUserFromDB = userId !== undefined

	const profileIcon = (
		<Image
			className='aspect-square !w-10 h-10 mr-3 rounded-full overflow-hidden'
			src={photoURL}
			defaultImage={defaultUserImage}
		/>
	)
	return (
		<>
			{isUserFromDB ? (
				<Link href={PROFILE_PAGE.replace('{userId}', userId)}>
					{profileIcon}
				</Link>
			) : (
				profileIcon
			)}
		</>
	)
}

export default ProfileIconSmall
