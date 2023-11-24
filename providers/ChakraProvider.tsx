'use client'

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

// toast default configuration
const toastOptions = {
  defaultOptions: {
    variant: 'left-accent',
    duration: 3000,
    isClosable: true
  }
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider toastOptions={toastOptions}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}