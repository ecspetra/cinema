import { FC, useEffect, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAt,
	faCalendarCheck,
	faFlag,
	faPen,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type PropsType = {
	userInfo: object
	onOpenEditForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileInfo: FC<PropsType> = ({ userInfo, onOpenEditForm }) => {
	const [profile, setProfile] = useState(null)

	const basicInfo = [
		{ ['Email']: profile?.email, icon: faAt },
		{
			['Date of birth']: profile?.dateOfBirth
				? profile?.dateOfBirth
				: 'no info',
			icon: faCalendarCheck,
		},
		{
			['Country']: profile?.country ? profile?.country : 'no info',
			icon: faFlag,
		},
	]

	useEffect(() => {
		setProfile(userInfo)
	}, [userInfo])

	return (
		<div className='flex flex-col justify-start items-center z-10'>
			<div className='w-full'>
				<div className='flex justify-center items-center gap-4 mb-4'>
					<Title className='after:hidden !pb-0 !mb-0'>
						{profile?.displayName}
					</Title>
					<Button context='icon' onClick={() => onOpenEditForm(true)}>
						<FontAwesomeIcon icon={faPen} />
					</Button>
				</div>
				<div className='mb-16 flex justify-center items-start gap-7'>
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
				<div className='mb-8 pb-8 text-center border-b border-slate-800'>
					<Title variant='h3'>Biography</Title>
					{profile?.biography ? profile?.biography : 'no info'}
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
