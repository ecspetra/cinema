import { IPersonCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import PersonCard from '../../PersonCard'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	personsFromProps: Array<IPersonCard>
	title: string
}

const MoviePersonsList: FC<PropsType> = ({ personsFromProps, title }) => {
	const [personsToShow, setPersonsToShow] = useState([])
	const initialItemsLength = 8
	const isMoreDataAvailable = personsToShow.length > initialItemsLength
	const isShowMoreButton = personsFromProps.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show less' : 'Show all'

	const getPersons = () => {
		if (isMoreDataAvailable) {
			setPersonsToShow([])
			personsFromProps.map((item, idx) => {
				if (idx < initialItemsLength)
					setPersonsToShow(prevState => [...prevState, item])
			})
		} else {
			personsFromProps.map((item, idx) => {
				if (idx >= initialItemsLength)
					setPersonsToShow(prevState => [...prevState, item])
			})
		}
	}

	useEffect(() => {
		personsFromProps.map((item, idx) => {
			if (idx < initialItemsLength)
				setPersonsToShow(prevState => [...prevState, item])
		})
	}, [])

	if (!personsToShow.length) {
		return (
			<div className='mb-16'>
				<Title>{title}</Title>
				<p>No persons yet</p>
			</div>
		)
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8'>
				{personsToShow.map((item: IPersonCard, idx) => {
					return (
						<PersonCard
							key={idx}
							person={item}
							isShowButton={false}
							isShowRole
						/>
					)
				})}
			</div>
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={() => getPersons()}
				>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default MoviePersonsList
