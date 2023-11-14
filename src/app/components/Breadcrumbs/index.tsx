import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchItemData } from '@/handlers/fetchItemData'
import classNames from 'classnames'
import { getUserInfo } from '@/firebase/config'

const Breadcrumbs = () => {
	const router = useRouter()
	const [breadcrumbs, setBreadcrumbs] = useState([])

	useEffect(() => {
		const getBreadcrumbs = async () => {
			const segments = router.asPath
				.split('/')
				.filter(segment => segment !== '')
			const newBreadcrumbs = [{ label: 'Home', href: '/' }]

			for (let i = 0; i < segments.length; i++) {
				const segment = segments[i]
				const href = `/${segments.slice(0, i + 1).join('/')}`

				const isItemIdSegment = !isNaN(segment)
				const isUserCollectionSegment = segment.includes('?uid')

				if (isItemIdSegment) {
					const item = await fetchItemData(
						segments[i - 1],
						router.query.id,
						''
					)

					const itemName = item.title ? item.title : item.name
					const itemNameCapitalized =
						itemName.charAt(0).toUpperCase() + itemName.slice(1)
					newBreadcrumbs.push({ label: itemNameCapitalized, href })
				} else {
					let itemName = ''

					if (isUserCollectionSegment) {
						const parts = segment.split('?uid')
						itemName =
							parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
					} else if (
						segments.includes('profile') &&
						segment !== 'profile'
					) {
						const item = await getUserInfo(router.query.id)
						itemName = item.info.displayName
					} else
						itemName =
							segment.charAt(0).toUpperCase() + segment.slice(1)

					newBreadcrumbs.push({ label: itemName, href })
				}
			}

			setBreadcrumbs(newBreadcrumbs)
		}

		getBreadcrumbs()
	}, [router.asPath, router.query.id])

	if (breadcrumbs.length === 1) return null

	return (
		<nav>
			{breadcrumbs.map((item, idx) => (
				<span
					key={idx}
					className={classNames(
						'text-sm',
						idx === breadcrumbs.length - 1
							? 'text-amber-500'
							: 'text-gray-400'
					)}
				>
					<Link href={item.href}>{item.label}</Link>
					{idx < breadcrumbs.length - 1 && ' / '}
				</span>
			))}
		</nav>
	)
}

export default Breadcrumbs
