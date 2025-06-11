import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { experimentsTools } from './experiments-tools.sql';

export const experiments = sqliteTable('experiments', {
  id,
  name: text().notNull(),
  degree: integer().notNull(),
  description: text(),
  status: integer({ mode: 'boolean' }).notNull().default(true),
  ...timestamps({ deleted_at: true }),
});

export const experimentsRelations = relations(experiments, ({ many }) => ({
  experiments_to_tools: many(experimentsTools),
}));
