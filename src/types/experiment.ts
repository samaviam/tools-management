import { z } from 'zod';
import { Tool } from './tool';
import { Degree } from './degree';

export namespace Experiment {
  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      name: z.string().nonempty(),
      degree: z.nativeEnum(Degree),
      status: z.boolean().default(true),
      has_broken_tools: z.boolean().default(false),
      description: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      deleted_at: z.string().nullable(),
    });

    export type Type = z.infer<typeof zod>;
  }

  export namespace WithRelations {
    export const zod = Item.zod.extend({
      tools: Tool.Item.zod.array(),
    });

    export type Type = z.infer<typeof zod>;

    export type List = Type[];
  }

  export type List = Item.Type[];
}
