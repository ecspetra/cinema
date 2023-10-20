export const API_KEY = '1fdbb7205b3bf878ede960ab5c9bc7ce'
export const LINK_TO_FETCH_DEFAULT_MOVIE_LIST = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page={currentPage}`
export const LINK_TO_FETCH_SIMILAR_MOVIE_LIST = `https://api.themoviedb.org/3/movie/{movieId}/similar?api_key=${API_KEY}&page={currentPage}`
export const LINK_TO_FETCH_ALL_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
export const LINK_TO_FETCH_CURRENT_PERSON = `https://api.themoviedb.org/3/person/{personId}?api_key=${API_KEY}`
export const LINK_TO_FETCH_CURRENT_PERSON_IMAGES = `https://api.themoviedb.org/3/person/{personId}/images?api_key=${API_KEY}`
export const LINK_TO_FETCH_PERSON_LIST = `https://api.themoviedb.org/3/person/popular/?api_key=${API_KEY}&page={currentPage}`
export const LINK_TO_FETCH_MOVIES_WITH_PERSONS = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_people={personId}&page={currentPage}`
