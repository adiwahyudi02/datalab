import { useQuery } from '@tanstack/react-query';
import { getSales } from './services';

export const useGetSales = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: getSales
  });
};