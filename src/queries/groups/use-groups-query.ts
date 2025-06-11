import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { Group } from '@/types';

export namespace UseGroupsQuery {
  export const key = ['get-all-groups'];

  export const fn = async (): Promise<Group.WithRelations.List> => {
    const results = await db.query.groups.findMany({
      with: { class: true, students: true },
    });

    return Group.WithRelations.zod.array().parse(results);
  };
}

export const useGetGroups = () =>
  useQuery({
    queryKey: UseGroupsQuery.key,
    queryFn: UseGroupsQuery.fn,
  });
