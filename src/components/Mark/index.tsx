import { FC, useEffect, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from '@/app/components/UI/Title/Title'
import { useAuth } from '@/context/AuthProvider'
import Button from '../../app/components/UI/Button/index'
import {
	removeMarkForMovie,
	getMarkForMovie,
	setNewMarkForMovie,
} from '@/firebase/config'
import { useModal } from '@/context/ModalProvider'
import { openLoginModal } from '@/handlers/handleModals'
import Loader from '@/components/Loader'
import { IMark, IMarkFromDB } from '../../../interfaces'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	markedItemId: number
	collectionType: UserCollections.movie | UserCollections.tv
}

const Mark: FC<PropsType> = ({ markedItemId, collectionType }) => {
	const [markIcons, setMarkIcons] = useState<JSX.Element[]>([])
	const [isLoadingMark, setIsLoadingMark] = useState<boolean>(false)
	const [markData, setMarkData] = useState<IMarkFromDB | null>(null)
	const { userId, isLoggedIn } = useAuth()
	const { showModal } = useModal()
	const isShowRemoveMarkButton = markData && userId
	const MAX_MARK = 10
	const EMPTY_MARK_COLOR = 'text-rose-900'
	const FILLED_MARK_COLOR = 'text-rose-500'

	const handleSetNewMark = (markValue: number) => {
		if (isLoggedIn) {
			setIsLoadingMark(true)
			const markedItemData: IMark = {
				markedItemId,
				markValue,
				collectionType,
			}
			setNewMarkForMovie(markedItemData, userId).then(() => {
				getMarkForMovie(markedItemId, userId, collectionType)
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
				onClick={() => handleSetNewMark(idx)}
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

	const handleRemoveMyMark = (markKey: string, userId: string) => {
		setIsLoadingMark(true)
		removeMarkForMovie(markKey, userId, collectionType)
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
			getMarkForMovie(markedItemId, userId, collectionType).then(data => {
				if (data) setMarkData(data)
			})
		} else getEmptyMarkIcons()
	}, [userId, markedItemId])

	useEffect(() => {
		if (markData) {
			getMarkIcons()
		} else getEmptyMarkIcons()
	}, [markData])

	return (
		<div className='mb-4 relative'>
			<Title variant='h3'>My mark</Title>
			{isLoadingMark ? (
				<Loader isShowText type='static' className='!inline-block' />
			) : (
				<>
					<div className='flex justify-start items-center gap-x-1'>
						<div className='flex justify-start items-center gap-x-1'>
							{markIcons.map(item => {
								return item
							})}
						</div>
						{isShowRemoveMarkButton && (
							<>
								<p className='text-sm font-semibold leading-none mr-2'>
									{markData.data.markValue}
								</p>
								<Button
									onClick={() =>
										handleRemoveMyMark(
											markData?.key,
											userId
										)
									}
									context='text'
								>
									Remove my mark
								</Button>
							</>
						)}
					</div>
					{!userId && (
						<p className='text-gray-400 text-sm leading-none mt-2'>
							Please login or register to be able to rate the
							movie
						</p>
					)}
				</>
			)}
		</div>
	)
}

export default Mark
