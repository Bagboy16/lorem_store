import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres('postgres://localhost:5432/products', {max: 1});
migrate(drizzle(migrationClient));

const queryClient = postgres('postgres://localhost:5432/products');
const db = drizzle(queryClient);
