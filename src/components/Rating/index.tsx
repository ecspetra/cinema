import React, { FC, useEffect, useState } from 'react'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	rating: number
	voteCount: number
}

const Rating: FC<PropsType> = ({ rating, voteCount }) => {
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

	return (
		<>
			<Title variant='h3'>Rating</Title>
			<div className='flex gap-x-1 text-white items-center mb-5'>
				{ratingIcons.map(item => item)}
				<p className='text-sm font-semibold leading-none mr-2'>
					{Math.ceil(rating * 10) / 10}
				</p>
				<p className='text-gray-400 text-sm leading-none mt-[2px]'>
					{voteCount} voted
				</p>
			</div>
		</>
	)
}

export default Rating
