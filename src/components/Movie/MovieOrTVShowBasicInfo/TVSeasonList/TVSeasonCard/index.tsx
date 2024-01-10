import { FC } from 'react'
import defaultMovieImage from '../../../../../app/assets/images/default-movie-image.svg'
import Image from '../../../../Images/Image'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ITVSeasonCard } from '../../../../../../interfaces'
import Title from '@/app/components/UI/Title/Title'
import moment from 'moment/moment'
import { CARD_IMAGE_SRC } from '@/constants/images'

type PropsType = {
	season: ITVSeasonCard
}

const TVSeasonCard: FC<PropsType> = ({ season }) => {
	const {
		name,
		air_date,
		poster_path,
		vote_average,
		episode_count,
		overview,
	} = season
	const imageFullSrc = poster_path
		? CARD_IMAGE_SRC.replace('{imageSrc}', poster_path)
		: ''

	return (
		<div className='flex justify-start items-start gap-4 mb-4 last:mb-0'>
			<Image
				className='!w-24 !h-36 flex-none duration-300 mb-4 group-hover:border-rose-600 border-4'
				src={imageFullSrc}
				defaultImage={defaultMovieImage}
			/>
			<div>
				<Title variant='h3'>{name}</Title>
				<div className='text-sm'>
					<div className='mb-4 flex flex-col justify-start items-start'>
						<span>
							Air date: {moment(air_date).format('Do MMM YYYY')}
						</span>
						<span>Number of episodes: {episode_count}</span>
						<div className='flex justify-center items-center text-sm'>
							<span className='mr-2'>Rating:</span>
							<FontAwesomeIcon
								icon={faStar}
								className='text-white'
							/>
							<span className='ml-1 font-semibold'>
								{Math.ceil(vote_average * 10) / 10}
							</span>
						</div>
					</div>
				</div>
				{overview && <p className='text-gray-400'>{overview}</p>}
			</div>
		</div>
	)
}

export default TVSeasonCard
