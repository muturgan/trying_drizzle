import { eq } from 'drizzle-orm';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import type { IDal } from './typings.mjs';
import { userTable, TNewUser, TUser } from './schema.mjs';
import { appConfig } from '../config.mjs';

export class PostgresDal implements IDal {
	readonly #conn: Promise<NodePgDatabase>;

	constructor() {
		const client = new pg.Client({ ...appConfig.db });
		this.#conn = client.connect().then(() => drizzle(client));
	}

	public async readUsers(): Promise<TUser[]> {
		const conn = await this.#conn;
		const users = await conn.select().from(userTable);
		return users;
	}

	public async readUser(id: number): Promise<TUser | null> {
		const conn = await this.#conn;
		const [user] = await conn.select().from(userTable).where(eq(userTable.id, id));
		return user || null;
	}

	public async addUser(newUser: TNewUser): Promise<number> {
		const conn = await this.#conn;
		const [insertedUser] = await conn.insert(userTable).values(newUser).returning();
		if (!insertedUser) {
			throw new Error('wait! oh sh...');
		}
		return insertedUser.id;
	}

	public async checkReadiness(): Promise<void | never> {
		await this.#conn;
	}
}
