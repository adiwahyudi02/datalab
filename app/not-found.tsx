import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      as="main"
      textAlign="center"
      mt="5rem"
    >
      <Heading
        color="blue.600"
        mb="1rem"
      >
        Page Not Found
      </Heading>
      <Text>We could not find the page you were looking for.</Text>
      <Text>
        Go back to the
        <Link href="/">
          <Text as="span" color="blue.600"> Dashboard</Text>
        </Link>
      </Text>
    </Box>
  )
}