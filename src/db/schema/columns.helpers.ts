import { sql } from 'drizzle-orm';
import { integer, text } from 'drizzle-orm/sqlite-core';

interface TimestampOptions {
  created_at?: boolean;
  updated_at?: boolean;
  deleted_at?: boolean;
}

export const id = integer().primaryKey({ autoIncrement: true });

export const timestamps = ({
  created_at = true,
  updated_at = true,
  deleted_at = false,
}: TimestampOptions = {}): Record<
  'created_at' | 'updated_at' | 'deleted_at',
  any
> => {
  const columns: Record<string, unknown> = {};

  if (created_at) {
    columns.created_at = text('created_at').default(sql`(CURRENT_TIMESTAMP)`);
  }

  if (updated_at) {
    columns.updated_at = text('updated_at')
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      .default(sql`(CURRENT_TIMESTAMP)`);
  }

  if (deleted_at) {
    columns.deleted_at = text('deleted_at');
  }

  return columns;
};
