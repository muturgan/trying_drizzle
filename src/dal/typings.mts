import type { TNewUser, TUser } from './schema.mjs';

export interface IDal {
	readUsers: () => Promise<TUser[]>;
	readUser: (id: number) => Promise<TUser | null>;
	addUser: (newUser: TNewUser) => Promise<number>;
	checkReadiness: () => Promise<void | never>;
}
