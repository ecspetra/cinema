import { FC, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCalendarCheck,
	faFlag,
	faBolt,
	faAt,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { getDetailsItemText } from '@/components/Details/handlers/getDetailsItemText'
import { IDetailsItem, IDetailsItemText } from '../../../../../interfaces'

type PropsType = {
	item: IDetailsItem
}

const DetailsItem: FC<PropsType> = ({ item }) => {
	const { type, title, text } = item

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
						<span className='mr-1.5 font-semibold'>
							{title as string}
						</span>
						{getDetailsItemText(text as string)}
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
						<span className='mr-1.5 font-semibold'>
							{title as string}
						</span>
						{getDetailsItemText(text as string, 'array')}
					</>
				)
			case 'place_of_birth':
			case 'user_country':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
						<span className='mr-1.5 font-semibold'>
							{title as string}
						</span>
						{getDetailsItemText(text as string, 'text')}
					</>
				)
			case 'birthday':
				if (typeof title !== 'string' && typeof text !== 'string') {
					const birthdayText = getDetailsItemText(
						(text as IDetailsItemText).birthday
					)
					const deathdayText =
						(text as IDetailsItemText).deathday &&
						getDetailsItemText((text as IDetailsItemText).deathday!)
					return (
						<>
							<FontAwesomeIcon
								className='mr-1.5'
								icon={faCalendarCheck}
							/>
							<span className='mr-1.5 font-semibold'>
								{title.birthday}
							</span>
							<span>{birthdayText as ReactNode}</span>
							{(text as IDetailsItemText).deathday && (
								<>
									<span className='mr-1.5 font-semibold'>
										&nbsp;{`— ${title.deathday} `}
									</span>
									<span>{deathdayText as ReactNode}</span>
								</>
							)}
						</>
					)
				}
			case 'user_email':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faAt} />
						<span className='mr-1.5 font-semibold'>
							{title as string}
						</span>
						{getDetailsItemText(text as string, 'text')}
					</>
				)
			case 'gender':
				return (
					<>
						<FontAwesomeIcon className='mr-1.5' icon={faUser} />
						<span className='mr-1.5 font-semibold'>
							{title as string}
						</span>
						{getDetailsItemText(text as string, 'text')}
					</>
				)
			case 'user_date_of_birth':
				return (
					<>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5 font-semibold'>
							{title as string}
						</span>
						{getDetailsItemText(text as string)}
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
