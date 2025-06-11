import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { classes } from './classes.sql';
import { groups } from './groups.sql';

export const students = sqliteTable('students', {
  id,
  class_id: integer()
    .references(() => classes.id, { onDelete: 'cascade' })
    .notNull(),
  group_id: integer().references(() => groups.id),
  name: text().notNull(),
  national_id: text().unique().notNull(),
  student_id: text().unique().notNull(),
  ...timestamps(),
});

export const studentsRelations = relations(students, ({ one }) => ({
  class: one(classes, {
    fields: [students.class_id],
    references: [classes.id],
  }),
  group: one(groups, {
    fields: [students.group_id],
    references: [groups.id],
  }),
}));
