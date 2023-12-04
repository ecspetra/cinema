import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCalendarCheck,
	faFlag,
	faBolt,
	faAt,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'

type PropsType = {
	type: string
	title: string
	text: string | Array<any>
}

const DetailsItem: FC<PropsType> = ({ type, title, text }) => {
	const getDetailsItem = () => {
		switch (type) {
			case 'release_date':
			case 'first_air_date':
				return (
					<>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5 font-semibold'>{title}</span>
						{moment(text).format('Do MMM YYYY')}
					</>
				)
			case 'production_countries':
			case 'production_companies':
				return (
					<>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={
								type === 'production_companies'
									? faBolt
									: faFlag
							}
						/>
						<span className='mr-1.5 font-semibold'>{title}</span>
						{text.map((item, idx) => {
							return (
								<span className='mr-1' key={item.name}>
									{idx === text.length - 1
										? item.name
										: item.name + ','}
								</span>
							)
						})}
					</>
				)
			case 'place_of_birth':
			case 'user_country':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
						<span className='mr-1.5 font-semibold'>{title}</span>
						{text ? text : 'No info yet'}
					</>
				)
			case 'birthday':
				return (
					<>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5'>{title.birthday}</span>
						<span>
							<span>
								{moment(text.birthday).format('Do MMM YYYY')}
							</span>
							{text.deathday && (
								<span>
									{`— ${title.deathday}`}
									{moment(text.deathday).format(
										'Do MMM YYYY'
									)}
								</span>
							)}
						</span>
					</>
				)
			case 'user_email':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faAt} />
						<span className='mr-1.5 font-semibold'>{title}</span>
						{text}
					</>
				)
			case 'user_date_of_birth':
				return (
					<>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5 font-semibold'>{title}</span>
						{text
							? moment(text).format('Do MMM YYYY')
							: 'No info yet'}
					</>
				)
		}
	}

	return (
		<div className='flex items-center flex-wrap text-sm'>
			{getDetailsItem()}
		</div>
	)
}

export default DetailsItem
