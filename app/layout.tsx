import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider as ChakraProvider } from '@/providers/ChakraProvider';
import { Provider as QueryClientProvider } from '@/providers/QueryClientProvider';
import {
  Flex,
} from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';
import Navigation from '@/components/Navigation';
import Main from '@/components/Main';
import { SidebarProvider } from '@/contexts/SidebarContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'delman.io | Adi',
  description: 'Empower Your Business Through Data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <QueryClientProvider>
            <SidebarProvider>
              <Navigation />
              <Flex>
                <Sidebar />
                <Main>
                  {children}
                </Main>
              </Flex>
            </SidebarProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </body>
    </html >
  );
};
