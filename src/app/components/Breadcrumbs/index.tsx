import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchItemData } from '@/handlers/fetchItemData'
import classNames from 'classnames'

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

				if (!isNaN(segment)) {
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

					if (segment.startsWith('collection')) {
						itemName = 'collection'
					} else itemName = segment

					const itemNameCapitalized =
						itemName.charAt(0).toUpperCase() + itemName.slice(1)
					newBreadcrumbs.push({ label: itemNameCapitalized, href })
				}
			}

			setBreadcrumbs(newBreadcrumbs)
		}

		getBreadcrumbs()
	}, [router.asPath])

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
