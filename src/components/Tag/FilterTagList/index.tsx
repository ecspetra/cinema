import { FC, useEffect, useState } from 'react'
import Tag from '@/components/Tag'
import { ITag } from '../../../../interfaces'
import { getAllGenres } from '@/handlers/getAllGenres'
import Title from '@/app/components/UI/Title/Title'
import { FilterFormData } from '@/hooks/useFilterReducer'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	tags: ITag[]
	onToggle: (
		field: keyof FilterFormData,
		tag: ITag,
		isChecked: boolean
	) => void
	name: string
	type: UserCollections.movie | UserCollections.tv | 'all'
}

const FilterTagList: FC<PropsType> = ({ tags, onToggle, name, type }) => {
	const [itemsList, setItemsList] = useState<ITag[]>([])
	const [selectedTags, setSelectedTags] = useState<ITag[]>(tags)

	const onToggleTag = (tag: ITag, isChecked: boolean) => {
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
								selectedTags.some(tag => tag.name === item.name)
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
