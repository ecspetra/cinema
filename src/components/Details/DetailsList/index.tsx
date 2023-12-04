import { FC } from 'react'
import DetailsItem from '@/components/Details/DetailsList/DetailsItem'

type PropsType = {
	itemsList: Array<any>
}

const DetailsList: FC<PropsType> = ({ itemsList }) => {
	return (
		<div className='mb-5'>
			{itemsList.map(item => (
				<DetailsItem
					key={item.title}
					type={item.type}
					title={item.title}
					text={item.text}
				/>
			))}
		</div>
	)
}

export default DetailsList
