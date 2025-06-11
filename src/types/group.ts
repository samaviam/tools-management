import { z } from 'zod';
import { Class } from './class';
import { Student } from './student';

export namespace Group {
  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      class_id: z.coerce.number(),
      name: z.string().nonempty(),
      created_at: z.string(),
      updated_at: z.string(),
    });

    export type Type = z.infer<typeof zod>;
  }

  export namespace WithRelations {
    export const zod = z.lazy(() =>
      Item.zod.extend({
        class: Class.Item.zod,
        students: Student.Item.zod.array(),
      }),
    );

    export type Type = z.infer<typeof zod>;

    export type List = Type[];
  }

  export type List = Item.Type[];
}
