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
} from '@chakra-ui/react';

interface IUserDetailDrawerProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
};

export default function UserDetailDrawer({
  isOpenDrawer,
  onCloseDrawer,
}: IUserDetailDrawerProps) {
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
            >
              Delete User
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}