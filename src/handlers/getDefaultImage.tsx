import { IDefaultImage } from '../../interfaces'

export const getDefaultImage = (
	event: React.SyntheticEvent<HTMLImageElement, Event>,
	defaultImage: IDefaultImage
) => {
	const imageElement = event.target as HTMLImageElement
	imageElement.src = defaultImage.src
}
