import { IItemCard } from '../../interfaces'
import { fetchItemData } from '@/handlers/fetchItemData'
import { UserCollections } from '@/constants/enum'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

const getItemName = (item: IItemCard): string =>
	item.title ? item.title : item.name || ''

const capitalizeFirstLetter = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1)

export const getBreadcrumbsList = async (allSegments: string[]) => {
	const allBreadcrumbs = [{ label: 'Home', href: '/' }]

	for (let i = 0; i < allSegments.length; i++) {
		const segment = allSegments[i]
		const href = `/${allSegments.slice(0, i + 1).join('/')}`
		let segmentName = ''

		const isIdPageSegment = !isNaN(Number(segment))
		const isUserCollectionSegment = segment.includes('?uid')
		const isTVShowPageSegment = segment === UserCollections.tv
		const isProfilePageSegment =
			allSegments.includes('profile') && segment !== 'profile'

		const getPageIdPageSegment = async () => {
			const collectionType = allSegments[i - 1]
			const itemInfo = await fetchItemData(collectionType, segment, '')
			segmentName = getItemName(itemInfo)
			const itemNameCapitalized = capitalizeFirstLetter(segmentName)
			allBreadcrumbs.push({
				label: itemNameCapitalized,
				href,
			})
		}

		const getUserCollectionSegment = () => {
			const segmentsBeforeUid = segment.split('?uid')
			segmentName = capitalizeFirstLetter(segmentsBeforeUid[0])
			allBreadcrumbs.push({ label: segmentName, href })
		}

		const getProfilePageSegment = async () => {
			const item = await getUserProfileInfo(segment)
			segmentName = item.info.displayName
			allBreadcrumbs.push({ label: segmentName, href })
		}

		const getTVShowPageSegment = () => {
			segmentName = segment.toUpperCase()
			allBreadcrumbs.push({ label: segmentName, href })
		}

		const getDefaultSegment = () => {
			segmentName = capitalizeFirstLetter(segment)
			allBreadcrumbs.push({ label: segmentName, href })
		}

		switch (true) {
			case isIdPageSegment:
				await getPageIdPageSegment()
				break
			case isUserCollectionSegment:
				getUserCollectionSegment()
				break
			case isProfilePageSegment:
				await getProfilePageSegment()
				break
			case isTVShowPageSegment:
				getTVShowPageSegment()
				break
			default:
				getDefaultSegment()
				break
		}
	}

	return allBreadcrumbs
}
