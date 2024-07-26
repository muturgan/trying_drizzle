import { TNewUser, TUser } from './schema.mjs';
import { IDal } from './typings.mjs';

export class MochDal implements IDal {
	readonly #db: TUser[] = [];

	public async readUsers(): Promise<TUser[]> {
		return this.#db;
	}

	public async readUser(id: number): Promise<TUser | null> {
		const user = this.#db.find((u) => u.id === id);
		return user || null;
	}

	public async addUser(newUser: TNewUser): Promise<number> {
		const insertedId = this.#db.length + 1;
		this.#db.push({ id: insertedId, ...newUser } as any);
		return insertedId;
	}

	public async checkReadiness(): Promise<void> {}
}
