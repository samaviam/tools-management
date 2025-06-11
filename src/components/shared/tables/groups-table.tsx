import { Eye, Pencil, Text } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { GroupsTableActionBar } from '../action-bars/groups-table-action-bar';
import { TableColumns } from '@/components/table-columns';
import type { Group } from '@/types';
import { Badge } from '@/components/ui/badge';

const columns = TableColumns<Group.WithRelations.Type>(
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
      id: 'members',
      accessorKey: 'members',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Members" />
      ),
      cell: (info) =>
        info.row.original.students.map((student) => (
          <Link
            key={student.id}
            to="/students/$id"
            params={{ id: student.id.toString() }}
          >
            <Badge>{student.name}</Badge>
          </Link>
        )),
      meta: {
        label: 'Members',
        placeholder: 'Search Members...',
        variant: 'text',
        icon: Text,
        cellClassName:
          'flex items-center justify-center flex-wrap gap-1 max-w-40',
      },
    },
  ],
  (info) => [
    <Link
      key="/groups/$id"
      to="/groups/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye />
    </Link>,
    <Link
      key="/groups/$id"
      to="/groups/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye /> View
    </Link>,
    <Link
      key="/groups/$id/edit"
      to="/groups/$id/edit"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Pencil /> Edit
    </Link>,
  ],
);

const GroupsTable = ({ data }: { data?: Group.WithRelations.List }) => {
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
      actionBar={(table) => <GroupsTableActionBar table={table} />}
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default GroupsTable;
