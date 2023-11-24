import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, postUser } from './services';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });
};

export const useRegisterUser = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      toast({
        title: 'User created',
        status: 'success',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // get error message to get email validation
        toast({
          title: error.response?.data.message,
          status: 'error',
        });
      } else {
        toast({
          title: error.message,
          status: 'error',
        });
      }
    }
  });
};