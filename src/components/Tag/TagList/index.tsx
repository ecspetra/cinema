import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import Tag from '@/components/Tag'
import { ITag } from '../../../../interfaces'
import { getAllGenres } from '@/handlers/getAllGenres'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import Button from '@/app/components/UI/Button'
import { updateProfileGenres } from '@/firebase/config'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'

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
	const [itemsList, setItemsList] = useState<ITag[]>([])
	const [selectedTags, setSelectedTags] = useState<ITag[]>(tags)
	const { showModal } = useModal()

	const handleToggleTag = (tag: ITag, isChecked: boolean) => {
		if (isChecked) {
			setSelectedTags(prevState =>
				prevState.filter(item => item.name !== tag.name)
			)
		} else {
			setSelectedTags(prevState => [...prevState, tag])
		}
	}

	const handleIsSelectedTag = (tagName: ITag['name']) => {
		if (tags && tags.find(item => item.name === tagName)) {
			return true
		}
	}

	const handleClose = () => {
		onFormClose && onFormClose(false)
	}

	const handleSaveChanges = async () => {
		await updateProfileGenres(selectedTags).then(() => {
			handleClose()
			showSuccessNotification(
				showModal,
				'Your profile was successfully updated'
			)
		})
	}

	useEffect(() => {
		if (isEditTags) {
			const getTags = async () => {
				const allTags = await getAllGenres('all')
				setItemsList(allTags)
			}

			getTags()
		} else {
			setItemsList(tags)
		}
	}, [isEditTags])

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
							isSelected={handleIsSelectedTag(item.name)}
							onToggle={handleToggleTag}
						/>
					)
				})}
			</div>
			{isEditTags && (
				<div className='flex justify-start items-center gap-2 mt-5'>
					<Button onClick={handleSaveChanges}>Save</Button>
					<Button context='filledDark' onClick={handleClose}>
						Cancel
					</Button>
				</div>
			)}
		</div>
	)
}

export default TagList
