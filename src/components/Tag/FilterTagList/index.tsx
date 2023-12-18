import React, { FC, useEffect, useState } from 'react'
import Tag from '@/components/Tag'
import { ITag } from '../../../../interfaces'
import { getAllGenres } from '@/handlers/getAllGenres'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	tags: Array<ITag>
	onToggle: () => void
	name: string
	type: string
}

const FilterTagList: FC<PropsType> = ({ tags, onToggle, name, type }) => {
	const [itemsList, setItemsList] = useState<ITag[]>([])
	const [selectedTags, setSelectedTags] = useState<ITag[]>(tags)

	const onToggleTag = (tag, isChecked) => {
		onToggle(name, tag, isChecked)
	}

	useEffect(() => {
		const getTags = async () => {
			const allTags = await getAllGenres(type)
			setItemsList(allTags)
		}

		getTags()
	}, [])

	useEffect(() => {
		setSelectedTags(tags)
	}, [tags])

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
							isSelected={
								selectedTags &&
								selectedTags.find(tag => tag.name === item.name)
							}
							onToggle={onToggleTag}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default FilterTagList
