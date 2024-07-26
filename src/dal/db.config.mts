import { defineConfig } from 'drizzle-kit';
import { appConfig } from '../config.mjs';

export default defineConfig({
	dialect: 'postgresql',
	schema: './dist/dal/schema.mjs',
	out: './migrations',
	dbCredentials: appConfig.db,
	migrations: {
		table: 'migrations',
		schema: 'public',
		prefix: 'timestamp'
	}
});
