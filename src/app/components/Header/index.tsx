import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import Button from '@/app/components/UI/Button'
import { signOutUser } from '@/firebase/config'
import Image from '@/components/Images/Image'
import defaultUserImage from '../../../app/assets/images/default-user-image.svg'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { AUTH_PAGE, COLLECTION_PAGE, PROFILE_PAGE } from '@/constants/paths'
import Breadcrumbs from '@/app/components/Breadcrumbs'

const Header = () => {
	const { userId, photoURL, isLoggedIn, userName } = useAuth()
	const router = useRouter()
	const pathname = usePathname()
	const collectionMoviesLink = userId
		? `/collection?uid=${userId}`
		: `/collection`
	const isAuthPage = useMemo(() => pathname === '/auth', [pathname])
	const isShowUserMenu = !isAuthPage && isLoggedIn
	const isShowAuthButton = !isAuthPage && !isLoggedIn

	const handleSignOutUser = async () => {
		await signOutUser()
		if (pathname.startsWith(COLLECTION_PAGE)) {
			await router.push(COLLECTION_PAGE)
		} else if (pathname === PROFILE_PAGE.replace('{userId}', userId)) {
			await router.push(AUTH_PAGE)
		}
	}

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-black'>
			<div className='max-w-screen-xl mx-auto p-5'>
				<div className='flex justify-between items-center'>
					<Link href={`/`} as={`/`}>
						<span>CinemaStreet</span>
					</Link>
					<Link href={collectionMoviesLink} as={collectionMoviesLink}>
						<span>My collection</span>
					</Link>
					<Link href={'/person'} as={'/person'}>
						<span>Persons</span>
					</Link>
					<Link href={'/movie'} as={'/movie'}>
						<span>Movies</span>
					</Link>
					<Link href={'/tv'} as={'/tv'}>
						<span>TV shows</span>
					</Link>
					{isShowUserMenu && (
						<div className='flex justify-center items-center gap-4'>
							<Link
								className='flex justify-center items-center gap-2'
								href={`/profile/[id]`}
								as={`/profile/${userId}`}
							>
								<Image
									className='!w-11 h-11 rounded-full'
									src={photoURL}
									defaultImage={defaultUserImage}
								/>
								<span className='font-semibold'>
									{userName}
								</span>
							</Link>
							<Button context='text' onClick={handleSignOutUser}>
								Sign Out
							</Button>
						</div>
					)}
					{isShowAuthButton && (
						<Link href={`/auth`} as={`/auth`}>
							<span>Sign In</span>
						</Link>
					)}
				</div>
				<Breadcrumbs />
			</div>
		</header>
	)
}

export default Header
