import { min } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, decimal, foreignKey } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['active', 'inactive']);

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).unique(),
    price: decimal('price', { nullable: false , min: 0}),
    status: statusEnum('status').default('active'),
})

export const sales = pgTable('sales', {
    id: serial('id').primaryKey(),
    quantity: integer('quantity', { nullable: false, min: 1 }),
    total: decimal('total', { nullable: false, min: 0 }),
    status: statusEnum('status').default('active'),
    createdAt: integer('created_at', { nullable: false, default: () => Date.now() }),
    updatedAt: integer('updated_at', { nullable: false, default: () => Date.now() }),
})

export const sales_detail = pgTable('sales_detail', {
	id: serial('id').primaryKey(),
	productId: integer('product_id', { nullable: false }).references(
		() => products.id,
		{ onUpdate: 'cascade', onDelete: 'no action' }
	),
	quantity: integer('quantity', { nullable: false, min: 1 }),
	total: decimal('total', { nullable: false, min: 0 }),
	status: statusEnum('status').default('active'),
	saleId: integer('sale_id', { nullable: false }).references(
        () => sales.id,
        { onUpdate: 'cascade', onDelete: 'no action' }
    ),
});