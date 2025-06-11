import { z } from 'zod';
import { Group } from './group';
import { Student } from './student';
import { Degree } from './degree';

export namespace Class {
  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      title: z.string().nonempty(),
      degree: z.nativeEnum(Degree),
      scheduled: z.boolean().default(false),
      created_at: z.string(),
      updated_at: z.string(),
    });

    export type Type = z.infer<typeof zod>;
  }

  export namespace WithRelations {
    export const zod = z.lazy(() =>
      Item.zod.extend({
        groups: Group.Item.zod.array(),
        students: Student.Item.zod.array(),
      }),
    );

    export type Type = z.infer<typeof zod>;

    export type List = Type[];
  }

  export type List = Item.Type[];
}
