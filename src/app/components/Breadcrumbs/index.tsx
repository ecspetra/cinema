import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { AUTH_PAGE } from '@/constants/paths'
import { getBreadcrumbsList } from '@/handlers/getBreadcrumbsList'

type Breadcrumb = {
	href: string
	label: string
}

const Breadcrumbs = () => {
	const router = useRouter()
	const pathname = usePathname()
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

	useEffect(() => {
		const getBreadcrumbs = async () => {
			const allPathSegments = router.asPath
				.split('/')
				.filter(segment => segment !== '')
			const breadcrumbsList = await getBreadcrumbsList(allPathSegments)
			setBreadcrumbs(breadcrumbsList)
		}

		getBreadcrumbs()
	}, [router.asPath, router.query.id])

	if (breadcrumbs.length === 1 || pathname === AUTH_PAGE) return null

	return (
		<nav className='mt-2'>
			{breadcrumbs.map((item, idx) => (
				<span
					key={idx}
					className={classNames(
						'text-sm',
						idx === breadcrumbs.length - 1
							? 'text-rose-600'
							: 'text-gray-400'
					)}
				>
					<Link href={item.href}>{item.label}</Link>
					{idx < breadcrumbs.length - 1 && ' > '}
				</span>
			))}
		</nav>
	)
}

export default Breadcrumbs
