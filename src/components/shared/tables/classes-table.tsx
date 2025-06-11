import { Eye, Pencil, Text } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import {
  IconCalendarWeek,
  IconSchool,
  IconUsersGroup,
} from '@tabler/icons-react';
import { createSerializer } from 'nuqs';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { TableColumns } from '@/components/table-columns';
import { getFiltersStateParser } from '@/libs/parsers';
import { url } from '@/libs/utils';
import { Degree, type Class } from '@/types';
import { Badge } from '@/components/ui/badge';

const searchParams = {
  filters: getFiltersStateParser(),
};

const serialize = createSerializer(searchParams);

const columns = TableColumns<Class.WithRelations.Type>(
  [
    {
      id: 'id',
      accessorKey: 'id',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: (info) => info.getValue(),
      size: 65,
      meta: {
        label: 'ID',
        placeholder: 'Search IDs...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'title',
      accessorKey: 'title',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: (info) => info.getValue(),
      meta: {
        label: 'Title',
        placeholder: 'Search Titles...',
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
        label: 'Degree Level',
        placeholder: 'Search Degree Levels...',
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
      cell: (info) => info.row.original.groups.length,
    },
    {
      id: 'students',
      accessorKey: 'students',
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Students" />
      ),
      cell: (info) => info.row.original.students.length,
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
        value: info.row.getValue('id')?.toString() ?? '',
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
    <Link
      key="/schedules"
      to={url(serialize, '/schedules', {
        id: 'class_id',
        value: info.row.getValue('id')?.toString() ?? '',
      })}
    >
      <IconCalendarWeek /> Schedules
    </Link>,
  ],
  'title',
);

const ClassesTable = ({ data }: { data?: Class.WithRelations.List }) => {
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

export default ClassesTable;
