import { Eye, Pencil, Text } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { TableColumns } from '@/components/table-columns';
import { Schedule } from '@/types';
import { Badge } from '@/components/ui/badge';
import { SchedulesTableActionBar } from '../action-bars/schedules-table-action-bar';
import { formatDate } from '@/libs/format';

const columns = TableColumns<Schedule.WithRelations.Type>(
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
      id: 'experiment_id',
      accessorKey: 'experiment_id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Experiment" />
      ),
      cell: (info) => (
        <Link
          to="/experiments/$id"
          params={{ id: info.row.original.experiment.id.toString() }}
        >
          <Badge>{info.row.original.experiment.name}</Badge>
        </Link>
      ),
      meta: {
        label: 'Experiment ID',
        placeholder: 'Search Experiment ID...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'class_id',
      accessorKey: 'class_id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Class" />
      ),
      cell: (info) => (
        <Link
          to="/classes/$id"
          params={{ id: info.row.original.class.id.toString() }}
        >
          <Badge>{info.row.original.class.title}</Badge>
        </Link>
      ),
      meta: {
        label: 'Class ID',
        placeholder: 'Search Class ID...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'group_id',
      accessorKey: 'group_id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Group" />
      ),
      cell: (info) => (
        <Link
          to="/groups/$id"
          params={{ id: info.row.original.group.id.toString() }}
        >
          <Badge>{info.row.original.group.name}</Badge>
        </Link>
      ),
      meta: {
        label: 'Group ID',
        placeholder: 'Search Group ID...',
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
      cell: (info) => <Badge>{Schedule.Status[info.getValue<number>()]}</Badge>,
      meta: {
        label: 'Status',
        placeholder: 'Search Status...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'start_at',
      accessorKey: 'start_at',
      header: 'Start At',
      cell: (info) =>
        formatDate(info.getValue()?.toString(), {
          hour: 'numeric',
          minute: 'numeric',
        }),
      meta: {
        label: 'Start At',
        placeholder: 'Search Start At...',
        variant: 'text',
        icon: Text,
      },
    },
  ],
  (info) => [
    <Link
      key="/schedules/$id"
      to="/schedules/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye />
    </Link>,
    <Link
      key="/schedules/$id"
      to="/schedules/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye /> View
    </Link>,
    <Link
      key="/schedules/$id/edit"
      to="/schedules/$id/edit"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Pencil /> Edit
    </Link>,
  ],
  'id',
);

const SchedulesTable = ({ data }: { data?: Schedule.WithRelations.List }) => {
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
      actionBar={(table) => <SchedulesTableActionBar table={table} />}
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default SchedulesTable;
