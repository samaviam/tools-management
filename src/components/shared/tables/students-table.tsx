import { Link } from '@tanstack/react-router';
import { Eye, Pencil, Text, View } from 'lucide-react';
import DataTable from '../../ui/data-table';
import { TableColumns } from '@/components/table-columns';
import { DataTableColumnHeader } from '../../data-table/data-table-column-header';
import { DataTableSkeleton } from '../../data-table/data-table-skeleton';

type Tool = {
  id: string;
};

const columns = TableColumns<Tool>(
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
    {
      id: 'class_id',
      accessorKey: 'class_id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Class ID" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Class ID',
        placeholder: 'Search Class ID...',
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
      <View /> View
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

const StudentsTable = ({ data }: { data?: any[] }) => {
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
    />
  ) : (
    <DataTableSkeleton columnCount={columns.length} />
  );
};

export default StudentsTable;
