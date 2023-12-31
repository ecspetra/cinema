import Title from '@/app/components/UI/Title/Title'
import {
	FC,
	useEffect,
	Dispatch,
	useState,
	SetStateAction,
	FormEvent,
	ReactNode,
} from 'react'
import Loader from '@/components/Loader'
import Button from '@/app/components/UI/Button'
import Error from '@/app/components/UI/Error'
import SelectOption from '@/app/components/UI/Input/Select/SelectOption'
import Select from '@/app/components/UI/Input/Select'
import FilterTagList from '@/components/Tag/FilterTagList'
import Search from '@/app/components/UI/Search'
import {
	FilterFields,
	FilterUrlToSearch,
	UserCollections,
} from '@/constants/enum'
import { getCountriesList } from '@/app/components/Filter/handlers/getCountriesList'
import SelectedFilters from '@/app/components/Filter/SelectedFilters'
import useFilterReducer, {
	FilterFormData,
	groupedFilterFields,
	ungroupedFilterFields,
} from '@/hooks/useFilterReducer'
import { getFilterQuery } from '@/app/components/Filter/handlers/getFilterQuery'
import { getSelectOptions } from '@/app/components/Filter/handlers/getSelectOptions'
import { IItemCountry, ITag } from '../../../../interfaces'

type PropsType = {
	onApplyFilter: Dispatch<SetStateAction<string>>
	collectionType: UserCollections.movie | UserCollections.tv
	fields: (keyof FilterFormData)[]
	defaultUrl: string
}

const Filter: FC<PropsType> = ({
	onApplyFilter,
	collectionType,
	fields,
	defaultUrl,
}) => {
	const [state, dispatch] = useFilterReducer()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [countryList, setCountryList] = useState<IItemCountry[]>([])

	const handleResetFilter = () => {
		dispatch({ type: 'RESET' })
		onApplyFilter(defaultUrl)
	}

	const handleSelectChange = (field: keyof FilterFormData, value: string) => {
		dispatch({ type: 'SELECT_FIELD_CHANGE', field, value })
	}

	const handleArrayFieldChange = (
		field: keyof FilterFormData,
		value: object
	) => {
		dispatch({ type: 'ARRAY_FIELD_CHANGE', field, value })
	}

	const handleRemoveFilterTag = (tag: ITag) => {
		dispatch({ type: 'REMOVE_TAG', tag })
	}

	const handleToggleTag = (
		field: keyof FilterFormData,
		tag: any,
		isChecked: boolean
	) => {
		dispatch({ type: 'TOGGLE_TAG', field, tag, isChecked })
	}

	const handleSearch = async (event: FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const query =
				Object.keys(state).length === 0 ? '' : getFilterQuery(state)
			onApplyFilter(defaultUrl.concat(query))
			setError('')
		} catch (error: any) {
			setError(error.toString())
		} finally {
			setIsLoading(false)
		}
	}

	const getFilterField = (field: keyof FilterFormData) => {
		switch (field) {
			case 'primary_release_year':
			case 'first_air_date_year':
			case 'vote_average.lte':
				const options = getSelectOptions(field) as string[]
				const dateAndVoteAverageSelectValue = state[field] ?? 'Select'
				return (
					<Select
						key={field}
						label={FilterFields[field]}
						name={field}
						onChange={handleSelectChange}
						defaultValue={dateAndVoteAverageSelectValue}
					>
						{options.map((item, idx) => (
							<SelectOption key={idx} value={item} label={item} />
						))}
					</Select>
				)
			case 'with_original_language':
				const countrySelectValue =
					countryList.find(
						item => item.iso_3166_1.toLowerCase() === state[field]
					)?.english_name ?? 'Select'
				return (
					<Select
						key={field}
						label={FilterFields[field]}
						name={field}
						onChange={handleSelectChange}
						defaultValue={countrySelectValue}
					>
						{countryList.map((item, idx) => (
							<SelectOption
								key={idx}
								value={item.iso_3166_1.toLowerCase()}
								label={item.english_name}
							/>
						))}
					</Select>
				)
			case 'with_people':
			case 'with_companies':
			case 'with_keywords':
				return (
					<Search
						key={field}
						name={field}
						label={FilterFields[field]}
						urlToFetch={FilterUrlToSearch[field].toString()}
						onSearch={handleArrayFieldChange}
					/>
				)
			case 'with_genres':
				return (
					<FilterTagList
						key={field}
						tags={state[field] ?? []}
						onToggle={handleToggleTag}
						name={field}
						type={collectionType}
					/>
				)
		}
	}

	const renderFieldGroup = (
		filterFieldGroup:
			| typeof groupedFilterFields
			| typeof ungroupedFilterFields
	): ReactNode => {
		return filterFieldGroup.map(field => {
			if (fields.includes(field)) return getFilterField(field)
		})
	}

	useEffect(() => {
		const fetchCountriesList = async () => {
			const countryList = await getCountriesList(collectionType)
			setCountryList(countryList)
		}

		fetchCountriesList()
	}, [])

	return (
		<div className='mb-16 bg-gray-950'>
			<Title>Filter</Title>
			<form onSubmit={handleSearch}>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
					{renderFieldGroup(groupedFilterFields)}
				</div>
				<div>{renderFieldGroup(ungroupedFilterFields)}</div>
				<SelectedFilters
					formData={state}
					onRemove={handleRemoveFilterTag}
					onReset={handleResetFilter}
					countryList={countryList}
				/>
				<Button type='submit' className='mx-auto'>
					{isLoading ? <Loader isShowText type='static' /> : 'Apply'}
				</Button>
				{error && (
					<Error
						className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
						error={error}
					/>
				)}
			</form>
		</div>
	)
}

export default Filter
