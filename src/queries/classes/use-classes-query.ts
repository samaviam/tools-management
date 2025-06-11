import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { Class } from '@/types';

export namespace UseClassesQuery {
  export const key = ['get-all-classes'];

  export const fn = async (): Promise<Class.WithRelations.List> => {
    const results = await db.query.classes.findMany({
      with: {
        groups: true,
        students: true,
      },
    });

    return Class.WithRelations.zod.array().parse(results);
  };
}

export const useGetClasses = () =>
  useQuery({
    queryKey: UseClassesQuery.key,
    queryFn: UseClassesQuery.fn,
  });
