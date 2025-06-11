import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { Experiment, Tool } from '@/types';

export namespace UseExperimentsQuery {
  export const key = ['get-all-experiments'];

  export const fn = async (): Promise<Experiment.WithRelations.List> => {
    let results = await db.query.experiments.findMany({
      with: { experiments_to_tools: { columns: {}, with: { tool: true } } },
    });

    results = results.map((experiment) => {
      const tools = experiment.experiments_to_tools.flatMap((t) => t.tool);

      return {
        ...experiment,
        has_broken_tools: tools.some(
          (tool) => tool.status === Tool.Status.Broken,
        ),
        tools,
      };
    });

    return Experiment.WithRelations.zod.array().parse(results);
  };
}

export const useGetExperiments = () =>
  useQuery({
    queryKey: UseExperimentsQuery.key,
    queryFn: UseExperimentsQuery.fn,
  });
