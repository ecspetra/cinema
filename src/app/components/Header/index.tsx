import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import Button from '@/app/components/UI/Button'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { AUTH_PAGE, COLLECTION_PAGE, PROFILE_PAGE } from '@/constants/paths'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createRoutes } from '@/constants/routes'
import Logo from '@/app/components/Logo'
import { signOutUser } from '@/firebase/handlers/authHandlers/signOutUser'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'

const Header = () => {
	const { userId, photoURL, isLoggedIn } = useAuth()
	const router = useRouter()
	const pathname = usePathname() ?? ''
	const ROUTES = createRoutes(userId)
	const isAuthPage = useMemo(() => pathname === '/auth', [pathname])
	const isShowUserMenu = !isAuthPage && isLoggedIn
	const isShowAuthButton = !isAuthPage && !isLoggedIn

	const handleSignOutUser = async () => {
		await signOutUser()

		if (pathname.startsWith(COLLECTION_PAGE)) {
			await router.push(COLLECTION_PAGE)
		} else if (pathname === PROFILE_PAGE.replace('{userId}', userId)) {
			await router.push(AUTH_PAGE)
		} else {
			router.reload()
		}
	}

	if (pathname === '/404') return null

	return (
		<header className='min-h-[68px] fixed top-0 left-0 w-full z-20 bg-gray-950 flex items-center justify-between'>
			<div className='w-full max-w-screen-xl mx-auto py-2 px-2 md:py-3 md:px-5'>
				<div className='flex justify-between items-center gap-4'>
					<Logo className='hidden md:flex' />
					<div className='flex justify-center items-center gap-2 md:gap-4 text-xs md:text-base'>
						{ROUTES.map(item => {
							return (
								<Link
									key={item.href}
									className='font-semibold hover:text-rose-600 duration-300'
									href={item.href}
									as={item.href}
								>
									<span>{item.name}</span>
								</Link>
							)
						})}
					</div>
					{isShowUserMenu && (
						<div className='flex justify-center items-center gap-4'>
							<ProfileIconSmall
								isLinkToProfile
								photoURL={photoURL}
								userId={userId}
								className='mr-0'
							/>
							<Button context='text' onClick={handleSignOutUser}>
								<span className='hidden md:block text-sm'>
									Sign Out
								</span>
								<FontAwesomeIcon
									icon={faRightFromBracket}
									className='ml-1'
								/>
							</Button>
						</div>
					)}
					{isShowAuthButton && (
						<Link
							href={`/auth`}
							as={`/auth`}
							className='font-semibold bg-rose-600 text-sm px-4 py-2 rounded-3xl duration-300'
						>
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
