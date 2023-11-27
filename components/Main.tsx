'use client'

import { useSidebarCtx } from '@/contexts/SidebarContext';
import {
  Box,
} from '@chakra-ui/react';

export default function Main({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    isOpen: isSidebarOpen,
    widthSidebar,
  } = useSidebarCtx();

  return (
    <Box
      position={{
        base: 'absolute',
        md: 'unset',
      }}
      w={{
        base: `calc(100% - ${widthSidebar.mobile})`,
        md: isSidebarOpen ? `calc(100% - ${widthSidebar.desktop})` : `calc(100% - ${widthSidebar.mobile})`,
      }}
      ml={{
        base: widthSidebar.mobile,
        md: 0,
      }}
    >
      {children}
    </Box>
  );
}