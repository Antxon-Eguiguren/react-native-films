import axios from 'axios';

export const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'a9dc3edf4f46a32b685815a53ecd74eb',
  },
});
