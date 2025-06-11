import { drizzle } from 'drizzle-orm/sqlite-proxy';
import Database from '@tauri-apps/plugin-sql';
import * as schema from './schema';

export const sqlite = await Database.load('sqlite:sqlite.db');

const isSelectQuery = (sql: string): boolean => /^\s*SELECT\b/i.test(sql);

const db = drizzle(
  async (sql, params, method) => {
    try {
      if (!isSelectQuery(sql)) {
        await sqlite.execute(sql, params);
        return { rows: [] };
      }

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      let rows: any[] = await sqlite.select(sql, params);

      rows = rows.map((row) => Object.values(row));

      return { rows: ['all', 'values'].includes(method) ? rows : rows[0] };
    } catch (e) {
      throw new Error(e as string);
    }
  },
  { schema, logger: true },
);

export default db;
