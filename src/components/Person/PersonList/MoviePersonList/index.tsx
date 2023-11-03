import { IPersonCard } from '../../../../../interfaces'
import React, { FC } from 'react'
import PersonCard from '../PersonCard'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import useItemsToShow from '@/hooks/useItemsToShow'

type PropsType = {
	personsFromProps: Array<IPersonCard>
	title: string
}

const MoviePersonsList: FC<PropsType> = ({ personsFromProps, title }) => {
	const {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	} = useItemsToShow(personsFromProps, 8)

	if (!itemsToShow.length) {
		return <EmptyList title={title} />
	}

	return (
		<div ref={listRef} className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8'>
				{itemsToShow.map((item: IPersonCard, idx) => {
					return (
						<PersonCard
							key={idx}
							item={item}
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
					onClick={getItemsToShow}
				>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default MoviePersonsList
