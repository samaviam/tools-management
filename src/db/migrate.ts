import { readDir, readTextFile } from '@tauri-apps/plugin-fs';
import { BaseDirectory, resourceDir } from '@tauri-apps/api/path';
import { sqlite } from './';

export default async function migrate() {
  const resourcePath = await resourceDir();
  let migrations = (await readDir(`${resourcePath}/migrations`)).filter(
    (file) => file.name?.endsWith('.sql'),
  );

  // sort migrations by the first 4 characters of the file name
  migrations = migrations.sort((a, b) => {
    const aHash = a.name?.replace('.sql', '').slice(0, 4);
    const bHash = b.name?.replace('.sql', '').slice(0, 4);

    if (aHash && bHash) {
      return aHash.localeCompare(bHash);
    }

    return 0;
  });

  await sqlite.execute(
    /*sql*/ `
		CREATE TABLE IF NOT EXISTS "migrations" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash text NOT NULL UNIQUE,
			created_at text DEFAULT (CURRENT_TIMESTAMP)
		)
	`,
    [],
  );

  for (const migration of migrations) {
    const hash = migration.name?.replace('.sql', '');

    const dbMigrations = (await sqlite.select(
      /*sql*/ `SELECT id, hash, created_at FROM "migrations" ORDER BY created_at DESC`,
    )) as unknown as { id: number; hash: string; created_at: number }[];

    const hasBeenRun = (hash: string) =>
      dbMigrations.find((dbMigration) => {
        return dbMigration?.hash === hash;
      });

    if (hash && hasBeenRun(hash) === undefined) {
      const sql = await readTextFile(`migrations/${migration.name}`, {
        baseDir: BaseDirectory.Resource,
      });

      sqlite.execute(sql, []);
      sqlite.execute(/*sql*/ `INSERT INTO "migrations" (hash) VALUES ($1)`, [
        hash,
      ]);
    }
  }

  console.info('Migrations complete');

  return Promise.resolve();
}
