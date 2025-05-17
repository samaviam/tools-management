import { Eye, Pencil, Text } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import DataTable from '../../ui/data-table';
import type { UseToolsQuery } from '@/queries/tools/use-tools-query';
import { DataTableColumnHeader } from '../../data-table/data-table-column-header';
import { DataTableSkeleton } from '../../data-table/data-table-skeleton';
import { ToolsTableActionBar } from '../action-bars/tools-table-action-bar';
import { TableColumns } from '@/components/table-columns';

type Tool = {
  id: number;
  serial_code: string;
  name: string;
  brand: string;
  accuracy: string;
  range: string;
  serial_number: string;
  property_code: string;
  quantity: number;
  description: string;
  created_at: string;
  updated_at: string;
};

const columns = TableColumns<Tool, UseToolsQuery.Tool>(
  [
    {
      id: 'id',
      accessorKey: 'id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: (info) => info.getValue(),
      enableHiding: false,
      meta: {
        label: 'ID',
        placeholder: 'Search IDs...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'name',
      accessorKey: 'name',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: (info) => info.getValue(),
      enableHiding: false,
      meta: {
        label: 'Name',
        placeholder: 'Search Names...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'serial_code',
      accessorKey: 'serial_code',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Serial Code" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Serial Code',
        placeholder: 'Search Serial Codes...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'brand',
      accessorKey: 'brand',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Brand" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Brand',
        placeholder: 'Search Brands...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'accuracy',
      accessorKey: 'accuracy',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accuracy" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'accuracy',
        placeholder: 'Search Accuracys...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'range',
      accessorKey: 'range',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Range" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Range',
        placeholder: 'Search Ranges...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'serial_number',
      accessorKey: 'serial_number',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Serial Number" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Serial Number',
        placeholder: 'Search Serial Numbers...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'property_code',
      accessorKey: 'property_code',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Property Code" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Property Code',
        placeholder: 'Search Property Codes...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'quantity',
      accessorKey: 'quantity',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Quantity',
        placeholder: 'Search Quantities...',
        variant: 'number',
        icon: Text,
      },
    },
  ],
  (info) => [
    <Link
      key="/tools/$id"
      to="/tools/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye />
    </Link>,
    <Link
      key="/tools/$id"
      to="/tools/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye /> View
    </Link>,
    <Link
      key="/tools/$id/edit"
      to="/tools/$id/edit"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Pencil /> Edit
    </Link>,
  ],
);

const ToolsTable = ({ data }: { data?: UseToolsQuery.Tool[] }) => {
  return data?.length ? (
    <DataTable
      columns={columns}
      data={data}
      initialState={{
        columnVisibility: {
          created_at: false,
          updated_at: false,
        },
      }}
      actionBar={(table) => <ToolsTableActionBar table={table} />}
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default ToolsTable;
