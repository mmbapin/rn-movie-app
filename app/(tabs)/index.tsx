import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchPopularMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

export default function Index() {
	const router = useRouter();

	const {data: movies, loading: moviesLoading, error: moviesError} = useFetch(() => fetchPopularMovies({ query: '' }));

	// console.log('Movies:', movies);
	return (
		<View className='flex-1 bg-primary'>
			<Image source={images.bg} className='absolute w-full z-0' />
			<ScrollView
				className='flex-1 px-5'
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					minHeight: '100%',
					paddingBottom: 10,
				}}
			>
				<Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

				{moviesLoading ? (
					<ActivityIndicator 
						size='large'
						color='#0000ff'
						className='mt-10 self-center'
					/>
				  ) : moviesError ? ( <Text>Error: {moviesError?.message}</Text>) : (
						<View className='flex-1 mt-5'>
							<SearchBar
								onPress={() => {
									router.push('/search');
								}}
								placeholder='Search for a movie '
							/>

							<>
								<Text className='text-white text-lg font-bold mt-5 mb-3'>Latest Movies</Text>

								<FlatList
									data={movies}
									renderItem={({ item }) => (
										<MovieCard 
											{...item}
										/>
									)}
									keyExtractor={(item) => item.id.toString()}
									numColumns={3}
									contentContainerStyle={{
    								justifyContent: 'flex-start',
    								paddingRight: 5,
    								marginBottom: 10,
  									}}
									  columnWrapperStyle={{
    									justifyContent: 'flex-start',  // Changed from space-between
    									gap: 16  // Fixed gap between items
  			      											}}
									ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
									scrollEnabled={false}
								></FlatList>
							</>
						</View>
					)} 
			</ScrollView>
		</View>
	);
}
