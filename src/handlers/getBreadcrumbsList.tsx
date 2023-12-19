import { IItemCard } from '../../interfaces'
import { fetchItemData } from '@/handlers/fetchItemData'
import { getUserInfo } from '@/firebase/config'

const getItemName = (item: IItemCard) => (item.title ? item.title : item.name)

const capitalizeFirstLetter = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1)

export const getBreadcrumbsList = async (allSegments: string[]) => {
	const allBreadcrumbs = [{ label: 'Home', href: '/' }]

	for (let i = 0; i < allSegments.length; i++) {
		const segment = allSegments[i]
		const href = `/${allSegments.slice(0, i + 1).join('/')}`
		let segmentName = ''

		const isIdPageSegment = !isNaN(segment)
		const isUserCollectionSegment = segment.includes('?uid')
		const isTVShowPageSegment = segment === 'tv'
		const isProfilePageSegment =
			allSegments.includes('profile') && segment !== 'profile'

		switch (true) {
			case isIdPageSegment:
				const collectionType = allSegments[i - 1]
				const pageId = allSegments[i]
				const itemInfo = await fetchItemData(collectionType, pageId, '')

				segmentName = getItemName(itemInfo)
				const itemNameCapitalized = capitalizeFirstLetter(segmentName)
				allBreadcrumbs.push({
					label: itemNameCapitalized,
					href,
				})
				break
			case isUserCollectionSegment:
				const segmentsBeforeUid = segment.split('?uid')
				segmentName = capitalizeFirstLetter(segmentsBeforeUid[0])
				allBreadcrumbs.push({ label: segmentName, href })
				break
			case isProfilePageSegment:
				const profileId = allSegments[i]
				const item = await getUserInfo(profileId)
				segmentName = item.info.displayName
				allBreadcrumbs.push({ label: segmentName, href })
				break
			case isTVShowPageSegment:
				segmentName = segment.toUpperCase()
				allBreadcrumbs.push({ label: segmentName, href })
				break
			default:
				segmentName = capitalizeFirstLetter(segment)
				allBreadcrumbs.push({ label: segmentName, href })
				break
		}
	}

	return allBreadcrumbs
}
