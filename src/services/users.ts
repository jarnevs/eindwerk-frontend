import { axiosAuth, axiosNoAuth } from '@/services/axios-config';

interface Data {
  email: string,
  password: string,
  type: string,
}

interface UserData extends Data {
  title: string,
  lastname: string,
  firstname: string,
  phone: string,
}

interface ArtistData extends Data {
  artistName: string,
  genre: string,
  description: string,
}

const registerUser = async (data: UserData | ArtistData): Promise<any> => {
  const { data: userData } = await axiosNoAuth.post(
    '/users/register',
    data,
  );
  
  return userData;
};

const loginUser = async (data: 
  {
    username: string, 
    password: string
  }): Promise<any> => {
    const  { data: userData } =  await axiosNoAuth.post(
      '/auth/login',
      data,
    );

    return userData;
}

const getArtists = async () => {
  try {
    const { data } = await axiosAuth().get('/users/artists');
    return data;
  } catch(e) {
    return e.response;
  }
}

const getUser = async () => {
  try {
    const { data } = await axiosAuth().get('/users/profile');
    return data;
  } catch (e) {
    return e.response;
  }
}

const getUserFollowing = async() => {
   try {
    const { data } = await axiosAuth().get('/users/following');
    return data;
  } catch (e) {
    return e.response;
  }
}

const getArtist = async(artistId: string) => {
   try {
    const { data } = await axiosAuth().get(`/users/artists/${artistId}`);
    return data;
  } catch (e) {
    return e.response;
  }
}

const followArtist = async (artistId: string) => {
  const { data } = await axiosAuth().patch(
    '/users/follow',
    {
      artistId
    },
  );
  
  return data;
}

export {
  registerUser,
  loginUser,
  getArtists,
  getUser,
  getUserFollowing,
  followArtist,
  getArtist,
};
