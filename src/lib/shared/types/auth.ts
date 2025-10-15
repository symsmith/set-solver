import type { account, session, user, verification } from '$lib/server/database/schema';

export type User = typeof user.$inferInsert;
export type Session = typeof session.$inferInsert;
export type Account = typeof account.$inferInsert;
export type Verification = typeof verification.$inferInsert;
