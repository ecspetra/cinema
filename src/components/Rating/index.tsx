import React, {FC, useEffect, useState} from 'react'
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

type PropsType = {
	rating: number;
	voteCount: number;
}

const Rating: FC<PropsType> = ({ rating, voteCount }) => {
	const [ratingIcons, setRatingIcons] = useState([])

	useEffect(() => {
		const getRatingIcons = () => {
			for (let i = 1; i <= 10; i++) {
				if (i <= rating || i - (Math.ceil(rating * 10) / 10) < 0.5) {
					setRatingIcons(prevState => [...prevState, <FontAwesomeIcon key={i} icon={faStar} />])
				} else if (i - (Math.ceil(rating * 10) / 10) === 0.5) {
					setRatingIcons(prevState => [...prevState, <span key={i} className="relative leading-none w-[18px] h-[16px]"><FontAwesomeIcon className="absolute top-0 left-0" icon={faStarHalf} /><FontAwesomeIcon className="absolute top-0 right-0" icon={faStarHalf} style={{ transform: 'scaleX(-1)', color: 'rgb(46, 16, 101)' }} /></span>])
				} else setRatingIcons(prevState => [...prevState, <FontAwesomeIcon key={i} icon={faStar} style={{ color: 'rgb(46, 16, 101)' }} />])
			}
		}

		getRatingIcons()
	}, [])

	return (
		<div className="flex gap-x-1 text-violet-600 items-center mb-5">
			{ratingIcons.map((item, idx) => {
				return item
			})}
			<p className="text-slate-400 text-sm leading-none mt-[2px]">{voteCount} voted</p>
		</div>
	)
}

export default Rating
