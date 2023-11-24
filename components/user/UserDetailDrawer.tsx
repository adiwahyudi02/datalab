import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  SkeletonText,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DeleteUserAlertDialog from './DeleteUserAlertDialog';
import { useGetUser } from '@/api/user/queries';
import { snakeToTitleCase } from '@/utils/helpers/convertTextCase';

interface IUserDetailDrawerProps {
  userId: string;
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
};

export default function UserDetailDrawer({
  userId,
  isOpenDrawer,
  onCloseDrawer,
}: IUserDetailDrawerProps) {
  const {
    data: user,
    isLoading: isLoadingUser,
  } = useGetUser(userId);

  const {
    isOpen: isOpenAlertDialog,
    onOpen: onOpenAlertDialog,
    onClose: onCloseAlertDialog,
  } = useDisclosure();

  return (
    <>
      <Drawer
        isOpen={isOpenDrawer}
        size="md"
        placement="right"
        onClose={onCloseDrawer}
        colorScheme="gray"
        variant="secondary"
      >
        <DrawerContent bg="ghostwhite">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={1}>
            <Heading size="lg">User Details</Heading>
            <Text fontSize="sm">
              This is inquiry about user with email: {user?.email}
            </Text>
          </DrawerHeader>

          <DrawerBody>
            {user && Object.entries(user).map(([key, value]) => (
              <Flex gap={1}>
                <Text w="40%">{snakeToTitleCase(key)}</Text>
                <Text w="60%">: {value}</Text>
              </Flex>
            ))}
            {isLoadingUser && (
              <SkeletonText mt='4' noOfLines={30} spacing='4' skeletonHeight='2' />
            )}
          </DrawerBody>

          <DrawerFooter
            justifyContent="space-between"
            borderTopWidth={1}
          >
            <Button
              variant="ghost"
              onClick={onCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onOpenAlertDialog}
            >
              Delete User
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DeleteUserAlertDialog
        isOpenAlertDialog={isOpenAlertDialog}
        onCloseAlertDialog={onCloseAlertDialog}
      />
    </>
  );
}