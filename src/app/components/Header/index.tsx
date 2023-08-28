import Link from "next/link"

const Header = () => {
	return (
		<div className="">
			<Link href={`/`} as={`/`}>
				<span>CinemaStreet</span>
			</Link>
		</div>
	)
}

export default Header
