import { FC } from 'react'
import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Link from 'next/link'
import { PROFILE_PAGE } from '@/constants/paths'
import classNames from 'classnames'

type PropsType = {
	photoURL: string
	isLinkToProfile?: boolean
	userId?: string
	className?: string
}

const ProfileIconSmall: FC<PropsType> = ({
	photoURL,
	isLinkToProfile = false,
	userId,
	className,
}) => {
	const isUserFromDB = userId !== undefined

	const profileIcon = (
		<Image
			className={classNames(
				'aspect-square !w-7 !h-7 md:!w-10 md:!h-10 mr-3 rounded-full overflow-hidden flex-none',
				className
			)}
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
