import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';
import db from '@/db';
import { schedules } from '@/db/schema';
import { Schedule } from '@/types';

export namespace UseScheduleMutation {
  export const key = ['get-schedules'];

  export const fn = async ({
    id,
  }: { id: number }): Promise<Schedule.WithRelations.Type | undefined> => {
    const result = await db.query.schedules.findFirst({
      where: eq(schedules.id, id),
      with: {
        schedules_to_tools: { with: { tool: true } },
        experiment: true,
        class: true,
        group: true,
      },
    });

    if (!result) return undefined;

    const { schedules_to_tools, ...data } = result;

    return Schedule.WithRelations.zod.parse({
      ...data,
      tools: schedules_to_tools.map((relation) => ({ ...relation.tool, status: relation.status })),
    });
  };
}

export const useSchedule = () =>
  useMutation({
    mutationKey: UseScheduleMutation.key,
    mutationFn: UseScheduleMutation.fn,
  });
