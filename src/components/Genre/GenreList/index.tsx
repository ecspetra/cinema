import React, { FC, useEffect, useState } from 'react'
import Genre from '@/components/Genre'
import { IGenre } from '../../../../interfaces'
import getAllGenres from '@/handlers/getAllGenres'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import Button from '@/app/components/UI/Button'
import classNames from 'classnames'
import { updateProfileGenres } from '@/firebase/config'
import { showSuccessNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'

type PropsType = {
	genres: Array<IGenre>
	title?: string
	className?: string
}

const GenreList: FC<PropsType> = ({ genres, title = '', className }) => {
	const [itemsList, setItemsList] = useState<Array<IGenre>>([])
	const [favoriteGenres, setFavoriteGenres] = useState<Array<IGenre>>(genres)
	const [isEdit, setIsEdit] = useState<boolean>(false)
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
			setIsEdit(false)
			showSuccessNotification(
				showModal,
				'Your profile was successfully updated'
			)
		})
	}

	useEffect(() => {
		if (isEdit) {
			const getGenres = async () => {
				const allGenres = await getAllGenres('movie')
				setItemsList(allGenres)
			}

			getGenres()
		} else {
			setItemsList(genres)
		}
	}, [isEdit])

	if (!itemsList.length)
		return (
			<>
				<EmptyList
					title={title}
					variant='h3'
					text='No genres yet'
					className={classNames('text-center', className)}
				/>
				<Button
					context='filledDark'
					className='mx-auto'
					onClick={() => setIsEdit(true)}
				>
					Edit genres
				</Button>
			</>
		)

	return (
		<div className={className}>
			{title && <Title variant='h3'>{title}</Title>}
			<div className='flex flex-wrap justify-center items-start mb-5'>
				{itemsList.map(item => {
					return (
						<Genre
							key={item.name}
							genre={item}
							isEdit={isEdit}
							isFavorite={handleIsFavoriteGenre(item.name)}
							onToggle={handleToggleGenre}
						/>
					)
				})}
			</div>
			{isEdit ? (
				<div className='flex justify-center items-center gap-2'>
					<Button onClick={handleSaveChanges}>Save</Button>
					<Button
						context='filledDark'
						onClick={() => setIsEdit(false)}
					>
						Cancel
					</Button>
				</div>
			) : (
				<Button
					context='filledDark'
					className='mx-auto'
					onClick={() => setIsEdit(true)}
				>
					Edit genres
				</Button>
			)}
		</div>
	)
}

export default GenreList
