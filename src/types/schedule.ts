import { z } from 'zod';
import { Class } from './class';
import { Experiment } from './experiment';
import { Group } from './group';
import { Tool } from './tool';

export namespace Schedule {
  export enum Status {
    'Not Started' = 1,
    'In Progress' = 2,
    Done = 3,
    Delivered = 4,
  }

  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      experiment_id: z.coerce.number(),
      class_id: z.coerce.number(),
      group_id: z.coerce.number(),
      description: z.string().nullable(),
      status: z.number().default(1),
      start_at: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
    });

    export type Type = z.infer<typeof zod>;
  }

  export namespace WithRelations {
    export const zod = Item.zod.extend({
      experiment: Experiment.Item.zod,
      class: Class.Item.zod,
      group: Group.Item.zod,
      tools: Tool.Item.zod.array().nullish(),
    });

    export type Type = z.infer<typeof zod>;

    export type List = Type[];
  }

  export type List = Item.Type[];
}
