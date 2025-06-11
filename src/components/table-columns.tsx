import type { CellContext, ColumnDef, RowData } from '@tanstack/react-table';
import { EllipsisVertical, Text, Trash2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { formatDate } from '@/libs/format';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const TableColumns = <TData extends RowData, TValue = unknown>(
  columns: ColumnDef<TData, TValue>[],
  links: (info: CellContext<TData, TValue>) => React.ReactNode[],
  indexName = 'name',
): ColumnDef<TData, TValue>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    ...columns,
    {
      id: 'created_at',
      accessorKey: 'created_at',
      header: 'Created At',
      cell: (info) =>
        formatDate(info.getValue()?.toString(), {
          hour: 'numeric',
          minute: 'numeric',
        }),
      meta: {
        label: 'Created At',
        placeholder: 'Search Created At...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      id: 'updated_at',
      accessorKey: 'updated_at',
      header: 'Updated At',
      cell: (info) =>
        formatDate(info.getValue()?.toString(), {
          hour: 'numeric',
          minute: 'numeric',
        }),
      meta: {
        label: 'Updated At',
        placeholder: 'Search Updated At...',
        variant: 'text',
        icon: Text,
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: (info) => {
        const _links = links(info);

        return (
          <div className="inline-flex items-center divide-x border rounded overflow-hidden">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-muted rounded-none"
                  asChild
                >
                  {_links[0]}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-muted rounded-none cursor-pointer"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {info.row.getValue(indexName)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {links(info)
                  .splice(1)
                  .map((link, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <DropdownMenuItem key={i} asChild>
                      {link}
                    </DropdownMenuItem>
                  ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableHiding: false,
      meta: {
        label: 'Actions',
      },
    },
  ];
};
