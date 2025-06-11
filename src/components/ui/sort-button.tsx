import type { Column } from '@tanstack/react-table';
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from './button';

interface IProps extends React.PropsWithChildren {
  dataType: 'string' | 'number';
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  column: Column<any, unknown>;
}

const SortButton = ({ dataType, column, children }: IProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      {column.getIsSorted() === 'asc' ? (
        dataType === 'string' ? (
          <ArrowDownAZ className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown01 className="ml-2 h-4 w-4" />
        )
      ) : column.getIsSorted() === 'desc' ? (
        dataType === 'string' ? (
          <ArrowDownZA className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown10 className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export default SortButton;
