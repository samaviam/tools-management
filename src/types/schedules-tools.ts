import { z } from 'zod';
import { Class } from './class';
import { Experiment } from './experiment';
import { Group } from './group';

export namespace SchedulesTools {
  export enum Status {
    Healthy = 1,
    Broken = 2,
  }

  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      schedule_id: z.coerce.number(),
      tool_id: z.coerce.number(),
      status: z.number().default(1),
    });

    export type Type = z.infer<typeof zod>;
  }

  export namespace WithRelations {
    export const zod = z.lazy(() =>
      Item.zod.extend({
        experiment: Experiment.Item.zod,
        class: Class.Item.zod,
        group: Group.Item.zod,
      }),
    );

    export type Type = z.infer<typeof zod>;

    export type List = Type[];
  }

  export type List = Item.Type[];
}
