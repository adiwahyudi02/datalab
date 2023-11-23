import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DeleteUserAlertDialog from './DeleteUserAlertDialog';

interface IUserDetailDrawerProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
};

export default function UserDetailDrawer({
  isOpenDrawer,
  onCloseDrawer,
}: IUserDetailDrawerProps) {
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
              This is inquiry about user with email: jerrod14@yahoo.com
            </Text>
          </DrawerHeader>

          <DrawerBody>
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