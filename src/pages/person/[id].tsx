import { NextPageContext } from 'next'
import {
	LINK_TO_FETCH_CURRENT_PERSON,
	LINK_TO_FETCH_CURRENT_PERSON_IMAGES,
	LINK_TO_FETCH_MOVIES_WITH_PERSONS,
} from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PersonInfo from '@/components/Person/PersonInfo'
import MovieList from '@/components/Movie/MovieList'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'

const Person = ({ personFromProps }) => {
	const [person, setPerson] = useState(personFromProps.personInfo)
	const [images, setImages] = useState(personFromProps.personImages)
	const [movies, setMovies] = useState(personFromProps.moviesWithPerson.items)
	const router = useRouter()
	const linkToFetchMoviesWithCurrentPerson =
		LINK_TO_FETCH_MOVIES_WITH_PERSONS.replace('{personId}', router.query.id)

	useEffect(() => {
		const fetchPerson = async () => {
			const getPersonInfo = async () => {
				const linkToFetch = LINK_TO_FETCH_CURRENT_PERSON.replace(
					'{personId}',
					router.query.id
				)
				const response = await fetch(linkToFetch)
				const result = await response.json()

				return result
			}

			const getPersonImages = async () => {
				const linkToFetch = LINK_TO_FETCH_CURRENT_PERSON_IMAGES.replace(
					'{personId}',
					router.query.id
				)
				const response = await fetch(linkToFetch)
				const result = await response.json()

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

	if (!person) {
		return <Loader className='bg-transparent' />
	}

	return (
		<>
			<TopBanner />
			<PersonInfo personInfo={person} personImages={images} />
			<MovieList
				movieList={movies}
				title={`Movies with ${person.name}`}
				isMoreDataAvailable={
					personFromProps.moviesWithPerson.isMoreDataAvailable
				}
				linkToFetchMovies={linkToFetchMoviesWithCurrentPerson}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const getPersonInfo = async () => {
		const linkToFetch = LINK_TO_FETCH_CURRENT_PERSON.replace(
			'{personId}',
			ctx.query.id
		)
		const response = await fetch(linkToFetch)
		const result = await response.json()

		return result
	}

	const getPersonImages = async () => {
		const linkToFetch = LINK_TO_FETCH_CURRENT_PERSON_IMAGES.replace(
			'{personId}',
			ctx.query.id
		)
		const response = await fetch(linkToFetch)
		const result = await response.json()

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
