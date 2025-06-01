import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchPopularMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const {
		data: movies,
		loading,
		error,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchPopularMovies({ query: searchQuery }), false);

	useEffect(() => {
		const timeOutId = setTimeout(async () => {
			if (searchQuery.trim()) {
				await loadMovies();
			} else {
				reset();
			}
		}, 500);

		return () => clearTimeout(timeOutId);
	}, [searchQuery]);

	useEffect(() => {
		if (movies?.length > 0 && movies?.[0]) {
			updateSearchCount(searchQuery, movies[0]);
		}
	}, [movies]);

	return (
		<View className='flex-1 bg-primary'>
			<Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				className='px-5'
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				columnWrapperStyle={{
					justifyContent: 'flex-start',
					gap: 16, // Fixed gap between items
					marginVertical: 16,
				}}
				ListHeaderComponent={
					<>
						<View className='w-full flex-row justify-center mt-20 items-center'>
							<Image source={icons.logo} className='w-12 h-10' />
						</View>
						<View>
							<SearchBar
								placeholder='Search movies ...'
								value={searchQuery}
								onChangeText={(text: string) => setSearchQuery(text)}
							/>

							{loading && <ActivityIndicator size='large' color='#0000ff' className='my-3' />}

							{error && <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text>}

							{!loading && !error && searchQuery.trim() && movies?.length > 0 && (
								<Text className='text-xl text-white font-bold'>
									Search Results for <Text className='text-accent'>{searchQuery}</Text>
								</Text>
							)}
						</View>
					</>
				}
				ListEmptyComponent={
					!loading && !error ? (
						<View className='mt-10'>
							<Image source={icons.search} className='w-10 h-10 mx-auto mb-5' resizeMode='contain' />
							<Text className='text-center text-gray-500'>
								{searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
							</Text>
						</View>
					) : null
				}
			></FlatList>
		</View>
	);
};

export default Search;
