import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { students } from './students.sql';
import { groups } from './groups.sql';

export const classes = sqliteTable('classes', {
  id,
  title: text().notNull(),
  degree: integer().notNull(),
  scheduled: integer({ mode: 'boolean' }).default(false),
  ...timestamps(),
});

export const classesRelations = relations(classes, ({ many }) => ({
  groups: many(groups),
  students: many(students),
}));
