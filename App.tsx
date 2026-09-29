import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Switch, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './component/MovieCard';

const API_URL = 'https://6abb5b55b2118ed7abb8542a.mockapi.io/movies'; 

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(false);
  

  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true); 
    fetchMovies();       
  }, []);

  const handleSelect = (id: any) => {
    const movie = movies.find(m => String(m.id) === String(id));
    if (movie) {
      Alert.alert("Tên phim", movie.title);
    }
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} layout={isGrid ? 'tile' : 'row'} onSelect={handleSelect} />
  );

  const numColumns = isGrid ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Movie App</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Dạng lưới </Text>
            <Switch value={isGrid} onValueChange={setIsGrid} />
          </View>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={numColumns}
            columnWrapperStyle={isGrid ? { justifyContent: 'space-between', paddingHorizontal: 5 } : undefined}
            
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                colors={['#0000ff']} 
                tintColor="#0000ff"  
              />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10, 
    borderBottomWidth: 1, 
    borderColor: '#ccc' 
  }
});