import { min } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, decimal } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['active', 'inactive']);

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
    price: integer('price', { nullable: false , min: 0}),
    status: statusEnum('status', { default: 'active' }),
})