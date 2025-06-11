import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { experimentsTools } from './experiments-tools.sql';
import { schedulesTools } from './schedules-tools.sql';

export const tools = sqliteTable('tools', {
  id,
  name: text().notNull(),
  serial_code: text().notNull(),
  brand: text(),
  accuracy: text(),
  range: text(),
  serial_number: text(),
  property_code: text(),
  quantity: integer().notNull().default(0),
  description: text(),
  status: integer().notNull().default(1),
  ...timestamps({ deleted_at: true }),
});

export const toolsRelations = relations(tools, ({ many }) => ({
  tools_to_experiments: many(experimentsTools),
  tools_to_schedules: many(schedulesTools),
}));
