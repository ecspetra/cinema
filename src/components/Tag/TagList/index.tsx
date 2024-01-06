import { FC, Dispatch, SetStateAction } from 'react'
import Tag from '@/components/Tag'
import { ITag } from '../../../../interfaces'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import Button from '@/app/components/UI/Button'
import useTagList from '@/components/Tag/hooks/useTagList'

type PropsType = {
	tags: ITag[]
	title?: string
	className?: string
	isEditTags?: boolean
	onFormClose?: Dispatch<SetStateAction<boolean>>
}

const TagList: FC<PropsType> = ({
	tags,
	title = '',
	className,
	isEditTags = false,
	onFormClose,
}) => {
	const tagListConfig = {
		onFormClose,
		isEditTags,
	}
	const {
		itemsList,
		toggleTag,
		saveChanges,
		closeEditTagsForm,
		checkIfTagIsSelected,
	} = useTagList(tags, tagListConfig)

	if (!itemsList.length)
		return (
			<EmptyList
				title={title}
				variant='h3'
				text='No genres yet'
				className={className}
			/>
		)

	return (
		<div className={className}>
			{title && <Title variant='h3'>{title}</Title>}
			<div className='flex flex-wrap justify-start items-start'>
				{itemsList.map(item => {
					return (
						<Tag
							key={item.name}
							tag={item}
							isEdit={isEditTags}
							isSelected={checkIfTagIsSelected(item.name)}
							onToggle={toggleTag}
						/>
					)
				})}
			</div>
			{isEditTags && (
				<div className='flex justify-start items-center gap-2 mt-5'>
					<Button onClick={saveChanges}>Save</Button>
					<Button context='filledDark' onClick={closeEditTagsForm}>
						Cancel
					</Button>
				</div>
			)}
		</div>
	)
}

export default TagList
