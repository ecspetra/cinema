import Link from 'next/link'
import React, { FC } from 'react'

type PropsType = {
	breadcrumbs: Array<string>
}

const Breadcrumbs: FC<PropsType> = ({ breadcrumbs }) => {
	return (
		<nav>
			<ul className='flex justify-start items-start'>
				{breadcrumbs.map((item, idx) => (
					<li key={idx}>
						<Link href={item.href}>{item.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Breadcrumbs
