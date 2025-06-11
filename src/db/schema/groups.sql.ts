import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { students } from './students.sql';
import { classes } from './classes.sql';

export const groups = sqliteTable('groups', {
  id,
  class_id: integer()
    .references(() => classes.id, { onDelete: 'cascade' })
    .notNull(),
  name: text().notNull(),
  ...timestamps(),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  class: one(classes, {
    fields: [groups.class_id],
    references: [classes.id],
  }),
  students: many(students),
}));
