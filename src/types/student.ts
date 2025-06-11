import { z } from 'zod';
import { Class } from './class';
import { Group } from './group';

export namespace Student {
  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      class_id: z.coerce.number(),
      group_id: z.coerce.number().nullable(),
      name: z.string().nonempty(),
      national_id: z.string(),
      student_id: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    });

    export type Type = z.infer<typeof zod>;
  }

  export namespace WithRelations {
    export const zod = z.lazy(() =>
      Item.zod.extend({
        class: Class.Item.zod,
        group: Group.Item.zod.nullable(),
      }),
    );

    export type Type = z.infer<typeof zod>;

    export type List = Type[];
  }

  export type List = Item.Type[];
}
