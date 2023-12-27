import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

const useRatingIcons = (rating: number) => {
	const [ratingIcons, setRatingIcons] = useState<JSX.Element[]>([])

	useEffect(() => {
		const getRatingIcons = () => {
			const icons: JSX.Element[] = []

			for (let i = 1; i <= 10; i++) {
				const decimalPart = (i * 10 - Math.ceil(rating * 10)) / 10
				if (i <= rating || decimalPart < 0.3) {
					icons.push(<FontAwesomeIcon key={i} icon={faStar} />)
				} else if (decimalPart >= 0.3 && decimalPart <= 0.7) {
					icons.push(
						<span
							key={i}
							className='relative leading-none w-[18px] h-[16px]'
						>
							<FontAwesomeIcon
								className='absolute top-0 left-0'
								icon={faStarHalf}
							/>
							<FontAwesomeIcon
								className='absolute top-0 right-0 text-gray-800 -scale-x-100'
								icon={faStarHalf}
							/>
						</span>
					)
				} else {
					icons.push(
						<FontAwesomeIcon
							className='text-gray-800'
							key={i}
							icon={faStar}
						/>
					)
				}
			}

			setRatingIcons(icons)
		}

		getRatingIcons()
	}, [rating])

	return { ratingIcons }
}

export default useRatingIcons
