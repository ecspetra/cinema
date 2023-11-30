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
				'w-full text-sm text-rose-600 font-semibold block mt-2',
				className
			)}
		>
			{error}
		</span>
	)
}

export default Error
