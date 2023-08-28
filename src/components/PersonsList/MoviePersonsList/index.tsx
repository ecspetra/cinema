import {IPersonCard} from "../../../../interfaces"
import {FC, useEffect, useState} from "react"
import PersonCard from "@/components/PersonCard"
import Button from "@/app/components/UI/Button"

type PropsType = {
	personsFromProps: Array<IPersonCard>;
}

const MoviePersonsList: FC<PropsType> = ({ personsFromProps }) => {
	const [persons, setPersons] = useState([])
	const initialPersonsNumber = 8
	const isAllPersonsLoaded = persons.length > initialPersonsNumber
	const isShowMoreButton = personsFromProps.length > initialPersonsNumber
	const buttonText = isAllPersonsLoaded ? 'Show less' : 'Show all'

	const getPersons = () => {
		if (isAllPersonsLoaded) {
			setPersons([])
			personsFromProps.map((item, idx) => {
				if (idx < initialPersonsNumber) setPersons(prevState => [...prevState, item])
			})
		} else {
			personsFromProps.map((item, idx) => {
				if (idx >= initialPersonsNumber) setPersons(prevState => [...prevState, item])
			})
		}
	}

	useEffect(() => {
		personsFromProps.map((item, idx) => {
			if (idx < initialPersonsNumber) setPersons(prevState => [...prevState, item])
		})
	}, [])

	return (
		<>
			<div className="grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8">
				{persons.map((item: IPersonCard, idx) => {
					return <PersonCard key={idx} person={item} />
				})}
			</div>
			{isShowMoreButton && <Button className="mx-auto max-w-[200px]" context="empty" onClick={() => getPersons()}>{buttonText}</Button>}
		</>
	)
}

export default MoviePersonsList
