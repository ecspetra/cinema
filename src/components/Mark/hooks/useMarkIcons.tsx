import { useEffect, useState } from 'react'
import { IMark, IMarkFromDB } from '../../../../interfaces'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import { createNewMarkForMovieOrTVShow } from '@/firebase/handlers/markHandlers/createNewMarkForMovieOrTVShow'
import { getMarkForMovieOrTVShow } from '@/firebase/handlers/markHandlers/getMarkForMovieOrTVShow'
import { openLoginModal } from '@/handlers/handleModals'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { removeMarkForMovie } from '@/firebase/handlers/markHandlers/removeMarkForMovie'
import { UserCollections } from '@/constants/enum'

const useMarkIcons = (
	markedItemId: number,
	collectionType: UserCollections.movie | UserCollections.tv
) => {
	const [markIcons, setMarkIcons] = useState<JSX.Element[]>([])
	const [isLoadingMark, setIsLoadingMark] = useState<boolean>(false)
	const [markData, setMarkData] = useState<IMarkFromDB | null>(null)
	const { userId, isLoggedIn } = useAuth()
	const { showModal } = useModal()
	const isShowRemoveMarkButton = markData && userId
	const MAX_MARK = 10
	const EMPTY_MARK_COLOR = 'text-rose-900'
	const FILLED_MARK_COLOR = 'text-rose-500'

	const createNewMark = (markValue: number) => {
		if (isLoggedIn) {
			setIsLoadingMark(true)
			const markedItemData: IMark = {
				markedItemId,
				markValue,
				collectionType,
			}
			createNewMarkForMovieOrTVShow(markedItemData, userId).then(() => {
				const markConfig = { markedItemId, collectionType }
				getMarkForMovieOrTVShow(userId, markConfig)
					.then(data => {
						if (data) setMarkData(data)
					})
					.finally(() => {
						setIsLoadingMark(false)
					})
			})
		} else openLoginModal(showModal)
	}

	const createStarButton = (idx: number, className: string) => {
		return (
			<Button
				context='image'
				key={idx}
				className={className}
				onClick={() => createNewMark(idx)}
				onMouseEnter={() => handleIconsHover(idx)}
				onMouseLeave={getEmptyMarkIcons}
			>
				<FontAwesomeIcon icon={faStar} />
			</Button>
		)
	}

	const createStarIcon = (idx: number, className: string) => {
		return <FontAwesomeIcon key={idx} icon={faStar} className={className} />
	}

	const handleIconsHover = (iconIdx: number) => {
		let hoveredIcons = []

		for (let i = 1; i <= MAX_MARK; i++) {
			hoveredIcons.push(
				createStarButton(
					i,
					i <= iconIdx ? FILLED_MARK_COLOR : EMPTY_MARK_COLOR
				)
			)
		}

		setMarkIcons(hoveredIcons)
	}

	const getMarkIcons = () => {
		setMarkIcons([])

		for (let i = 1; i <= MAX_MARK; i++) {
			setMarkIcons(prevState => [
				...prevState,
				createStarIcon(
					i,
					markData && i <= markData.data.markValue
						? FILLED_MARK_COLOR
						: EMPTY_MARK_COLOR
				),
			])
		}
	}

	const getEmptyMarkIcons = () => {
		setMarkIcons([])
		setMarkIcons(
			Array.from({ length: MAX_MARK }, (_, idx) =>
				createStarButton(idx + 1, EMPTY_MARK_COLOR)
			)
		)
	}

	const removeMark = () => {
		setIsLoadingMark(true)
		const markConfig = { markKey: markData?.key!, collectionType }
		removeMarkForMovie(userId, markConfig)
			.then(() => {
				setMarkData(null)
				getEmptyMarkIcons()
			})
			.finally(() => {
				setIsLoadingMark(false)
			})
	}

	useEffect(() => {
		if (isLoggedIn) {
			const markConfig = { markedItemId, collectionType }
			getMarkForMovieOrTVShow(userId, markConfig).then(data => {
				if (data) setMarkData(data)
			})
		} else getEmptyMarkIcons()
	}, [userId, markedItemId])

	useEffect(() => {
		if (markData) {
			getMarkIcons()
		} else getEmptyMarkIcons()
	}, [markData])

	return {
		mark: markData?.data.markValue,
		markIcons,
		isLoadingMark,
		isShowRemoveMarkButton,
		removeMark,
	}
}

export default useMarkIcons
