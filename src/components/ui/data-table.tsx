import {
  type ColumnDef,
  getSortedRowModel,
  type InitialTableState,
  type Table,
} from '@tanstack/react-table';
import { match } from 'ts-pattern';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '../data-table/data-table';
import { DataTableSortList } from '../data-table/data-table-sort-list';
import { DataTableAdvancedToolbar } from '../data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '../data-table/data-table-filter-list';
import Fuse from 'fuse.js';
import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { getFiltersStateParser } from '@/libs/parsers';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialState?: InitialTableState;
  actionBar?: (table: Table<TData>) => React.ReactNode;
}

const DataTableUI = <TData, TValue>({
  data,
  columns,
  initialState,
  actionBar,
}: DataTableProps<TData, TValue>) => {
  const filterable = columns
    .filter((column) => column.enableColumnFilter)
    .map((column) => column.id) as string[];
  const fuse = new Fuse(data, {
    useExtendedSearch: true,
    includeScore: true,
    threshold: 0.1,
    keys: filterable,
  });
  const [filters] = useQueryState(
    'filters',
    getFiltersStateParser().withDefault([]).withOptions({
      clearOnDefault: true,
      shallow: false,
    }),
  );

  const filtered = useMemo(() => {
    if (filters.length === 0) {
      return data;
    }

    return fuse
      .search({
        $and: filters.map((filter) => {
          const value = match(filter.operator)
            .with('iLike', () => `'${filter.value}`)
            .with('notILike', () => `!${filter.value}`)
            .with('eq', () => `=${filter.value}`)
            .with('ne', () => `!^${filter.value}`)
            .with('isEmpty', () => `=""`)
            .with('isNotEmpty', () => `!""`)
            .otherwise(() => filter.value);

          return { [filter.id]: value };
        }),
      })
      .map((search) => search.item);
  }, [filters]);

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: filtered,
    columns,
    shallow: false,
    clearOnDefault: true,
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => (row as { id: string }).id,
    initialState: {
      ...initialState,
      columnPinning: { right: ['actions'] },
      sorting: [
        { id: 'created_at' as Extract<keyof TData, string>, desc: true },
      ],
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  return (
    <DataTable table={table} actionBar={actionBar?.(table)}>
      <DataTableAdvancedToolbar table={table}>
        <DataTableFilterList
          table={table}
          shallow={shallow}
          debounceMs={debounceMs}
          throttleMs={throttleMs}
        />
        <DataTableSortList table={table} />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
};

export default DataTableUI;
