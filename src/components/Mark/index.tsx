import React, {FC, useEffect, useState} from 'react'
import {faStar} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Title from "@/app/components/UI/Title/Title"

type PropsType = {
	mark?: number;
}

const Mark: FC<PropsType> = ({ mark }) => {
	const [markIcons, setMarkIcons] = useState<JSX.Element[]>([])

	const handleIconsHover = (iconIdx) => {
		let hoveredIcons = []

		for (let i = 1; i <= 10; i++) {
			if (i <= iconIdx) {
				hoveredIcons.push(<button key={i} className="text-amber-500" onMouseEnter={() => handleIconsHover(i)} onMouseLeave={getEmptyMarkIcons}><FontAwesomeIcon icon={faStar}/></button>)
			} else hoveredIcons.push(<button key={i} className="text-amber-900" onMouseEnter={() => handleIconsHover(i)} onMouseLeave={getEmptyMarkIcons}><FontAwesomeIcon icon={faStar}/></button>)
		}

		setMarkIcons(hoveredIcons)
	}

	const getEmptyMarkIcons = () => {
		setMarkIcons([])

		for (let i = 1; i <= 10; i++) {
			setMarkIcons(prevState => [...prevState,
				<button key={i} className="text-amber-900" onMouseEnter={() => handleIconsHover(i)} onMouseLeave={getEmptyMarkIcons}><FontAwesomeIcon icon={faStar}/></button>])
		}
	}

	useEffect(() => {
		const getMyMarkIcons = () => {
			for (let i = 1; i <= 10; i++) {
				setMarkIcons(prevState => [...prevState, i <= mark ? <FontAwesomeIcon key={i} icon={faStar} /> : <FontAwesomeIcon key={i} icon={faStar} style={{ color: 'rgb(46, 16, 101)' }} />])
			}
		}

		if (mark) {
			getMyMarkIcons()
		} else getEmptyMarkIcons()
	}, [])

	return (
		<div className="mb-4">
			<Title variant="h3">My mark</Title>
			<div className="flex gap-x-1 text-violet-600">
				{markIcons.map((item, idx) => {
					return item
				})}
			</div>
		</div>
	)
}

export default Mark
