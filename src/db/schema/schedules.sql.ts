import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { classes } from './classes.sql';
import { groups } from './groups.sql';
import { experiments } from './experiments.sql';
import { schedulesTools } from './schedules-tools.sql';

export const schedules = sqliteTable('schedules', {
  id,
  experiment_id: integer()
    .references(() => experiments.id, { onDelete: 'cascade' })
    .notNull(),
  class_id: integer()
    .references(() => classes.id, { onDelete: 'cascade' })
    .notNull(),
  group_id: integer()
    .references(() => groups.id, { onDelete: 'cascade' })
    .notNull(),
  description: text(),
  status: integer().default(1).notNull(),
  start_at: text(),
  ...timestamps(),
});

export const schedulesRelations = relations(schedules, ({ one, many }) => ({
  experiment: one(experiments, {
    fields: [schedules.experiment_id],
    references: [experiments.id],
  }),
  class: one(classes, {
    fields: [schedules.class_id],
    references: [classes.id],
  }),
  group: one(groups, {
    fields: [schedules.group_id],
    references: [groups.id],
  }),
  schedules_to_tools: many(schedulesTools),
}));
