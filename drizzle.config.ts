import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src-tauri/migrations',
  schema: './src/db/schema/*.sql.ts',
  dialect: 'sqlite',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    url: process.env.DB_FILE_NAME!,
  },
  migrations: {
    table: 'migrations',
  },
});
