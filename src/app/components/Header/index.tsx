import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import Button from '@/app/components/UI/Button'
import { signOutUser } from '@/firebase/config'
import Image from '@/components/Images/Image'
import defaultUserImage from '../../../app/assets/images/default-user-image.svg'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

const Header = () => {
	const { currentUser } = useAuth()
	const router = useRouter()
	const userId = currentUser?.uid
	const collectionMoviesLink = currentUser?.uid
		? `/collection?uid=${userId}`
		: `/collection`
	const pathname = usePathname()
	const isAuthPage = useMemo(() => pathname === '/auth', [pathname])
	const isShowUserMenu = !isAuthPage && currentUser
	const isShowAuthButton = !isAuthPage && !currentUser

	const handleSignOutUser = async () => {
		await signOutUser()
		await router.push('/collection')
	}

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-black'>
			<div className='max-w-screen-xl flex justify-between items-center mx-auto p-5'>
				<Link href={`/`} as={`/`}>
					<span>CinemaStreet</span>
				</Link>
				<Link href={collectionMoviesLink} as={collectionMoviesLink}>
					<span>My collection</span>
				</Link>
				<Link href={'/persons'} as={'/persons'}>
					<span>Persons</span>
				</Link>
				{isShowUserMenu && (
					<div className='flex justify-center items-center gap-4'>
						<Image
							className='!w-11 h-11 rounded-full'
							src={currentUser.photoURL}
							defaultImage={defaultUserImage}
						/>
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
		</header>
	)
}

export default Header
