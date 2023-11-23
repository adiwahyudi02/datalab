import {
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react';

export default function Navigation() {
  return (
    <Box
      as="nav"
      position="relative"
      bg="white"
      boxShadow="gray 0rem 0.125rem 0.375rem -0.25rem"
      h={14}
      zIndex={20}
    >
      <Flex align="center" h="100%">
        <Heading
          size="sm"
          fontWeight="bold"
          ml={12}
        >
          delman.io
        </Heading>
      </Flex>
    </Box>
  );
}