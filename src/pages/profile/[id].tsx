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
import TagList from '@/components/Tag/TagList'
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
import UserCollection from '@/components/Collection'
import { getUserCollection } from '@/handlers/getUserCollection'

const Profile = ({ results }) => {
	const [userInfo, setUserInfo] = useState(null)
	const [friends, setFriends] = useState([])
	const [collection, setCollection] = useState(null)
	const [isEditInfo, setIsEditInfo] = useState<boolean>(false)
	const [isEditTags, setIsEditTags] = useState<boolean>(false)
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
		setIsEditTags(false)
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
				const userCollection = await getUserCollection(userIdFromUrl)

				if (user.friends) {
					const friends = await getUserFriends(user.friends)
					setFriends(friends)
				}

				setUserInfo(user.info)
				setCollection(userCollection)
			} catch (error) {
				setUserInfo(null)
				setFriends([])
				setCollection(null)
			}
		}

		if (!results) getUser()
	}, [])

	useEffect(() => {
		setUserInfo(results?.info)
		setFriends(results?.friends)
		setCollection(results?.collection)
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
									? () => openConfirmationPopup(userInfo)
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
								onClick={() => handleOpenForm(setIsEditTags)}
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
				<TagList
					tags={userInfo.favoriteGenres || []}
					title='Favorite genres'
					className='mb-16'
					isEditTags={isEditTags}
					onFormClose={setIsEditTags}
				/>
				<FriendList
					friends={friends || []}
					onRemove={openConfirmationPopup}
				/>
			</div>
			{!isCurrentUserProfile && (
				<div className='mt-16'>
					<Title>{userInfo.displayName} collection</Title>
					<UserCollection
						movies={collection.collectionMovies}
						persons={collection.collectionPersons}
						marks={collection.collectionMarks}
						reviews={collection.allCollectionReviews}
						isCurrentUserCollection={isCurrentUserProfile}
					/>
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
		const userCollection = await getUserCollection(userIdFromUrl)

		if (user.friends) {
			friends = await getUserFriends(user.friends)
		}

		return {
			props: {
				results: {
					info: user.info,
					friends: friends,
					collection: userCollection,
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
