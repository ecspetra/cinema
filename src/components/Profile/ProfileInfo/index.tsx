import { FC, useEffect, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'
import React from 'react'
import DetailsList from '@/components/Details/DetailsList'

type PropsType = {
	userInfo: object
}

const ProfileInfo: FC<PropsType> = ({ userInfo }) => {
	const [profile, setProfile] = useState(null)

	const details = [
		{
			type: 'user_email',
			title: 'Email:',
			text: profile?.email,
		},
		{
			type: 'user_date_of_birth',
			title: 'Date of birth:',
			text: profile?.dateOfBirth,
		},
		{
			type: 'user_country',
			title: 'Country:',
			text: profile?.country,
		},
	]

	useEffect(() => {
		setProfile(userInfo)
	}, [userInfo])

	return (
		<div className='flex flex-col justify-start items-center'>
			<div className='w-full'>
				<Title className='text-7xl after:hidden pb-0'>
					{profile?.displayName}
				</Title>
				<DetailsList itemsList={details} className='!mb-8' />
				<div className='mb-8'>
					<Title variant='h3'>About</Title>
					{profile?.about ? profile?.about : 'No info yet'}
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
