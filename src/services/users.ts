import { axiosNoAuth } from '@/services/axios-config';

const registerUser = async (data: 
  {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  }): Promise<any> => {
  const { data: userData } = await axiosNoAuth.post(
    '/users/register',
    data,
  );
  
  console.log(userData);

  return userData;
};

const loginUser = async(data: 
  {
    username: string, 
    password: string
  }): Promise<any> => {
  const  result =  await axiosNoAuth.post(
    '/auth/login',
    data,  
  );

  console.log(result);
  return result;
}

export {
  registerUser,
  loginUser,
};
