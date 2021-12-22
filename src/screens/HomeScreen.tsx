import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {GradientBackground} from '../components/GradientBackground';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {getImageColors} from '../helpers/getImageColors';
import {GradienContext} from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading, error} =
    useMovies();
  const {top} = useSafeAreaInsets();
  const {setCurrentColors} = useContext(GradienContext);

  const getPosterColors = async (slideIndex: number) => {
    const movie = nowPlaying[slideIndex];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);
    setCurrentColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {nowPlaying.length > 0 && (
            <View style={styles.carousel}>
              <Carousel
                data={nowPlaying}
                renderItem={({item}: any) => <MoviePoster movie={item} />}
                sliderWidth={windowWidth}
                itemWidth={300}
                inactiveSlideOpacity={1}
                onSnapToItem={slideIndex => getPosterColors(slideIndex)}
              />
            </View>
          )}

          {popular.length > 0 && (
            <HorizontalSlider title="Popular" movies={popular} />
          )}

          {topRated.length > 0 && (
            <HorizontalSlider title="Top Rated" movies={topRated} />
          )}

          {upcoming.length > 0 && (
            <HorizontalSlider title="Upcoming" movies={upcoming} />
          )}

          {isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator color="grey" size={35} />
            </View>
          )}

          {error && (
            <View>
              <Text>{error}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: 440,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
