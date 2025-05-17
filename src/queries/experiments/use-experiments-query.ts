import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export namespace UseExperimentsQuery {
  export type Experiment = {
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

  export const key = ['get-all-experiments'];

  export const fn = async (): Promise<Experiment[]> => {
    return await invoke<Experiment[]>('get_all_experiments');
  };
}

export const useGetExperiments = () =>
  useQuery({
    queryKey: UseExperimentsQuery.key,
    queryFn: UseExperimentsQuery.fn,
  });
