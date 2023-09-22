import React, { FC, useEffect, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from '@/app/components/UI/Title/Title'
import { useAuth } from '@/context/AuthProvider'
import Button from '../../app/components/UI/Button/index'
import {
	deleteMarkForMovie,
	getMarkForMovie,
	setNewMarkForMovie,
} from '@/firebase/config'
import { useModal } from '@/context/ModalProvider'
import { openLoginModal } from '@/handlers/openLoginModal'

type MyMarkType = {
	key: string
	data: {
		mark: number
		movieId: number
		userId: string
	}
}

type PropsType = {
	movieId: number
}

const Mark: FC<PropsType> = ({ movieId }) => {
	const [markIcons, setMarkIcons] = useState<JSX.Element[]>([])
	const [mark, setMark] = useState<MyMarkType | undefined>(undefined)
	const { currentUser } = useAuth()
	const { showModal } = useModal()
	const isLoggedIn = currentUser !== null
	const isShowRemoveMarkButton = mark && currentUser !== null
	const MAX_MARK = 10
	const EMPTY_MARK_COLOR = 'text-red-900'
	const FILLED_MARK_COLOR = 'text-amber-600'

	const setNewMark = (mark: number) => {
		if (isLoggedIn) {
			setNewMarkForMovie(movieId, currentUser.uid, mark)
			getMarkForMovie(movieId, currentUser?.uid).then(data => {
				setMark(data)
			})
		} else openLoginModal(showModal)
	}

	const createStarButton = (idx: number, className: string) => {
		return (
			<Button
				context='image'
				key={idx}
				className={className}
				onClick={() => setNewMark(idx)}
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
					i <= mark.data.mark ? FILLED_MARK_COLOR : EMPTY_MARK_COLOR
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

	const handleRemoveMyMark = (markKey: string) => {
		deleteMarkForMovie(markKey)
		setMark(undefined)
		getEmptyMarkIcons()
	}

	useEffect(() => {
		if (isLoggedIn) {
			getMarkForMovie(movieId, currentUser?.uid).then(data => {
				setMark(data)
			})
		} else getEmptyMarkIcons()
	}, [currentUser])

	useEffect(() => {
		if (mark) {
			getMarkIcons()
		} else getEmptyMarkIcons()
	}, [mark])

	return (
		<div className='mb-4'>
			<Title variant='h3'>My mark</Title>
			<div className='flex justify-start items-center gap-x-1'>
				<div className='flex justify-start items-center gap-x-1'>
					{markIcons.map(item => {
						return item
					})}
				</div>
				{isShowRemoveMarkButton && (
					<>
						<p className='text-sm font-semibold leading-none mr-2'>
							{mark.data.mark}
						</p>
						<Button
							onClick={() => handleRemoveMyMark(mark?.key)}
							context='text'
						>
							Remove my mark
						</Button>
					</>
				)}
			</div>
			{currentUser === null && (
				<p className='text-slate-400 text-sm leading-none mt-2'>
					Please login or register to be able to rate the movie
				</p>
			)}
		</div>
	)
}

export default Mark
