import {useEffect, useState} from 'react';
import {movieDB} from '../api/movieDB';
import {Cast, CreditsResponse} from '../interfaces/credits.interface';
import {FullMovie} from '../interfaces/movie.interface';

interface MovieDetailsState {
  fullMovie?: FullMovie;
  cast: Cast[];
}

export const useMovieDetails = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [movieDetailsState, setMovieDetailsState] = useState<MovieDetailsState>(
    {
      fullMovie: undefined,
      cast: [],
    },
  );

  const getMovieDetails = async () => {
    try {
      const movieDetailsPromise = movieDB.get<FullMovie>(`/${id}`);
      const castPromise = movieDB.get<CreditsResponse>(`/${id}/credits`);

      const response = await Promise.all([movieDetailsPromise, castPromise]);

      setMovieDetailsState({
        fullMovie: response[0].data,
        cast: response[1].data.cast,
      });

      setError(null);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {...movieDetailsState, isLoading, error};
};
