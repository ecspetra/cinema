import {
	useState,
	useEffect,
	useRef,
	ChangeEvent,
	FormEvent,
	RefObject,
	Dispatch,
	SetStateAction,
} from 'react'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import { useClickOutsideContainer } from '@/hooks/useClickOutsideContainer'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IItemCard } from '../../interfaces'
import { FilterFormData } from '@/hooks/useFilterReducer'

export interface SearchHookProps {
	onSearch:
		| Dispatch<SetStateAction<string>>
		| ((
				field: keyof FilterFormData,
				value: { id: number; name: string }
		  ) => void)
	urlToFetch: string
	defaultUrlToFetch?: string
	isSearchApplied?: boolean
}

interface SearchHookResult {
	containerRef: RefObject<HTMLDivElement>
	isLoading: boolean
	urlToFetchWithSearchQuery: string
	isShowClearButton: boolean
	isSearchQueryUpdate: boolean
	searchQuery: string
	results: IItemCard[]
	error: string
	isMoreDataAvailable: boolean
	isOpen: boolean
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
	cancelSearch: () => void
	resetSearch: () => void
	handleSearch: (event: FormEvent) => void
}

const useSearchLogic = ({
	onSearch,
	urlToFetch,
	defaultUrlToFetch,
	isSearchApplied,
}: SearchHookProps): SearchHookResult => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [isSearchQueryUpdate, setIsSearchQueryUpdate] =
		useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [results, setResults] = useState<IItemCard[]>([])
	const [error, setError] = useState<string>('')
	const [isMoreDataAvailable, setIsMoreDataAvailable] =
		useState<boolean>(false)
	const { isOpen, onOpenContainer, onCloseContainer } =
		useClickOutsideContainer(containerRef, searchQuery.length > 0)
	const urlToFetchWithSearchQuery = urlToFetch.replace(
		'{searchQuery}',
		searchQuery
	)
	const isShowClearButton =
		searchQuery.length > 0 || (isSearchApplied as boolean)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)

		if (!isTouched) setIsTouched(true)
	}

	const cancelSearch = () => {
		resetSearch()
		;(onSearch as Dispatch<SetStateAction<string>>)(defaultUrlToFetch!)
	}

	const resetSearch = () => {
		onCloseContainer()
		setResults([])
		setSearchQuery('')
	}

	const handleSearch = async (event: FormEvent) => {
		event.preventDefault()

		const isFormValid = searchQuery.length > 0

		if (isFormValid && isTouched) {
			;(onSearch as Dispatch<SetStateAction<string>>)(
				urlToFetchWithSearchQuery
			)
			resetSearch()
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const abortController = new AbortController()
			const signal = abortController.signal

			setResults([])
			setError('')
			setIsSearchQueryUpdate(true)

			try {
				if (signal) {
					const data = await getResultsByPage(
						urlToFetchWithSearchQuery,
						1,
						signal
					)

					setResults(data.items)
					setIsMoreDataAvailable(data.isMoreDataAvailable)
					setIsSearchQueryUpdate(false)
				}
			} catch (error) {
				setError('Error fetching data')
			} finally {
				abortController.abort()
			}
		}

		if (searchQuery.length > 0) {
			if (!isOpen) onOpenContainer()

			const timeoutId = setTimeout(fetchData, 500)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [searchQuery, urlToFetchWithSearchQuery])

	return {
		containerRef,
		isLoading,
		urlToFetchWithSearchQuery,
		isShowClearButton,
		isSearchQueryUpdate,
		searchQuery,
		results,
		error,
		isMoreDataAvailable,
		isOpen,
		handleInputChange,
		cancelSearch,
		resetSearch,
		handleSearch,
	}
}

export default useSearchLogic
