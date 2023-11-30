import { FC, useEffect, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAt,
	faCalendarCheck,
	faFlag,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import moment from 'moment'

type PropsType = {
	userInfo: object
}

const ProfileInfo: FC<PropsType> = ({ userInfo }) => {
	const [profile, setProfile] = useState(null)

	const basicInfo = [
		{ ['Email']: profile?.email, icon: faAt },
		{
			['Date of birth']: profile?.dateOfBirth
				? moment(profile?.dateOfBirth).format('Do MMM YYYY')
				: 'No info yet',
			icon: faCalendarCheck,
		},
		{
			['Country']: profile?.country ? profile?.country : 'No info yet',
			icon: faFlag,
		},
	]

	useEffect(() => {
		setProfile(userInfo)
	}, [userInfo])

	return (
		<div className='flex flex-col justify-start items-center'>
			<div className='w-full'>
				<Title className='after:hidden !pb-0'>
					{profile?.displayName}
				</Title>
				<div className='flex justify-start items-start gap-7 mb-8 pb-8 border-b border-slate-800'>
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
				<div className='mb-8 pb-8 border-b border-slate-800'>
					<Title variant='h3'>About</Title>
					{profile?.about ? profile?.about : 'No info yet'}
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
