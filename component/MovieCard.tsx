import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const MovieCard = ({ movie, layout = 'row', onSelect }: MovieCardProps) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={[styles.posterWrap, isTile && styles.posterWrapTile]}>
        <Image source={{ uri: movie.poster }} style={styles.poster} resizeMode="cover" />
        {isTile && (
          <View >
            <Text > {movie.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View >
        <Text  numberOfLines={isTile ? 1 : undefined}>
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text >{movie.genre} • {movie.year}</Text>
            <Text > {movie.rating.toFixed(1)}</Text>
          </>
        )}

        <Text >
          {movie.isShowing ? 'dang chieu' : 'ngung chieu'} {isTile ? '' : (movie.isShowing ? 'Đang chiếu' : 'Ngừng chiếu')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 10,
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 6,
    maxWidth: '48%', 
  },
  posterWrap: { width: 70, height: 100 },
  posterWrapTile: { width: '100%', height: undefined, aspectRatio: 2 / 3 },
  poster: { width: '100%', height: '100%' },

});

export default React.memo(MovieCard);
