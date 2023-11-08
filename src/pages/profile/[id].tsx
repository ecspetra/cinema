import { NextPageContext } from 'next'
import { getUserInfo } from '@/firebase/config'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import Title from '@/app/components/UI/Title/Title'
import ProfileInfo from '@/components/Profile/ProfileInfo'
import EditProfileForm from '@/components/Profile/Form/EditProfileForm'

const Profile = ({ results }) => {
	const [userInfo, setUserInfo] = useState(null)
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)
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
		<div className='pt-20'>
			{isShowEditForm ? (
				<EditProfileForm
					userInfo={userInfo}
					onFormClose={setIsShowEditForm}
				/>
			) : (
				<ProfileInfo
					userInfo={userInfo}
					onOpenEditForm={setIsShowEditForm}
				/>
			)}
			<div>
				<Title>{userInfo.displayName} collection</Title>
				<span>{userInfo.collection}</span>
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
