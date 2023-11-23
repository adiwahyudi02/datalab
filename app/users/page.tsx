'use client'

import Header from '@/components/Header';
import {
  Box,
} from '@chakra-ui/react';

export default function Users() {
  return (
    <>
      <Header
        heading="Users Data"
        description="List of Users Data"
      />
      <Box
        as="main"
        maxW={96}
        p={6}
      >
      </Box>
    </>
  )
}
