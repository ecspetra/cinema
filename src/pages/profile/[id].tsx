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
import {
	faBarsStaggered,
	faKey,
	faPenToSquare,
} from '@fortawesome/free-solid-svg-icons'
import DropdownItem from '@/app/components/UI/Dropdown/DropdownItem'
import Dropdown from '@/app/components/UI/Dropdown'
import FriendList from '@/components/Friends/FriendList'
import EditCredentialForm from '@/components/Profile/Form/EditCredentialForm'

const Profile = ({ results }) => {
	const [userInfo, setUserInfo] = useState(null)
	const [isEditInfo, setIsEditInfo] = useState<boolean>(false)
	const [isEditGenres, setIsEditGenres] = useState<boolean>(false)
	const [isEditCredential, setIsEditCredential] = useState<boolean>(false)
	const router = useRouter()
	const { userId } = useAuth()
	const isCurrentUserProfile = userId === userInfo?.id

	const handleResetForms = () => {
		setIsEditInfo(false)
		setIsEditGenres(false)
		setIsEditCredential(false)
	}

	const handleOpenForm = openFunction => {
		handleResetForms()
		openFunction(true)
	}

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
			<div className='w-full max-w-2xl mx-auto'>
				<div className='mb-16 relative w-[232px] mx-auto'>
					<ProfileIcon photoURL={userInfo.photoURL} />
					{isCurrentUserProfile && (
						<Dropdown icon='settings' className='!top-0 !right-0'>
							<DropdownItem
								label='Edit info'
								icon={faPenToSquare}
								onClick={() => handleOpenForm(setIsEditInfo)}
							/>
							<DropdownItem
								label='Edit genres'
								icon={faBarsStaggered}
								onClick={() => handleOpenForm(setIsEditGenres)}
							/>
							<DropdownItem
								label='Edit email/password'
								icon={faKey}
								onClick={() =>
									handleOpenForm(setIsEditCredential)
								}
							/>
						</Dropdown>
					)}
				</div>
				{isEditInfo ? (
					<EditProfileForm
						userInfo={userInfo}
						onFormClose={setIsEditInfo}
					/>
				) : isEditCredential ? (
					<EditCredentialForm onFormClose={setIsEditCredential} />
				) : (
					<ProfileInfo userInfo={userInfo} />
				)}
				<GenreList
					genres={userInfo.favoriteGenres || []}
					title='Favorite genres'
					className='mb-8 pb-8'
					isEditGenres={isEditGenres}
					onFormClose={setIsEditGenres}
				/>
				<FriendList friends={userInfo.friends || []} />
			</div>
			{!isCurrentUserProfile && (
				<div>
					<Title>{userInfo.displayName} collection</Title>
					<span>{userInfo.collection}</span>
				</div>
			)}
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
