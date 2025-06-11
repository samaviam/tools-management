import { Link } from '@tanstack/react-router';
import { Check, Eye, Pencil, Text, X } from 'lucide-react';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { ExperimentsTableActionBar } from '../action-bars/experiments-table-action-bar';
import { TableColumns } from '@/components/table-columns';
import { Degree, type Experiment } from '@/types';
import { Badge } from '@/components/ui/badge';

const columns = TableColumns<Experiment.Item.Type>(
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
      size: 65,
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
      id: 'degree',
      accessorKey: 'degree',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Degree Level" />
      ),
      cell: (info) => <Badge>{Degree[info.getValue<number>()]}</Badge>,
      meta: {
        label: 'Degree',
        placeholder: 'Search Degree Levels...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'has_broken_tools',
      accessorKey: 'has_broken_tools',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Has broken tools" />
      ),
      cell: (info) =>
        info.getValue() ? (
          <Badge className="[&>svg]:size-3 p-0.5 aspect-square rounded-2xl">
            <Check />
          </Badge>
        ) : (
          <Badge className="[&>svg]:size-3 p-0.5 aspect-square rounded-2xl">
            <X />
          </Badge>
        ),
      meta: {
        label: 'Has Broken Tools',
        placeholder: 'Search Has Broken Tools...',
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
      cell: (info) =>
        info.getValue() ? (
          <Badge className="[&>svg]:size-3 p-0.5 aspect-square rounded-2xl">
            <Check />
          </Badge>
        ) : (
          <Badge className="[&>svg]:size-3 p-0.5 aspect-square rounded-2xl">
            <X />
          </Badge>
        ),
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

const ExperimentsTable = ({ data }: { data?: Experiment.List }) => {
  return data && data.length >= 0 ? (
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
