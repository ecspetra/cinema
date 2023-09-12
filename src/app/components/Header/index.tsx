import Link from "next/link"

const Header = () => {
	return (
		<div className="">
			<Link href={`/`} as={`/`}>
				<span>CinemaStreet</span>
			</Link>
			<Link href={`/auth`} as={`/auth`}>
				<span>Auth</span>
			</Link>
		</div>
	)
}

export default Header
