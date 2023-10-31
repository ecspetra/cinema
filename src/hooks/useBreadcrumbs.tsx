import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BREADCRUMBS_LINK_TO_FETCH } from '@/constants/linksToFetch'

export default function useBreadcrumbs() {
	const router = useRouter()
	const [breadcrumbs, setBreadcrumbs] = useState([])

	useEffect(() => {
		const { pathname, query } = router

		const getNameById = async (
			queryParam: string,
			itemId: number,
			searchedField: string
		) => {
			const linkToFetch = BREADCRUMBS_LINK_TO_FETCH.replace(
				'{queryParam}',
				queryParam
			).replace('{itemId}', itemId)
			const itemInfo = await fetch(linkToFetch)
			const result = await itemInfo.json()
			return result[searchedField]
		}

		const segments = pathname.split('/').filter(segment => segment)
		const segmentId = query.id

		const generateBreadcrumbs = async () => {
			const breadcrumbPromises = segments.map(async (segment, idx) => {
				let href = `/${segments.slice(0, idx + 1).join('/')}`
				let hrefWithId = `/${segments
					.slice(0, idx)
					.join('/')}/${segmentId}`

				if (segment === '[id]') {
					const segmentName = await getNameById(
						segments[idx - 1],
						segmentId,
						'title'
					)

					return {
						label: segmentName,
						href: hrefWithId,
					}
				} else {
					return {
						label: segment,
						href: href,
					}
				}
			})

			const breadcrumbData = await Promise.all(breadcrumbPromises)
			// console.log(breadcrumbData)
			setBreadcrumbs(breadcrumbData)
		}

		generateBreadcrumbs()
	}, [router])

	return breadcrumbs
}
