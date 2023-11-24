'use client'

import {
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import debounce from 'lodash.debounce';
import UserCard from '@/components/user/UserCard';
import UserDetailDrawer from '@/components/user/UserDetailDrawer';
import { useGetUsers } from '@/api/user/queries';
import { useEffect, useState } from 'react';
import { TUser } from '@/api/user/types';

export default function Search() {
  const { data: users } = useGetUsers();

  const [usersFiltered, setUsersFiltered] = useState<TUser[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [userId, setUserId] = useState('');
  const [searchTemp, setSearchTemp] = useState('');

  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const handleSearch = (val: string) => {
    if (val) {
      const filterByEmail = users?.filter(user => user.email.includes(val)).slice(0, 2);
      setUsersFiltered(filterByEmail || []);
    } else {
      setUsersFiltered([]);
    }

    setSearchTemp(val);
    if (val) setIsSearched(true);
    else setIsSearched(false);
  };

  const debounceHandleSearch = debounce((val: string) => handleSearch(val), 400);

  const handleGetDetails = (id: string) => {
    setUserId(id);
    onOpenDrawer();
  };

  // call handle search when users change
  useEffect(() => {
    handleSearch(searchTemp);
  }, [users]);


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
          onSearch={debounceHandleSearch}
          searchOnChange
        />

        {!!usersFiltered.length && usersFiltered.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            onClickView={() => handleGetDetails(user.id)}
          />
        ))}

        {!usersFiltered.length && isSearched && (
          <Text
            align="center"
            fontWeight="bold"
            fontSize="sm"
            my={10}
          >
            User not found
          </Text>
        )}

        {userId && (
          <UserDetailDrawer
            isOpenDrawer={isOpenDrawer}
            onCloseDrawer={onCloseDrawer}
            userId={userId}
          />
        )}
      </Box>
    </>
  )
}
