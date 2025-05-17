import { Link } from '@tanstack/react-router';
import { Eye, Pencil, Text } from 'lucide-react';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '../../data-table/data-table-column-header';
import { DataTableSkeleton } from '../../data-table/data-table-skeleton';
import type { UseExperimentsQuery } from '@/queries/experiments/use-experiments-query';
import { ExperimentsTableActionBar } from '../action-bars/experiments-table-action-bar';
import { TableColumns } from '@/components/table-columns';

type Experiment = {
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

const columns = TableColumns<Experiment, UseExperimentsQuery.Experiment>(
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
      id: 'tools',
      accessorKey: 'tools',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tools" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Tools',
        placeholder: 'Search Tools...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Status',
        placeholder: 'Search Status...',
        variant: 'text',
        icon: Text,
      },
    },
  ],
  (info) => [
    <Link
      key="/experiments/$id"
      to="/experiments/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye />
    </Link>,
    <Link
      key="/experiments/$id"
      to="/experiments/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye /> View
    </Link>,
    <Link
      key="/experiments/$id/edit"
      to="/experiments/$id/edit"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Pencil /> Edit
    </Link>,
  ],
);

const ExperimentsTable = ({
  data,
}: { data?: UseExperimentsQuery.Experiment[] }) => {
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
      actionBar={(table) => <ExperimentsTableActionBar table={table} />}
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default ExperimentsTable;
