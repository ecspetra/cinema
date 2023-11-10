import React, { FC, useEffect, useState } from 'react'
import Genre from '@/components/Genre'
import { IGenre } from '../../../../interfaces'
import getAllGenres from '@/handlers/getAllGenres'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import Button from '@/app/components/UI/Button'
import { updateProfileGenres } from '@/firebase/config'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'

type PropsType = {
	genres: Array<IGenre>
	title?: string
	className?: string
	isEditGenres?: boolean
	onFormClose?: React.Dispatch<React.SetStateAction<boolean>>
}

const GenreList: FC<PropsType> = ({
	genres,
	title = '',
	className,
	isEditGenres = false,
	onFormClose,
}) => {
	const [itemsList, setItemsList] = useState<Array<IGenre>>([])
	const [favoriteGenres, setFavoriteGenres] = useState<Array<IGenre>>(genres)
	const { showModal } = useModal()

	const handleToggleGenre = (genre, isChecked) => {
		if (isChecked) {
			setFavoriteGenres(prevState =>
				prevState.filter(item => item.name !== genre.name)
			)
		} else {
			setFavoriteGenres(prevState => [...prevState, genre])
		}
	}

	const handleIsFavoriteGenre = genre => {
		if (genres && genres.find(item => item.name === genre)) {
			return true
		}
	}

	const handleSaveChanges = async () => {
		await updateProfileGenres(favoriteGenres).then(() => {
			onFormClose(false)
			showSuccessNotification(
				showModal,
				'Your profile was successfully updated'
			)
		})
	}

	useEffect(() => {
		if (isEditGenres) {
			const getGenres = async () => {
				const allGenres = await getAllGenres('movie')
				setItemsList(allGenres)
			}

			getGenres()
		} else {
			setItemsList(genres)
		}
	}, [isEditGenres])

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
			<div className='flex flex-wrap justify-start items-start mb-5'>
				{itemsList.map(item => {
					return (
						<Genre
							key={item.name}
							genre={item}
							isEdit={isEditGenres}
							isFavorite={handleIsFavoriteGenre(item.name)}
							onToggle={handleToggleGenre}
						/>
					)
				})}
			</div>
			{isEditGenres && (
				<div className='flex justify-start items-center gap-2'>
					<Button onClick={handleSaveChanges}>Save</Button>
					<Button
						context='filledDark'
						onClick={() => onFormClose(false)}
					>
						Cancel
					</Button>
				</div>
			)}
		</div>
	)
}

export default GenreList
