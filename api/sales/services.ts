import { fetcher } from '@/utils/helpers/fetcher';
import { TSales } from './types';

export const getSales = async (): Promise<TSales[]> => {
  const { data: { data: sales } } = await fetcher.get('/');
  return sales;
};
