'use client'

import { useGetSales } from '@/api/sales/queries';
import Header from '@/components/Header';
import {
  Box,
} from '@chakra-ui/react';
import { Table } from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { TSales } from '@/api/sales/types';

const columns: ColumnDef<TSales>[] = [
  {
    header: 'id',
    accessorKey: 'id',
    meta: {
      style: {
        textAlign: 'right'
      }
    },
  },
  {
    header: 'name',
    accessorKey: 'name'
  },
  {
    header: 'sales_id',
    accessorKey: 'sales_id',
  },
  {
    header: 'item_id',
    accessorKey: 'item_id',
    meta: {
      style: {
        textAlign: 'right'
      }
    },
  },
  {
    header: 'qty',
    accessorKey: 'qty',
    meta: {
      style: {
        textAlign: 'right'
      }
    },
  },
  {
    header: 'consumen_name',
    accessorKey: 'consumen_name'
  },
  {
    header: 'transaction_date',
    accessorKey: 'transaction_date'
  },
];

export default function Sales() {
  const { data: sales, isLoading } = useGetSales();

  return (
    <>
      <Header
        heading="Sales Dashboard"
        description="List of Sales Data"
      />
      <Box
        as="main"
        p={6}
      >
        <Table
          data={sales || []}
          columns={columns}
          maxWidth="100%"
          maxHeight="700px"
          isLoading={isLoading}
        />
      </Box>
    </>
  )
}
