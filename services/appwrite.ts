import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
	.setEndpoint('https://fra.cloud.appwrite.io/v1')
	.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your Project ID

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', query)]);

		if (result.documents.length > 0) {
			const existingMovie = result.documents[0];

			await databases.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
				count: existingMovie.count + 1,
			});
		} else {
			if (movie.id && movie.title && movie.poster_path) {
				await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
					searchTerm: query,
					movie_id: movie.id,
					count: 1,
					title: movie.title,
					poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
				});
			} // make sure movie has all required fields before creating a new document
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
	try {
		const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.limit(5),
			Query.orderDesc('count'),
		]);
		return result.documents as unknown as TrendingMovie[];
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
