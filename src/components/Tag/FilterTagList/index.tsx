import React, { FC, useEffect, useState } from 'react'
import Tag from '@/components/Tag'
import { ITag } from '../../../../interfaces'
import getAllGenres from '@/handlers/getAllGenres'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	onToggle: () => void
	name: string
}

const FilterTagList: FC<PropsType> = ({ onToggle, name }) => {
	const [itemsList, setItemsList] = useState<Array<ITag>>([])

	const onToggleTag = (tag, isChecked) => {
		onToggle(name, tag, isChecked)
	}

	useEffect(() => {
		const getTags = async () => {
			const allTags = await getAllGenres('movie')
			setItemsList(allTags)
		}

		getTags()
	}, [])

	return (
		<div className='h-fit'>
			<Title variant='h3'>With genres</Title>
			<div className='flex flex-wrap justify-start items-start mb-5'>
				{itemsList.map(item => {
					return (
						<Tag
							key={item.name}
							tag={item}
							isEdit
							onToggle={onToggleTag}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default FilterTagList
