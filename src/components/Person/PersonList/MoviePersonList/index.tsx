import { IPersonCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import PersonCard from '../PersonCard'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'

type PropsType = {
	personsFromProps: Array<IPersonCard>
	title: string
}

const MoviePersonsList: FC<PropsType> = ({ personsFromProps, title }) => {
	const [itemsToShow, setItemsToShow] = useState([])
	const initialItemsLength = 8
	const isMoreDataAvailable = itemsToShow.length > initialItemsLength
	const isShowMoreButton = personsFromProps.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show less' : 'Show all'

	const getPersons = () => {
		if (isMoreDataAvailable) {
			setItemsToShow([])
			personsFromProps.map((item, idx) => {
				if (idx < initialItemsLength)
					setItemsToShow(prevState => [...prevState, item])
			})
		} else {
			personsFromProps.map((item, idx) => {
				if (idx >= initialItemsLength)
					setItemsToShow(prevState => [...prevState, item])
			})
		}
	}

	useEffect(() => {
		setItemsToShow([])
		personsFromProps.map((item, idx) => {
			if (idx < initialItemsLength)
				setItemsToShow(prevState => [...prevState, item])
		})
	}, [personsFromProps])

	if (!itemsToShow.length) {
		return <EmptyList title={title} />
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8'>
				{itemsToShow.map((item: IPersonCard, idx) => {
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
