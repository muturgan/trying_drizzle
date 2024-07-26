import { TNewUser, TUser } from './schema.mjs';
import { IDal } from './typings.mjs';

export class MochDal implements IDal {
	private readonly _db: TUser[] = [];

	public async readUsers(): Promise<TUser[]> {
		return this._db;
	}

	public async readUser(id: number): Promise<TUser | null> {
		const user = this._db.find((u) => u.id === id);
		return user || null;
	}

	public async addUser(newUser: TNewUser): Promise<number> {
		const insertedId = this._db.length + 1;
		this._db.push({ id: insertedId, ...newUser } as any);
		return insertedId;
	}

	public async checkReadiness(): Promise<void> {}
}
