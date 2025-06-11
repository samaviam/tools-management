import { Link } from '@tanstack/react-router';
import { Eye, Pencil, Text, View } from 'lucide-react';
import DataTable from '@/components/ui/data-table';
import { TableColumns } from '@/components/table-columns';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import type { Student } from '@/types';
import { Badge } from '@/components/ui/badge';

const columns = TableColumns<Student.WithRelations.Type>(
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
      cell: (info) =>
        info.row.original.group ? (
          <Link
            to="/groups/$id"
            params={{ id: info.row.original.group.id.toString() }}
          >
            <Badge>{info.row.original.group.name}</Badge>
          </Link>
        ) : null,
      meta: {
        label: 'Group ID',
        placeholder: 'Search Group ID...',
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
      id: 'national_id',
      accessorKey: 'national_id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="National ID" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'National ID',
        placeholder: 'Search National IDs...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'student_id',
      accessorKey: 'student_id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student ID" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Student ID',
        placeholder: 'Search Student IDs...',
        variant: 'text',
        icon: Text,
      },
    },
  ],
  (info) => [
    <Link
      key="/students/$id"
      to="/students/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye />
    </Link>,
    <Link
      key="/students/$id"
      to="/students/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <View /> View
    </Link>,
    <Link
      key="/students/$id/edit"
      to="/students/$id/edit"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Pencil /> Edit
    </Link>,
  ],
);

const StudentsTable = ({ data }: { data?: Student.WithRelations.List }) => {
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
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default StudentsTable;
