import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateId } from './id';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function url(
  serialize: any,
  pathname: string,
  filter: { id: string; value: string },
) {
  return serialize(pathname, {
    filters: [
      {
        id: filter.id,
        value: filter.value,
        variant: 'text',
        operator: 'eq',
        filterId: generateId({ length: 8 }),
      },
    ],
  });
}
