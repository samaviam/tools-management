import { relations } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { experiments } from './experiments.sql';
import { tools } from './tools.sql';

export const experimentsTools = sqliteTable(
  'experiments_tools',
  {
    experiment_id: integer()
      .references(() => experiments.id, { onDelete: 'cascade' })
      .notNull(),
    tool_id: integer()
      .references(() => tools.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.experiment_id, table.tool_id] })],
);

export const experimentsToolsRelations = relations(
  experimentsTools,
  ({ one }) => ({
    experiment: one(experiments, {
      fields: [experimentsTools.experiment_id],
      references: [experiments.id],
    }),
    tool: one(tools, {
      fields: [experimentsTools.tool_id],
      references: [tools.id],
    }),
  }),
);
