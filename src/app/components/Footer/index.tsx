import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import { usePathname } from 'next/navigation'
import { createRoutes } from '@/constants/routes'
import Logo from '@/app/components/Logo'

const Footer = () => {
	const { userId } = useAuth()
	const pathname = usePathname()
	const ROUTES = createRoutes(userId)

	if (pathname === '/404') return null

	return (
		<footer className='w-full z-20 bg-gray-950 py-4'>
			<div className='max-w-screen-xl mx-auto py-3 px-5 flex flex-col justify-start items-center'>
				<div className='flex justify-center items-center gap-4 pb-4'>
					{ROUTES.map(item => {
						return (
							<Link
								key={item.href}
								className='text-gray-500 hover:text-rose-600 duration-300'
								href={item.href}
								as={item.href}
							>
								<span>{item.name}</span>
							</Link>
						)
					})}
				</div>
				<Logo />
				<span className='mt-4 text-xs text-gray-500'>
					Created by Yuliia Tkachenko
				</span>
			</div>
		</footer>
	)
}

export default Footer
