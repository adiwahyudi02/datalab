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
  name: string;
  email: string;
  onClickView: () => void;
};

export default function UserCard({
  name,
  email,
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
          <Heading size="lg">{name}</Heading>
          <Text fontSize="sm" color="gray.500">
            {email}
          </Text>
          <Divider w="60" borderColor="gray.400" />
          <Button
            colorScheme="blue"
            onClick={onClickView}
            role="view-detail-button"
          >
            View User Profile
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}