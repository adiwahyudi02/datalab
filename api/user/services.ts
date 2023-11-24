import { fetcher } from '@/utils/helpers/fetcher';
import { TUser } from './types';

type TReqPostUser = {
  name: string;
  email: string;
};

type TReqDeleteUser = {
  id: string;
  name: string;
  email: string;
};

export const getUsers = async (): Promise<TUser[]> => {
  const { data: { data: users } } = await fetcher.get('/users');
  return users;
};

export const getUser = async (id: string): Promise<TUser> => {
  const { data: { data: user } } = await fetcher.get(`/users/${id}`);
  return user;
};

export const postUser = async (payload: TReqPostUser): Promise<TUser> => {
  const { data: { data: user } } = await fetcher.post('/users', payload);
  return user;
};

export const deleteUser = async (payload: TReqDeleteUser): Promise<TUser> => {
  const { data: { data: user } } = await fetcher.delete(`/users/${payload.id}`, {
    data: payload,
  });
  return user;
};