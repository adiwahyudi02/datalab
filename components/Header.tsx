import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

interface IHeaderProps {
  heading: string;
  description: string;
};

export default function Header({
  heading, description,
}: IHeaderProps) {
  return (
    <Box
      as="header"
      borderBottom="0.06rem solid lightgray"
      py={2}
      px={4}
    >
      <Heading size="lg">
        {heading}
      </Heading>
      <Text
        fontSize="sm"
        color="blue.500"
        fontWeight="500"
        mt={1}
      >
        {description}
      </Text>
    </Box>
  );
}