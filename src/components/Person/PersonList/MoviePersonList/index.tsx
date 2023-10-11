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
	const [persons, setPersons] = useState([])
	const initialPersonsNumber = 8
	const isAllPersonsLoaded = persons.length > initialPersonsNumber
	const isShowMoreButton = personsFromProps.length > initialPersonsNumber
	const buttonText = isAllPersonsLoaded ? 'Show less' : 'Show all'

	const getPersons = () => {
		if (isAllPersonsLoaded) {
			setPersons([])
			personsFromProps.map((item, idx) => {
				if (idx < initialPersonsNumber)
					setPersons(prevState => [...prevState, item])
			})
		} else {
			personsFromProps.map((item, idx) => {
				if (idx >= initialPersonsNumber)
					setPersons(prevState => [...prevState, item])
			})
		}
	}

	useEffect(() => {
		personsFromProps.map((item, idx) => {
			if (idx < initialPersonsNumber)
				setPersons(prevState => [...prevState, item])
		})
	}, [])

	if (!persons.length) {
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
				{persons.map((item: IPersonCard, idx) => {
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
