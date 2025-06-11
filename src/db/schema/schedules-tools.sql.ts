import { relations } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { schedules } from './schedules.sql';
import { tools } from './tools.sql';

export const schedulesTools = sqliteTable(
  'schedules_tools',
  {
    schedule_id: integer()
      .references(() => schedules.id, { onDelete: 'cascade' })
      .notNull(),
    tool_id: integer()
      .references(() => tools.id, { onDelete: 'cascade' })
      .notNull(),
    status: integer().default(1).notNull(),
  },
  (table) => [primaryKey({ columns: [table.schedule_id, table.tool_id] })],
);

export const schedulesToolsRelations = relations(schedulesTools, ({ one }) => ({
  schedule: one(schedules, {
    fields: [schedulesTools.schedule_id],
    references: [schedules.id],
  }),
  tool: one(tools, {
    fields: [schedulesTools.tool_id],
    references: [tools.id],
  }),
}));
