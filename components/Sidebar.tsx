'use client'

import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiMenuAlt2, HiUsers } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserPlus, FaSearch } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useSidebarCtx } from '@/contexts/SidebarContext';

const menu = [
  {
    href: '/',
    title: 'Dashboard',
    icon: MdSpaceDashboard,
  },
  {
    href: '/users',
    title: 'Users',
    icon: HiUsers,
  },
  {
    href: '/register',
    title: 'Registration',
    icon: FaUserPlus,
  },
  {
    href: '/search',
    title: 'Search',
    icon: FaSearch,
  },
];

export default function Sidebar() {
  const pathName = usePathname();
  const {
    isOpen,
    onToggleSidebar,
    widthSidebar,
  } = useSidebarCtx();

  return (
    <Box
      as="aside"
      w={widthSidebar.desktop}
      minH="calc(100vh - 3.5rem)"
      bg="ghostwhite"
      boxShadow="gray 0.25rem 0 0.25rem -0.3rem"
      overflowX="hidden"
      flexShrink={0}
      zIndex={10}
      {...(!isOpen) && {
        w: widthSidebar.mobile,
      }}
      role="sidebar"
    >
      <Button
        variant="unstyled"
        display="block"
        w="100%"
        h="max-content"
        borderRadius={0}
        px={6}
        py={5}
        _hover={{
          bg: 'blackAlpha.100',
          transition: '0.3s',
        }}
        onClick={onToggleSidebar}
        role="sidebar-button"
      >
        <Flex
          align="center"
          gap={4}
        >
          <Icon as={HiMenuAlt2} boxSize={5} />
          <Text fontSize="sm" fontWeight="500">Menu</Text>
        </Flex>
      </Button>

      {menu.map(item => (
        <NextLink href={item.href} key={item.href}>
          <Tooltip
            hasArrow
            label={item.title}
            bg="gray.200"
            color="black"
            placement="right"
            isDisabled={isOpen}
          >
            <Flex
              align="center"
              gap={4}
              px={6}
              py={5}
              _hover={{
                bg: 'blackAlpha.100',
                transition: '0.3s',
              }}
              {...(item.href === pathName) && {
                borderLeft: '0.25rem solid',
                borderColor: 'blue.600',
                color: 'blue.600',
                bg: 'blackAlpha.100',
              }}
            >
              <Icon
                as={item.icon}
                boxSize={5}
              />
              <Text
                fontSize="sm"
                fontWeight="500"
              >
                {item.title}
              </Text>
            </Flex>
          </Tooltip>
        </NextLink>
      ))}
    </Box >
  );
}