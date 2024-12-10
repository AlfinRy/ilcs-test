const dbConfig = require('../configs/database.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.utama = require('./utama.model.js')(sequelize, Sequelize);
db.entitas = require('./entitas.model.js')(sequelize, Sequelize);
db.pungutan = require('./pungutan.model.js')(sequelize, Sequelize);

db.utama.hasOne(db.pungutan, {
	foreignKey: 'id_aju',
	sourceKey: 'id_aju',
});
db.pungutan.belongsTo(db.utama, {
	foreignKey: 'id_aju',
	targetKey: 'id_aju',
});

db.utama.hasOne(db.entitas, {
	foreignKey: 'id_aju',
	sourceKey: 'id_aju',
});
db.entitas.belongsTo(db.utama, {
	foreignKey: 'id_aju',
	targetKey: 'id_aju',
});

module.exports = db;
