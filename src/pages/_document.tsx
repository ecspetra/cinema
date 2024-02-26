import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap'
					rel='stylesheet'
				/>
				<title>CinemaStreet</title>
				<meta
					name='description'
					content='Film library. Users have the opportunity to register on the platform, explore information about films, TV series, and actors. They can utilize quick search and filtering options, leave reviews, provide ratings and reactions, connect with other project participants as friends, and create their own collections.'
				/>
				<meta name='author' content='Yuliia Tkachenko' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicon/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon/favicon-16x16.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='192x192'
					href='/favicon/android-chrome-192x192.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='512x512'
					href='/favicon/android-chrome-512x512.png'
				/>
				<link
					rel='shortcut icon'
					href='/favicon/favicon.ico'
					type='image/x-icon'
				/>
				<link rel='manifest' href='/favicon/site.webmanifest' />
				<meta name='msapplication-TileColor' content='#a3e635' />
				<meta name='theme-color' content='#ffffff' />
				<meta
					property='og:url'
					content='https://cinema-street.yuliia-tkachenko.dev/'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:title' content='CinemaStreet' />
				<meta
					property='og:description'
					content='Film library. Users have the opportunity to register on the platform, explore information about films, TV series, and actors. They can utilize quick search and filtering options, leave reviews, provide ratings and reactions, connect with other project participants as friends, and create their own collections.'
				/>
				<meta name='twitter:card' content='summary_large_image' />
				<meta
					property='twitter:domain'
					content='yuliia-tkachenko.dev'
				/>
				<meta
					property='twitter:url'
					content='https://cinema-street.yuliia-tkachenko.dev/'
				/>
				<meta name='twitter:title' content='CinemaStreet' />
				<meta
					name='twitter:description'
					content='Film library. Users have the opportunity to register on the platform, explore information about films, TV series, and actors. They can utilize quick search and filtering options, leave reviews, provide ratings and reactions, connect with other project participants as friends, and create their own collections.'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
