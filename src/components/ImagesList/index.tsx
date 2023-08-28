import {FC, useEffect, useState} from 'react'
import {IBackdrop} from "../../../interfaces"
import Image from "@/components/Image"
import defaultMovieImage from "../../app/assets/images/default-movie-image.svg"
import Button from "@/app/components/UI/Button"

type PropsType = {
	images: Array<IBackdrop>;
}

const ImagesList: FC<PropsType> = ({ images }) => {
	const [imagesToRender, setImagesToRender] = useState([])
	const initialImagesNumber = 12
	const isAllImagesLoaded = imagesToRender.length > initialImagesNumber
	const isShowMoreButton = images.length > initialImagesNumber
	const buttonText = isAllImagesLoaded ? 'Show less' : 'Show all'

	const getImages = () => {
		if (isAllImagesLoaded) {
			setImagesToRender([])
			images.map((item, idx) => {
				if (idx < initialImagesNumber) setImagesToRender(prevState => [...prevState, item])
			})
		} else {
			images.map((item, idx) => {
				if (idx >= initialImagesNumber) setImagesToRender(prevState => [...prevState, item])
			})
		}
	}

	useEffect(() => {
		images.map((item, idx) => {
			if (idx < initialImagesNumber) setImagesToRender(prevState => [...prevState, item])
		})
	}, [])

	return (
		<>
			<div className="grid grid-cols-[repeat(auto-fill,215px)] gap-1 justify-start">
				{imagesToRender.map((item, idx) => {
					return <Image key={idx} className="aspect-[215/121]" src={`https://image.tmdb.org/t/p/w500${item.file_path}`} defaultImage={defaultMovieImage} />
				})}
			</div>
			{isShowMoreButton && <Button className="mx-auto max-w-[200px] mt-8" context="empty" onClick={() => getImages()}>{buttonText}</Button>}
		</>
	)
}

export default ImagesList
