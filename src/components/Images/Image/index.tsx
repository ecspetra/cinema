import {useState, FC} from "react"
import {getDefaultImage} from "@/handlers/getDefaultImage"
import Loader from "../../../components/Loader"
import classNames from "classnames"

type PropsType = {
	src: string;
	defaultImage: JSX.Element;
	className?: string;
}

const Image: FC<PropsType> = ({ src, defaultImage, className }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	return (
		<span className={classNames(className, 'relative block aspect-[2/3] w-full')}>
			<img onError={event => getDefaultImage(event, defaultImage)} onLoad={() => {setIsLoading(false)}} src={src} alt="image" className="block object-cover w-full h-full" />
			{isLoading && <Loader />}
		</span>
	)
}

export default Image