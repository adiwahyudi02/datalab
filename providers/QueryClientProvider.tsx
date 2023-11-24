'use client'

import React, { useState } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useToast } from '@chakra-ui/react';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const [client] = useState(new QueryClient({
    queryCache: new QueryCache({
      onError: (error) =>
        toast({
          title: error.message,
          status: 'error',
        })
    }),
  }));

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        {children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}