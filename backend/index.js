const { config } = require('dotenv');
config();
const express = require('express');
const cors = require('cors');
const kursRoutes = require('./src/routes/kurs.routes');
const db = require('./src/models');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.json({
		status: 'ok',
	});
});

app.use('/api/kurs', kursRoutes);

require('./src/routes/utama.routes')(app);
require('./src/routes/entitas.routes')(app);
require('./src/routes/pungutan.routes')(app);
const connect = async (conn) => {
	await conn.sequelize
		.sync()
		.then(() => console.info('DB Already Sync'))
		.catch((err) => console.error('Failed to sync db', err));
};

try {
	connect(db);
} catch (err) {
	console.error('Unable to connect to the database:', error);
}
app.listen(port, () => console.info(`App running on port ${port}`));
