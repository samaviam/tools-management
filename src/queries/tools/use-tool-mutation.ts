import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export namespace UseToolMutation {
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

  export const key = ['get-tool'];

  export const fn = async ({ id }: { id: number }): Promise<Tool> => {
    return await invoke<Tool>('get_tool', { id });
  };
}

export const useTool = () =>
  useMutation({
    mutationKey: UseToolMutation.key,
    mutationFn: UseToolMutation.fn,
  });
