import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export namespace UseToolsQuery {
  export type Tool = {
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

  export const key = ['get-all-tools'];

  export const fn = async (): Promise<Tool[]> => {
    return await invoke<Tool[]>('get_all_tools');
  };
}

export const useGetTools = () =>
  useQuery({
    queryKey: UseToolsQuery.key,
    queryFn: UseToolsQuery.fn,
  });
