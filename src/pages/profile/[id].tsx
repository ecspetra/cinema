import { NextPageContext } from 'next'
import {
	getUserFriends,
	getUserInfo,
	userFriendsListener,
	userInfoListener,
} from '@/firebase/config'
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
import { useFriendsCollection } from '@/hooks/useFriendsCollection'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'

const Profile = ({ results }) => {
	const [userInfo, setUserInfo] = useState(null)
	const [friends, setFriends] = useState([])
	const [isEditInfo, setIsEditInfo] = useState<boolean>(false)
	const [isEditGenres, setIsEditGenres] = useState<boolean>(false)
	const [isEditCredential, setIsEditCredential] = useState<boolean>(false)
	const router = useRouter()
	const { userId } = useAuth()
	const isCurrentUserProfile = userId === userInfo?.id

	const {
		isLoadingFriends,
		isFriend,
		handleSetNewFriend,
		openConfirmationPopup,
	} = useFriendsCollection(userInfo)

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
				const user = await getUserInfo(userIdFromUrl)

				if (user.friends) {
					const friends = await getUserFriends(user.friends)
					setFriends(friends)
				}

				setUserInfo(user.info)
			} catch (error) {
				setUserInfo(null)
			}
		}

		if (!results) getUser()
	}, [])

	useEffect(() => {
		setUserInfo(results?.info)
		setFriends(results?.friends)
	}, [results])

	useEffect(() => {
		if (isCurrentUserProfile) {
			const unsubscribe = userInfoListener(userId, setUserInfo)

			return () => {
				unsubscribe()
			}
		}
	}, [isCurrentUserProfile])

	useEffect(() => {
		if (userInfo) {
			const unsubscribeFriends = userFriendsListener(
				userInfo?.id,
				friends,
				setFriends
			)

			return () => {
				unsubscribeFriends()
			}
		}
	}, [userInfo, friends])

	if (!userInfo) return <Loader />

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<div className='w-full max-w-2xl mx-auto'>
				<div className='mb-16 relative w-[232px] mx-auto'>
					<ProfileIcon
						photoURL={userInfo.photoURL}
						isCurrentUserProfile={isCurrentUserProfile}
					/>
					{!isCurrentUserProfile && (
						<CollectionButton
							className='w-full'
							isLoadingCollection={isLoadingFriends}
							isCollectionItem={isFriend}
							onClick={
								isFriend
									? openConfirmationPopup
									: handleSetNewFriend
							}
							collectionName='friends'
						/>
					)}
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
				<FriendList
					friends={friends || []}
					onRemove={openConfirmationPopup}
				/>
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
	let friends = []

	try {
		const user = await getUserInfo(userIdFromUrl)

		if (user.friends) {
			friends = await getUserFriends(user.friends)
		}

		return {
			props: {
				results: {
					info: user.info,
					friends: friends,
				},
			},
		}
	} catch (error) {
		return {
			props: {
				results: null,
			},
		}
	}
}

export default Profile
