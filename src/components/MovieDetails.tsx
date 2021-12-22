import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Cast} from '../interfaces/credits.interface';
import {FullMovie} from '../interfaces/movie.interface';
import {CastItem} from './CastItem';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  fullMovie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({fullMovie, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text style={{marginHorizontal: 5}}>{fullMovie.vote_average}</Text>
          <Text>- {fullMovie.genres.map(genre => genre.name).join(', ')}</Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 18}}>{fullMovie.overview}</Text>
        <View style={{marginTop: 20}}>
          <FlatList
            data={cast}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <CastItem actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: 10}}
          />
        </View>
      </View>
    </>
  );
};
