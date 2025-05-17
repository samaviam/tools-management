import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export namespace UseClassesQuery {
  export type Class = {
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

  export const key = ['get-all-classes'];

  export const fn = async (): Promise<Class[]> => {
    return await invoke<Class[]>('get_all_classes');
  };
}

export const useGetClasses = () =>
  useQuery({
    queryKey: UseClassesQuery.key,
    queryFn: UseClassesQuery.fn,
  });
