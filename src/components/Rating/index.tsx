import { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import useRatingIcons from '@/handlers/useRatingIcons'

type PropsType = {
	rating: number
	voteCount: number
}

const Rating: FC<PropsType> = ({ rating, voteCount }) => {
	const { ratingIcons } = useRatingIcons(rating)

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
