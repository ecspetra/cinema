import {LINK_TO_FETCH_ALL_GENRES} from "@/constants/links"

const getAllGenres = async () => {
	const response = await fetch(LINK_TO_FETCH_ALL_GENRES)
	const result = await response.json()
	return result.genres
}

export default getAllGenres