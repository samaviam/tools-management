import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';
import db from '@/db';
import { groups } from '@/db/schema';
import { Group } from '@/types';

export namespace UseGroupMutation {
  export const key = ['get-group'];

  export const fn = async ({
    id,
  }: { id: number }): Promise<Group.Item.Type | undefined> => {
    const result = await db
      .select()
      .from(groups)
      .where(eq(groups.id, id))
      .get();

    return Group.Item.zod.parse(result);
  };
}

export const useGroup = () =>
  useMutation({
    mutationKey: UseGroupMutation.key,
    mutationFn: UseGroupMutation.fn,
  });
