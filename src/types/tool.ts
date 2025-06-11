import { z } from 'zod';

export namespace Tool {
  export enum Status {
    Healthy = 1,
    Broken = 2,
    Inaccessibility = 3,
  }

  export namespace Item {
    export const zod = z.object({
      id: z.number(),
      name: z.string().nonempty(),
      serial_code: z.string().nonempty(),
      brand: z.string().nullable(),
      accuracy: z.string().nullable(),
      range: z.string().nullable(),
      serial_number: z.string().nullable(),
      property_code: z.string().nullable(),
      quantity: z.coerce.number().default(0),
      description: z.string().nullable(),
      status: z.number().default(1),
      created_at: z.string(),
      updated_at: z.string(),
      deleted_at: z.string().nullable(),
    });

    export type Type = z.infer<typeof zod>;
  }

  export type List = Item.Type[];
}
