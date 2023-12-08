import { FC } from 'react'
import DetailsItem from '@/components/Details/DetailsList/DetailsItem'
import classNames from 'classnames'

type PropsType = {
	itemsList: Array<any>
	className: string
}

const DetailsList: FC<PropsType> = ({ itemsList, className }) => {
	return (
		<div className={classNames('mb-5', className)}>
			{itemsList.map(item => {
				return (
					<DetailsItem
						key={item.title}
						type={item.type}
						title={item.title}
						text={item.text}
					/>
				)
			})}
		</div>
	)
}

export default DetailsList
