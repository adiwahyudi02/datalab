import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

interface IUserCardProps {
  onClickView: () => void;
};

export default function UserCard({
  onClickView,

}: IUserCardProps) {
  return (
    <Card
      h="60"
      mt={7}
      border="1px solid"
      borderColor="gray.200"
    >
      <CardBody>
        <Flex
          h="full"
          direction="column"
          align="center"
          justify="center"
          gap={3}
        >
          <Heading size="lg">Monique Erdman</Heading>
          <Text fontSize="sm" color="gray.500">
            jerrod14@yahoo.com
          </Text>
          <Divider w="60" borderColor="gray.400" />
          <Button
            colorScheme="blue"
            onClick={onClickView}
          >
            View User Profile
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}