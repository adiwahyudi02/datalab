import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface IDeleteUserAlertDialogProps {
  isOpenAlertDialog: boolean;
  isDeletting: boolean;
  onCloseAlertDialog: () => void;
  onDelete: () => void;
};

export default function DeleteUserAlertDialog({
  isOpenAlertDialog,
  onCloseAlertDialog,
  onDelete,
  isDeletting,
}: IDeleteUserAlertDialogProps) {

  const cancelAlertDialogRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpenAlertDialog}
      leastDestructiveRef={cancelAlertDialogRef}
      onClose={onCloseAlertDialog}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            borderBottomWidth={1}
          >
            Delete User
          </AlertDialogHeader>

          <AlertDialogBody h={32}>
            <Text>
              Are you sure? You can't undo this action afterwards.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter borderTopWidth={1}>
            <Button
              size="sm"
              ref={cancelAlertDialogRef}
              onClick={onCloseAlertDialog}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              ml={3}
              onClick={onDelete}
              isLoading={isDeletting}
              loadingText="Deletting"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}