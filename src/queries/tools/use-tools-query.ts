import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { tools } from '@/db/schema';
import type { Tool } from '@/types';

export namespace UseToolsQuery {
  export const key = ['get-all-tools'];

  export const fn = async (): Promise<Tool.List> => {
    return await db.select().from(tools).all();
  };
}

export const useGetTools = () =>
  useQuery({
    queryKey: UseToolsQuery.key,
    queryFn: UseToolsQuery.fn,
  });
