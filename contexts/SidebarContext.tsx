'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  createContext,
  ReactNode,
  useContext,
} from 'react'

type SidebarContextType = {
  isOpen: boolean;
  onToggleSidebar: () => void;
  widthSidebar: {
    mobile: string;
    desktop: string;
  }
}

type SidebarProviderPropsType = {
  children: ReactNode
}

const SidebarContext = createContext<SidebarContextType>(null!)

const SidebarProvider = ({ children }: SidebarProviderPropsType) => {

  const {
    value: isOpen,
    setValue: setIsOpen,
  } = useLocalStorage('sidebar', false);

  const onToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const widthSidebar = {
    mobile: '3.8rem',
    desktop: '15rem',
  }

  const value = {
    isOpen,
    onToggleSidebar,
    widthSidebar,
  }

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

const useSidebarCtx = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export { SidebarProvider, useSidebarCtx }
