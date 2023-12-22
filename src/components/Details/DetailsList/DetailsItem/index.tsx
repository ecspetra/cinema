import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCalendarCheck,
	faFlag,
	faBolt,
	faAt,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'

type PropsType = {
	type: string
	title: string
	text: string | any[]
}

const DetailsItem: FC<PropsType> = ({ type, title, text }) => {
	const emptyText = 'No info yet'

	const getItemText = (text, type: string) => {
		let itemText
		const isTextValid = text && text.length > 0

		switch (type) {
			case 'date':
				return (itemText = isTextValid
					? moment(text).format('Do MMM YYYY')
					: emptyText)
			case 'array':
				return (itemText =
					isTextValid &&
					text.map((item, idx) => {
						return (
							<span className='mr-1' key={item.name}>
								{idx === text.length - 1
									? item.name
									: item.name + ','}
							</span>
						)
					}))
			default:
				itemText = isTextValid ? text : emptyText
		}

		return itemText
	}

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
						{getItemText(text, 'date')}
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
						{getItemText(text, 'array')}
					</>
				)
			case 'place_of_birth':
			case 'user_country':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
						<span className='mr-1.5 font-semibold'>{title}</span>
						{getItemText(text)}
					</>
				)
			case 'birthday':
				return (
					<>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5 font-semibold'>
							{title.birthday}
						</span>
						<span>
							<span>{getItemText(text.birthday, 'date')}</span>
							{text.deathday && (
								<span>
									{`— ${title.deathday}`}
									{getItemText(text.deathday, 'date')}
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
						{getItemText(text)}
					</>
				)
			case 'gender':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faUser} />
						<span className='mr-1.5 font-semibold'>{title}</span>
						{getItemText(text)}
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
						{getItemText(text, 'date')}
					</>
				)
		}
	}

	return (
		<div className='flex items-center flex-wrap text-sm mb-1'>
			{getDetailsItem()}
		</div>
	)
}

export default DetailsItem
