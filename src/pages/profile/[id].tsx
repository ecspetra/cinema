import { NextPageContext } from 'next'
import { getUserInfo } from '@/firebase/config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import Image from '@/components/Images/Image'
import defaultUserImage from '@/app/assets/images/default-user-image.svg'
import Title from '@/app/components/UI/Title/Title'

const Profile = ({ results }) => {
	const [userInfo, setUserInfo] = useState(null)
	const router = useRouter()

	useEffect(() => {
		const getUser = async () => {
			const userIdFromUrl = router.query.id

			try {
				const result = await getUserInfo(userIdFromUrl)
				setUserInfo(result)
			} catch (error) {
				setUserInfo(null)
			}
		}

		if (!results) getUser()
	}, [])

	useEffect(() => {
		setUserInfo(results)
	}, [results])

	if (!userInfo) return <Loader />

	return (
		<div className='flex justify-start items-start'>
			<Image
				className='!w-11 h-11 rounded-full'
				src={userInfo.photoURL}
				defaultImage={defaultUserImage}
			/>
			<div>
				<Title>{userInfo.displayName}</Title>
				<span>{userInfo.email}</span>
			</div>
		</div>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const userIdFromUrl = ctx.query.id

	try {
		const result = await getUserInfo(userIdFromUrl)

		return {
			props: {
				results: result,
			},
		}
	} catch (error) {
		return {
			props: {
				results: {},
			},
		}
	}
}

export default Profile
