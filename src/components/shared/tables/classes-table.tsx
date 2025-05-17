import { Eye, Pencil, Text } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { IconSchool, IconUsersGroup } from '@tabler/icons-react';
import { createSerializer } from 'nuqs';
import DataTable from '../../ui/data-table';
import { DataTableColumnHeader } from '../../data-table/data-table-column-header';
import { DataTableSkeleton } from '../../data-table/data-table-skeleton';
import type { UseClassesQuery } from '@/queries/classes/use-classes-query';
import { TableColumns } from '@/components/table-columns';
import { getFiltersStateParser } from '@/libs/parsers';
import { url } from '@/libs/utils';

type Class = {
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

const searchParams = {
  filters: getFiltersStateParser(),
};

const serialize = createSerializer(searchParams);

const columns = TableColumns<Class, UseClassesQuery.Class>(
  [
    {
      id: 'id',
      accessorKey: 'id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: (info) => info.getValue(),
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
      meta: {
        label: 'Name',
        placeholder: 'Search Names...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'groups',
      accessorKey: 'groups',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Groups" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Groups',
        placeholder: 'Search Groups...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'students',
      accessorKey: 'students',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Students" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Students',
        placeholder: 'Search Students...',
        variant: 'text',
        icon: Text,
      },
    },
  ],
  (info) => [
    <Link
      key="/classes/$id"
      to="/classes/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye />
    </Link>,
    <Link
      key="/classes/$id"
      to="/classes/$id"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Eye /> View
    </Link>,
    <Link
      key="/classes/$id/edit"
      to="/classes/$id/edit"
      params={{ id: info.row.getValue('id') || '' }}
    >
      <Pencil /> Edit
    </Link>,
    <Link
      key="/groups"
      to={url(serialize, '/groups', {
        id: 'class_id',
        value: info.row.getValue('id'),
      })}
    >
      <IconUsersGroup /> Groups
    </Link>,
    <Link
      key="/students"
      to={url(serialize, '/students', {
        id: 'class_id',
        value: info.row.getValue('id')?.toString() ?? '',
      })}
    >
      <IconSchool /> Students
    </Link>,
  ],
);

const ClassesTable = ({ data }: { data?: UseClassesQuery.Class[] }) => {
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

export default ClassesTable;
