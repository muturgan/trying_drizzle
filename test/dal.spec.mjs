import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { dal } from '../dist/dal/index.mjs';

describe('dal', () => {
	const testUser = {name: 'Ivan'};

	it('read empty list', async () => {
		const users = await dal.readUsers();
		strictEqual(users.length, 0);
	});

	it('addUser', async () => {
		const insertedUserId = await dal.addUser(testUser);
		strictEqual(insertedUserId, 1);
	});

	it('readUser', async () => {
		const userOne = await dal.readUser(1);
		strictEqual(userOne.id, 1);
		const userTwo = await dal.readUser(2);
		strictEqual(userTwo, null);
	});

	it('readUsers', async () => {
		const users = await dal.readUsers();
		strictEqual(Array.isArray(users), true);
		strictEqual(users.length, 1);
		strictEqual(users[0].id, 1);
	});
});
