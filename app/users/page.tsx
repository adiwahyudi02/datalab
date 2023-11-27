'use client'

import { useGetUsers } from '@/api/user/queries';
import Header from '@/components/Header';
import {
  Box,
} from '@chakra-ui/react';
import { Table } from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { TUser } from '@/api/user/types';

const columns: ColumnDef<TUser>[] = [
  {
    header: 'id',
    accessorKey: 'id',
  },
  {
    header: 'name',
    accessorKey: 'name'
  },
  {
    header: 'email',
    accessorKey: 'email'
  },
  {
    header: 'country_name',
    accessorKey: 'country_name'
  },
  {
    header: 'device_id',
    accessorKey: 'device_id'
  },
  {
    header: 'bitcoin_address',
    accessorKey: 'bitcoin_address'
  },
  {
    header: 'avatar',
    accessorKey: 'avatar'
  },
  {
    header: 'login_ip',
    accessorKey: 'login_ip'
  },
  {
    header: 'age',
    accessorKey: 'age'
  },
  {
    header: 'referral_id',
    accessorKey: 'referral_id'
  },
  {
    header: 'locale',
    accessorKey: 'locale'
  },
  {
    header: 'job',
    accessorKey: 'job'
  },
  {
    header: 'invoice_email_address',
    accessorKey: 'invoice_email_address'
  },
  {
    header: 'hmac_secret',
    accessorKey: 'hmac_secret'
  },
  {
    header: 'primary_color',
    accessorKey: 'primary_color'
  },
  {
    header: 'secondary_color',
    accessorKey: 'secondary_color'
  },
  {
    header: 'material',
    accessorKey: 'material'
  },
  {
    header: 'shipping_address',
    accessorKey: 'shipping_address'
  },
  {
    header: 'zip_code',
    accessorKey: 'zip_code'
  },
  {
    header: 'latitude',
    accessorKey: 'latitude'
  },
  {
    header: 'longitude',
    accessorKey: 'longitude'
  },
  {
    header: 'favorite_animal',
    accessorKey: 'favorite_animal'
  },
  {
    header: 'timezone',
    accessorKey: 'timezone'
  },
];

export default function Users() {
  const { data: users, isLoading } = useGetUsers();

  return (
    <>
      <Header
        heading="Users Data"
        description="List of Users Data"
      />
      <Box
        as="main"
        p={6}
      >
        <Table
          data={users || []}
          columns={columns}
          maxWidth="100%"
          maxHeight="700px"
          isLoading={isLoading}
        />
      </Box>
    </>
  )
}
