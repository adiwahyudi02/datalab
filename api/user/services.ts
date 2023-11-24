import { fetcher } from '@/utils/helpers/fetcher';
import { TUser } from './types';

export const getUsers = async (): Promise<TUser[]> => {
  const { data: { data: users } } = await fetcher.get('/users');
  return users;
};
