import { NextPageContext } from 'next'
import { userFriendsListener, userInfoListener } from '@/firebase/config'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import ProfileInfo from '@/components/Profile/ProfileInfo'
import EditProfileForm from '@/components/Profile/Form/EditProfileForm'
import { PROFILE_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'
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
import GeneralUserCollection from '@/components/Collection'
import { UserCollections } from '@/constants/enum'
import { getUserProfilePageData } from '@/handlers/getUserProfilePageData'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { IFullUserInfo, IGeneralCollection } from '../../../interfaces'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'

const UserProfilePage = ({
	profilePageProps,
}: {
	profilePageProps: IFullUserInfo
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [profile, setProfile] = useState<IFullUserInfo['info'] | null>(null)
	const [friends, setFriends] = useState<IFullUserInfo[]>([])
	const [generalCollection, setGeneralCollection] =
		useState<IGeneralCollection | null>(null)
	const [isEditInfo, setIsEditInfo] = useState<boolean>(false)
	const [isEditTags, setIsEditTags] = useState<boolean>(false)
	const [isEditCredential, setIsEditCredential] = useState<boolean>(false)
	const { showModal } = useModal()
	const router = useRouter()
	const { userId } = useAuth()
	const isCurrentUserProfile = userId === profile?.id

	const {
		isLoadingFriends,
		isFriend,
		handleSetNewFriend,
		openConfirmationPopup,
	} = useFriendsCollection(profile)

	const handleResetForms = () => {
		setIsEditInfo(false)
		setIsEditTags(false)
		setIsEditCredential(false)
	}

	const handleOpenForm = (
		openFunction: Dispatch<SetStateAction<boolean>>
	) => {
		handleResetForms()
		openFunction(true)
	}

	useEffect(() => {
		const fetchUserProfilePageData = async () => {
			const userIdFromUrl = router.query.id as string

			setIsLoading(true)
			setProfile(null)

			getUserProfilePageData(userIdFromUrl)
				.then(data => {
					setProfile(data.info)
					setFriends(data.friends)
					setGeneralCollection(data.collection)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoading(false)
				})
		}

		if (!profilePageProps) {
			fetchUserProfilePageData()
		} else {
			setProfile(profilePageProps.info)
			setFriends(profilePageProps.friends)
			setGeneralCollection(profilePageProps.collection)
		}
	}, [profilePageProps, router.query.id])

	useEffect(() => {
		if (isCurrentUserProfile) {
			const unsubscribe = userInfoListener(userId, setProfile)

			return () => {
				unsubscribe()
			}
		}
	}, [isCurrentUserProfile])

	useEffect(() => {
		if (profile) {
			const unsubscribeFriends = userFriendsListener(
				profile.id,
				friends,
				setFriends
			)

			return () => {
				unsubscribeFriends()
			}
		}
	}, [profile, friends])

	if (!profile) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
	}

	return (
		<>
			<TopBanner imageSrc={PROFILE_PAGE_TOP_BANNER_IMAGE} />
			<div className='flex justify-start items-start gap-14'>
				<div className='mb-16 relative'>
					<ProfileIcon
						photoURL={profile.photoURL}
						isCurrentUserProfile={isCurrentUserProfile}
					/>
					{!isCurrentUserProfile && (
						<CollectionButton
							className='w-full'
							isLoadingCollection={isLoadingFriends}
							isCollectionItem={isFriend}
							onClick={
								isFriend
									? () => openConfirmationPopup(profile)
									: handleSetNewFriend
							}
							collectionType={UserCollections.friends}
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
				<div className='w-full'>
					{isEditInfo ? (
						<EditProfileForm
							profileInfo={profile}
							onFormClose={setIsEditInfo}
						/>
					) : isEditCredential ? (
						<EditCredentialForm onFormClose={setIsEditCredential} />
					) : (
						<ProfileInfo userInfo={profile} />
					)}
					<TagList
						tags={profile.favoriteGenres ?? []}
						title='Favorite genres'
						className='mb-8'
						isEditTags={isEditTags}
						onFormClose={setIsEditTags}
					/>
					<FriendList
						friends={friends || []}
						onRemove={openConfirmationPopup}
					/>
				</div>
			</div>
			{!isCurrentUserProfile && (
				<GeneralUserCollection
					movies={generalCollection?.collectionMovies ?? []}
					tvShows={generalCollection?.collectionTVShows ?? []}
					persons={generalCollection?.collectionPersons ?? []}
					marks={generalCollection?.collectionMarks ?? []}
					reviews={generalCollection?.allCollectionReviews ?? []}
					isCurrentUserCollection={isCurrentUserProfile}
					collectionOwnerId={profile?.id}
				/>
			)}
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const userIdFromUrl = ctx.query.id as string
	return getUserProfilePageData(userIdFromUrl)
		.then(data => {
			return {
				props: {
					profilePageProps: data,
				},
			}
		})
		.catch(() => {
			return {
				props: {
					profilePageProps: null,
				},
			}
		})
}

export default UserProfilePage
