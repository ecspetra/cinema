import moment from 'moment'
import { IDetailsItem, IDetailsTextArrayItemType } from '../../../../interfaces'

export const getDetailsItemText = (
	text: IDetailsItem['text'],
	type: 'date' | 'array' | 'text' = 'date'
) => {
	let itemText
	const emptyText = 'No info yet'

	switch (type) {
		case 'date':
			return (itemText = text
				? moment(text as string).format('Do MMM YYYY')
				: emptyText)
		case 'array':
			return (itemText =
				Array.isArray(text) &&
				text.length > 0 &&
				(text as IDetailsTextArrayItemType[]).map(
					(item: IDetailsTextArrayItemType, idx) => {
						return (
							<span className='mr-1' key={item.name}>
								{idx === text.length - 1
									? item.name
									: item.name + ','}
							</span>
						)
					}
				))
		case 'text':
			itemText = text ? text : emptyText
	}

	return itemText
}
