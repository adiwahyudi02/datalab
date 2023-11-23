'use client'

import {
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import debounce from 'lodash.debounce';
import UserCard from '@/components/user/UserCard';
import UserDetailDrawer from '@/components/user/UserDetailDrawer';

export default function Search() {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const handleSearch = debounce((val: string) => {
    // handle logic here
  }, 1000);

  return (
    <>
      <Header
        heading="Search User"
        description="Search existing user"
      />
      <Box
        as="main"
        maxW="32rem"
        p={6}
      >
        <SearchInput
          placeholder="Search by email"
          onSearch={handleSearch}
          searchOnChange
        />
        <UserCard
          onClickView={onOpenDrawer}
        />
        <UserDetailDrawer
          isOpenDrawer={isOpenDrawer}
          onCloseDrawer={onCloseDrawer}
        />
      </Box>
    </>
  )
}
