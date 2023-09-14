import React, { FC, useEffect, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from '@/app/components/UI/Title/Title'
import { getDatabase, ref, set } from 'firebase/database'
import { useAuth } from '../../context/AuthProvider'
import Button from '../../app/components/UI/Button/index'

type PropsType = {
	mark?: number
}

const Mark: FC<PropsType> = ({ mark }) => {
	const [markIcons, setMarkIcons] = useState<JSX.Element[]>([])
	const { currentUser } = useAuth()

	const setNewMark = mark => {
		currentUser ? console.log('new mark', mark) : console.log(currentUser)
	}

	const handleIconsHover = iconIdx => {
		let hoveredIcons = []

		for (let i = 1; i <= 10; i++) {
			if (i <= iconIdx) {
				hoveredIcons.push(
					<Button
						context='image'
						onClick={() => setNewMark(i)}
						key={i}
						className='text-amber-500'
						onMouseEnter={() => handleIconsHover(i)}
						onMouseLeave={getEmptyMarkIcons}
					>
						<FontAwesomeIcon icon={faStar} />
					</Button>
				)
			} else
				hoveredIcons.push(
					<Button
						context='image'
						key={i}
						className='text-red-900'
						onMouseEnter={() => handleIconsHover(i)}
						onMouseLeave={getEmptyMarkIcons}
					>
						<FontAwesomeIcon icon={faStar} />
					</Button>
				)
		}

		setMarkIcons(hoveredIcons)
	}

	const getEmptyMarkIcons = () => {
		setMarkIcons([])

		for (let i = 1; i <= 10; i++) {
			setMarkIcons(prevState => [
				...prevState,
				<Button
					context='image'
					key={i}
					className='text-red-900'
					onMouseEnter={() => handleIconsHover(i)}
					onMouseLeave={getEmptyMarkIcons}
				>
					<FontAwesomeIcon icon={faStar} />
				</Button>,
			])
		}
	}

	function writeMarkData(userId, name, email, imageUrl) {
		const db = getDatabase()
		set(ref(db, 'users/' + userId), {
			username: name,
			email: email,
			profile_picture: imageUrl,
		})
	}

	useEffect(() => {
		const getMyMarkIcons = () => {
			for (let i = 1; i <= 10; i++) {
				setMarkIcons(prevState => [
					...prevState,
					i <= mark ? (
						<FontAwesomeIcon key={i} icon={faStar} />
					) : (
						<FontAwesomeIcon
							key={i}
							icon={faStar}
							className='text-red-900'
						/>
					),
				])
			}
		}

		if (mark) {
			getMyMarkIcons()
		} else getEmptyMarkIcons()
	}, [])

	return (
		<div className='mb-4'>
			<Title variant='h3'>My mark</Title>
			<div className='flex gap-x-1'>
				{markIcons.map((item, idx) => {
					return item
				})}
			</div>
		</div>
	)
}

export default Mark
