import { integer, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: text('name'),
	email: text('email'),
	password: text('password'),
	role: text('role').$type<'admin' | 'customer'>(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
});

export type TUser = typeof userTable.$inferSelect;
export type TNewUser = typeof userTable.$inferInsert;
