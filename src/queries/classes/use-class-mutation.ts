import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';
import db from '@/db';
import { classes } from '@/db/schema';
import { Class } from '@/types';

export namespace UseClassMutation {
  export const key = ['get-tool'];

  export const fn = async ({
    id,
  }: { id: number }): Promise<Class.Item.Type> => {
    const result = await db
      .select()
      .from(classes)
      .where(eq(classes.id, id))
      .get();

    return Class.Item.zod.parse(result);
  };
}

export const useClass = () =>
  useMutation({
    mutationKey: UseClassMutation.key,
    mutationFn: UseClassMutation.fn,
  });
