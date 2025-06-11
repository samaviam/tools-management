import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';
import db from '@/db';
import { tools } from '@/db/schema';

export namespace UseToolMutation {
  export const key = ['get-tool'];

  export const fn = async ({ id }: { id: number }) => {
    return await db.select().from(tools).where(eq(tools.id, id)).get();
  };
}

export const useTool = () =>
  useMutation({
    mutationKey: UseToolMutation.key,
    mutationFn: UseToolMutation.fn,
  });
