import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { Schedule } from '@/types';

export namespace UseSchedulesQuery {
  export const key = ['get-all-schedules'];

  export const fn = async (): Promise<Schedule.WithRelations.List> => {
    const results = await db.query.schedules.findMany({
      with: { experiment: true, class: true, group: true },
    });

    return Schedule.WithRelations.zod.array().parse(results);
  };
}

export const useGetSchedules = () =>
  useQuery({
    queryKey: UseSchedulesQuery.key,
    queryFn: UseSchedulesQuery.fn,
  });
