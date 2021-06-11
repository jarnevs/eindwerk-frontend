import { axiosAuth } from '@/services/axios-config';

export interface Post {
  id: string;
  message: string;
  artist: { 
    id: string,
    artistName: string,
  };
  user: {
    id: string,
    firstname: string,
    lastname: string,
  };
  parentId: string;
  createdOn: number;
}

const getPost = async (id: string) => {
  const { data } = await axiosAuth().get(`/posts/${id}`);
  return data;
}

const getComments = async (parentId: string) => {
  const { data } = await axiosAuth().get(`/posts/comments/${parentId}`);
  return data;
}

const getPostsArtist = async (artistId: string) => {
  const { data } = await axiosAuth().get(`/posts/artist/${artistId}`);
  return data;
}

const createPost = async(post: { message: string, artistId:string }, parentId?: string) => {
  const { data } = await axiosAuth().post(
    `/posts/${ parentId ? parentId : '' }`,
    post,
  )
  return data;
}

const likePost = async(postId: string) => {
  const { data } = await axiosAuth().patch(
    `/posts/like/${postId}`,
  )
  return data;
}

export {
  getPost,
  getPostsArtist,
  createPost,
  getComments,
  likePost,
}