import { NextPageContext } from 'next'
import { LINK_TO_FETCH_MOVIES_WITH_PERSONS } from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PersonInfo from '@/components/Person/PersonInfo'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'
import ItemsList from '@/components/List/ItemsList'
import { fetchItemData } from '@/handlers/fetchItemData'

const Person = ({ personFromProps }) => {
	const [person, setPerson] = useState(null)
	const [images, setImages] = useState([])
	const [movies, setMovies] = useState([])
	const router = useRouter()
	const linkToFetchMoviesWithCurrentPerson =
		LINK_TO_FETCH_MOVIES_WITH_PERSONS.replace('{personId}', router.query.id)

	useEffect(() => {
		const fetchPerson = async () => {
			const getPersonInfo = async () => {
				const result = await fetchItemData(
					'person',
					router.query.id,
					''
				)
				return result
			}

			const getPersonImages = async () => {
				const result = await fetchItemData(
					'person',
					router.query.id,
					'/images'
				)
				return result
			}

			try {
				const personInfo = await getPersonInfo()
				const personImages = await getPersonImages()
				const moviesWithPerson = await getResultsByPage(
					linkToFetchMoviesWithCurrentPerson,
					1
				)

				setPerson(personInfo)
				setImages(personImages.profiles)
				setMovies(moviesWithPerson)
			} catch (error) {
				setPerson(null)
				setImages([])
				setMovies([])
			}
		}

		if (!personFromProps) fetchPerson()
	}, [])

	useEffect(() => {
		setPerson(personFromProps.personInfo)
		setImages(personFromProps.personImages)
		setMovies(personFromProps.moviesWithPerson.items)
	}, [personFromProps])

	if (!person) {
		return <Loader className='bg-transparent' />
	}

	return (
		<>
			<TopBanner />
			<PersonInfo personInfo={person} personImages={images} />
			<ItemsList
				itemsList={movies}
				listName='movie'
				title={`Movies with ${person.name}`}
				isMoreDataAvailable={
					personFromProps.moviesWithPerson.isMoreDataAvailable
				}
				linkToFetchItems={linkToFetchMoviesWithCurrentPerson}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const getPersonInfo = async () => {
		const result = await fetchItemData('person', ctx.query.id, '')
		return result
	}

	const getPersonImages = async () => {
		const result = await fetchItemData('person', ctx.query.id, '/images')
		return result
	}

	try {
		const linkToFetchMoviesWithCurrentPerson =
			LINK_TO_FETCH_MOVIES_WITH_PERSONS.replace(
				'{personId}',
				ctx.query.id
			)
		const personInfo = await getPersonInfo()
		const personImages = await getPersonImages()
		const moviesWithPerson = await getResultsByPage(
			linkToFetchMoviesWithCurrentPerson,
			1
		)

		return {
			props: {
				personFromProps: {
					personInfo,
					personImages: personImages.profiles,
					moviesWithPerson,
				},
			},
		}
	} catch (error) {
		return {
			props: {
				personFromProps: null,
			},
		}
	}
}

export default Person
