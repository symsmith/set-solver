import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const base = {
	createdAt: integer({ mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer({ mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date())
		.notNull()
};

export const user = sqliteTable('user', {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: integer({ mode: 'boolean' }).default(false).notNull(),
	image: text(),
	...base
});

export const session = sqliteTable('session', {
	id: text().primaryKey(),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	token: text().notNull().unique(),
	ipAddress: text(),
	userAgent: text(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...base
});

export const account = sqliteTable('account', {
	id: text().primaryKey(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: integer({ mode: 'timestamp' }),
	refreshTokenExpiresAt: integer({ mode: 'timestamp' }),
	scope: text(),
	password: text(),
	...base
});

export const verification = sqliteTable('verification', {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	...base
});
