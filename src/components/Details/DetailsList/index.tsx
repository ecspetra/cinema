import { FC } from 'react'
import DetailsItem from '@/components/Details/DetailsList/DetailsItem'
import classNames from 'classnames'

type PropsType = {
	itemsList: any[]
	className?: string
}

const DetailsList: FC<PropsType> = ({ itemsList, className }) => {
	return (
		<div className={classNames('mb-5', className)}>
			{itemsList.map(item => {
				return <DetailsItem key={item.title} item={item} />
			})}
		</div>
	)
}

export default DetailsList
