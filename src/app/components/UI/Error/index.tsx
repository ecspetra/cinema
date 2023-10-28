import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type PropsType = {
	error: string
	className?: string
}

const Error: FC<PropsType> = ({ error, className }) => {
	return (
		<span
			className={classNames(
				'text-sm text-amber-600 font-semibold',
				className
			)}
		>
			{error}
		</span>
	)
}

export default Error
