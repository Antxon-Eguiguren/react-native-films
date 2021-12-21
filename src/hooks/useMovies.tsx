import {useEffect, useState} from 'react';
import {movieDB} from '../api/movieDB';
import {Movie, MoviesResponse} from '../interfaces/movie.interface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getMovies = async () => {
    try {
      const nowPlayingPromise = movieDB.get<MoviesResponse>('/now_playing');
      const popularPromise = movieDB.get<MoviesResponse>('/popular');
      const topRatedPromise = movieDB.get<MoviesResponse>('/top_rated');
      const upcomingPromise = movieDB.get<MoviesResponse>('/upcoming');

      const response = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

      setMoviesState({
        nowPlaying: response[0].data.results,
        popular: response[1].data.results,
        topRated: response[2].data.results,
        upcoming: response[3].data.results,
      });

      setError(null);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {...moviesState, isLoading, error};
};
