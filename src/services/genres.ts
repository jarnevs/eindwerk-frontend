import { axiosAuth } from '@/services/axios-config';

interface GenreData {
  id: string,
  name: string,
}

const getGenres = async () => {
  const { data } = await axiosAuth().get('/genres')

  return data;
}

export {
  getGenres,
}