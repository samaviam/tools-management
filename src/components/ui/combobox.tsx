import Fuse, { type IFuseOptions } from 'fuse.js';
import { Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { useMemo, useState } from 'react';
import { cn } from '@/libs/utils';

export const Combobox = <T,>({
  children,
  label,
  value,
  items,
  options,
  defaultValue,
  placeholder,
  triggerClassName,
  onChange,
}: {
  label: keyof T;
  value: keyof T;
  items: ReadonlyArray<T>;
  options?: IFuseOptions<T>;
  defaultValue?: T;
  placeholder?: string;
  triggerClassName?: string;
  onChange: (value: string) => void;
  children: (arg: {
    value: { label: string; value: string } | null;
    search: string;
    open: boolean;
  }) => React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [_value, setValue] = useState<{ label: string; value: string } | null>(
    defaultValue?.[label] && defaultValue[value]
      ? {
          label: defaultValue[label].toString(),
          value: defaultValue[value].toString(),
        }
      : null,
  );
  const [search, filter] = useState('');
  const fuse = new Fuse(items, options);

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return [];
    }

    return fuse.search(search).map((result) => ({
      label: result.item[label] as string,
      value: result.item[value] as string,
    }));
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={triggerClassName} asChild>
        {children({ value: _value, search, open })}
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            defaultValue={_value?.value}
            onValueChange={(search) => {
              filter(search);
            }}
          />
          <CommandList>
            <CommandEmpty>
              {search ? 'Not found.' : 'Search item.'}
            </CommandEmpty>
            <CommandGroup>
              {filtered.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    onChange(item.value);
                    setValue(item);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      _value?.value === item.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
