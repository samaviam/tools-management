import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';
import db from '@/db';
import { experiments } from '@/db/schema';
import { Experiment } from '@/types';

export namespace UseExperimentMutation {
  export const key = ['get-experiment'];

  export const fn = async ({
    id,
  }: { id: number }): Promise<Experiment.WithRelations.Type | undefined> => {
    const result = await db.query.experiments.findFirst({
      with: { experiments_to_tools: { columns: {}, with: { tool: true } } },
      where: eq(experiments.id, id),
    });

    if (!result) return undefined;

    const { experiments_to_tools, ...data } = result;

    return Experiment.WithRelations.zod.parse({
      ...data,
      tools: experiments_to_tools.map((relation) => relation.tool),
    });
  };
}

export const useExperiment = () =>
  useMutation({
    mutationKey: UseExperimentMutation.key,
    mutationFn: UseExperimentMutation.fn,
  });
