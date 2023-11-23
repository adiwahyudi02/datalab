'use client'

import Header from '@/components/Header';
import {
  Box,
} from '@chakra-ui/react';

export default function Sales() {
  return (
    <>
      <Header
        heading="Sales Dashboard"
        description="List of Sales Data"
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
