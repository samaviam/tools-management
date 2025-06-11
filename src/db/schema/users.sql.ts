import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';

export const users = sqliteTable('users', {
  id,
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  last_login_at: text(),
  ...timestamps(),
});
