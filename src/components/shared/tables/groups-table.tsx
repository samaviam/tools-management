import { Eye, Pencil, Text } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import DataTable from '../ui/data-table';
import type { UseToolsQuery } from '@/queries/tools/use-tools-query';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { DataTableSkeleton } from '../data-table/data-table-skeleton';
import { GroupsTableActionBar } from './groups-table-action-bar';
import { TableColumns } from '../table-columns';

type Group = {
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

const columns = TableColumns<Group, UseToolsQuery.Tool>(
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
      id: 'members',
      accessorKey: 'members',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Members" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Members',
        placeholder: 'Search Members...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'experiments',
      accessorKey: 'experiments',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Experiments" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Experiments',
        placeholder: 'Search Experiments...',
        variant: 'text',
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

const GroupsTable = ({ data }: { data?: UseToolsQuery.Tool[] }) => {
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
      actionBar={(table) => <GroupsTableActionBar table={table} />}
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default GroupsTable;
