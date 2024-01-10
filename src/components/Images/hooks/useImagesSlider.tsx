import { useState } from 'react'
import { IBackdrop } from '../../../../interfaces'

const useImagesSlider = (initialImages: IBackdrop[], initialIdx: number) => {
	const [currentImageIdx, setCurrentImageIdx] = useState<number>(initialIdx)

	const showNextImage = () => {
		setCurrentImageIdx(prevIdx =>
			prevIdx === initialImages.length - 1 ? 0 : prevIdx + 1
		)
	}

	const showPrevImage = () => {
		setCurrentImageIdx(prevIdx =>
			prevIdx === 0 ? initialImages.length - 1 : prevIdx - 1
		)
	}

	return {
		currentImageIdx,
		showNextImage,
		showPrevImage,
	}
}

export default useImagesSlider
