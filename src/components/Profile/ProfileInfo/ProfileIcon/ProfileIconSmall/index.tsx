import { FC } from 'react'
import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Link from 'next/link'
import { PROFILE_PAGE } from '@/constants/paths'

type PropsType = {
	photoURL: string
	isLinkToProfile?: boolean
	userId?: string
}

const ProfileIconSmall: FC<PropsType> = ({
	photoURL,
	isLinkToProfile = false,
	userId,
}) => {
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
			{isLinkToProfile && isUserFromDB ? (
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
