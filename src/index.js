import { db } from './db/index.js';
import express from 'express';
import morgan from 'morgan';
import { products, sales, sales_detail } from './db/schema.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/products', async (req, res) => {
	const products = await db.query.products.findMany();
	res.json(products);
});

app.post('/products', async (req, res) => {
	const product = await db.query.products.findFirst({
		where: {
			name: req.body.name,
		},
	});
	if (product) {
		return res.status(400).json({ message: 'Product already exists' });
	}
	const created = await db.insert(products).values(req.body);
	console.log(created);
	console.log('Product created successfully');
	res.status(201).json(created);
});

app.listen(process.env.PORT, () => {
	console.log('Server is running on http://localhost:3000');
});
