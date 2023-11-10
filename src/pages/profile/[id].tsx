import { NextPageContext } from 'next'
import { getUserInfo, userProfileListener } from '@/firebase/config'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import Title from '@/app/components/UI/Title/Title'
import ProfileInfo from '@/components/Profile/ProfileInfo'
import EditProfileForm from '@/components/Profile/Form/EditProfileForm'
import { COLLECTION_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'
import TopBanner from '@/components/TopBanner'
import ProfileIcon from '@/components/Profile/ProfileInfo/ProfileIcon'
import GenreList from '@/components/Genre/GenreList'
import { useAuth } from '@/context/AuthProvider'

const Profile = ({ results }) => {
	const [userInfo, setUserInfo] = useState(null)
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)
	const router = useRouter()
	const { userId } = useAuth()
	const isCurrentUserProfile = userId === userInfo?.id

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

	useEffect(() => {
		if (isCurrentUserProfile) {
			const unsubscribe = userProfileListener(userId, setUserInfo)

			return () => {
				unsubscribe()
			}
		}
	}, [isCurrentUserProfile])

	if (!userInfo) return <Loader />

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<div className='w-full max-w-3xl mx-auto'>
				<ProfileIcon photoURL={userInfo.photoURL} />
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
				<GenreList
					genres={userInfo.favoriteGenres || []}
					title='Favorite genres'
					className='mb-8 pb-8 text-center'
				/>
			</div>
			<div>
				<Title>Friends</Title>
				{userInfo.friends ? userInfo.friends : 'no info'}
			</div>
			<div>
				<Title>{userInfo.displayName} collection</Title>
				<span>{userInfo.collection}</span>
			</div>
		</>
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
