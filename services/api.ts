//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTNmOTQ2MmIxZWNjZDAxYTJkNzQyNDNiM2Y3MzI5YyIsIm5iZiI6MTYwMjIzMTk5OS45MDUsInN1YiI6IjVmODAxZWJmZDg2MWFmMDAzNjg5ODYyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SwQ7qi936ngNP-EbFiDH57bVgwsgRzJtNJoCDQjsniA

//ee3f9462b1eccd01a2d74243b3f7329c

export const TMDB_CONFIG = {
	BASE_URL: 'https://api.themoviedb.org/3',
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
	},
};

export const fetchPopularMovies = async ({ query }: { query: string }) => {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

	const response = await fetch(endpoint, {
		method: 'GET',
		headers: TMDB_CONFIG.headers,
	});

	if (!response.ok) {
		//@ts-ignore
		throw new Error('Failed to fetch movies', response.statusText);
	}

	const data = await response.json();
	return data.results;
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
	try {
		const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
			method: 'GET',
			headers: TMDB_CONFIG.headers,
		});

		if (!response.ok) {
			throw new Error('Failed to fetch movie details');
		}

		const data = await response.json();
		return data as MovieDetails;
	} catch (error) {
		console.log('Error fetching movie details:', error);
		throw error;
	}
};
